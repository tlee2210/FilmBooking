import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
  FormFeedback,
  FormGroup,
  Form,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";

import { message } from "antd";
import Dropzone from "react-dropzone";

import { clearNotificationMessage } from "../../../slices/message/reducer";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
// Redux
import { useDispatch, useSelector } from "react-redux";
// import { addNewProduct as onAddNewProduct } from "../../../slices/thunks";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useNavigate } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import withRouter from "../../../Components/Common/withRouter";

import {
  GetEditCelebrity,
  UpdateCelebrity,
} from "../../../slices/Celebrity/thunk";
import { clearNotification } from "../../../slices/message/reducer";

import Flatpickr from "react-flatpickr";
import Select from "react-select";

const EditActorsOrDirectors = (props) => {
  const slug = props.router.params.slug;
  // console.log(id);

  document.title = "Create Actors Or Directors";

  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetEditCelebrity(slug, props.router.navigate));
  }, [slug]);

  const selectState = (state) => state;
  const CelebrityProperties = createSelector(selectState, (state) => ({
    SelectOption: state.Celebrity.SelectOption,
    error: state.Message.error,
    item: state.Celebrity.item,
    messageError: state.Message.messageError,
  }));
  const { SelectOption, error, messageError, item } =
    useSelector(CelebrityProperties);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const roleOption = [
    { value: "ACTOR", label: "ACTOR" },
    { value: "DIRECTOR", label: "DIRECTOR" },
  ];

  const [selectedFiles, setselectedFiles] = useState([]);
  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: item.name || "",
      nationality: item.country?.id || "",
      dateOfBirth: item.dateOfBirth || "",
      biography: item.biography || "",
      Description: item.description || "",
      Role: item.role || "",
      image: item.image || "",
      files: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a faculty Title"),
      nationality: Yup.string().required("Please Enter an nationality"),
      Role: Yup.string().required("Please Enter an Role"),
      dateOfBirth: Yup.date()
        .max(
          new Date(new Date().setFullYear(new Date().getFullYear() - 8)),
          "Minimum age is 8 years"
        )
        .min(
          new Date(new Date().setFullYear(new Date().getFullYear() - 90)),
          "Maximum age is 90 years"
        )
        .required("Please select a date of birth"),
      biography: Yup.string().required("Please Enter a biography"),
      Description: Yup.string().required("Please Enter a Description"),
      files: Yup.array().of(
        Yup.mixed().test(
          "fileType",
          "Unsupported File Format",
          (value) => value && value.type.startsWith("image/")
        )
      ),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", values.name);
      formData.append("nationality", values.nationality);
      const formattedDate = new Date(values.dateOfBirth)
        .toISOString()
        .split("T")[0];
      formData.append("dateOfBirth", formattedDate);
      formData.append("biography", values.biography);
      formData.append("Description", values.Description);
      formData.append("role", values.Role);
      if (values.files[0]) {
        formData.append("file", values.files[0]);
      }
      dispatch(UpdateCelebrity(formData, props.router.navigate));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Create" pageTitle="Actors and Directors" />
          <Row>
            <Col xs={12}></Col>
          </Row>
          <hr />
          <Row>
            <Col md={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="product-title-input"
                          >
                            Name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="product-title-input"
                            placeholder="Enter Name"
                            name="name"
                            value={validation.values.name || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.name && validation.touched.name
                                ? true
                                : false
                            }
                          />
                          {validation.errors.name && validation.touched.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="product-title-input"
                          >
                            nationality
                          </Label>
                          <Select
                            name="nationality"
                            options={SelectOption}
                            placeholder="Enter nationality"
                            classNamePrefix="select"
                            onChange={(option) => {
                              validation.setFieldValue(
                                "nationality",
                                option.value
                              );
                              validation.setFieldTouched("nationality", true);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("nationality", true)
                            }
                            value={SelectOption.find(
                              (opt) =>
                                opt.value === validation.values.nationality
                            )}
                            className={
                              validation.errors.nationality &&
                              validation.touched.nationality
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {validation.errors.nationality &&
                            validation.touched.nationality && (
                              // <div className="invalid-feedback">
                              //   {validation.errors.nationality}
                              // </div>
                              <FormFeedback type="invalid">
                                {validation.errors.nationality}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="product-title-input"
                          >
                            Date Of Birth
                          </Label>
                          <Flatpickr
                            className="form-control"
                            placeholder="Enter date Of Birth"
                            value={validation.values.dateOfBirth}
                            onChange={([selectedDate]) => {
                              validation.setFieldValue(
                                "dateOfBirth",
                                selectedDate
                              );
                            }}
                            options={{
                              minDate: new Date().fp_incr(-90 * 365),
                              maxDate: new Date().fp_incr(-8 * 365),
                            }}
                          />
                          {validation.errors.dateOfBirth &&
                          validation.touched.dateOfBirth ? (
                            <div className="text-danger">
                              {validation.errors.dateOfBirth}
                            </div>
                          ) : // <FormFeedback type="invalid">
                          //   {validation.errors.dateOfBirth}
                          // </FormFeedback>
                          null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="product-title-input"
                          >
                            Role
                          </Label>
                          <Select
                            name="Role"
                            options={roleOption}
                            placeholder="Enter nationality"
                            classNamePrefix="select"
                            onChange={(option) => {
                              validation.setFieldValue("Role", option.value);
                              validation.setFieldTouched("Role", true);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("Role", true)
                            }
                            value={roleOption.find(
                              (opt) => opt.value === validation.values.Role
                            )}
                            className={
                              validation.errors.Role && validation.touched.Role
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {validation.errors.Role &&
                            validation.touched.Role && (
                              <FormFeedback type="invalid">
                                {validation.errors.Role}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                      <Col md={6}>
                        <Label>biography</Label>
                        <CKEditor
                          editor={ClassicEditor}
                          placeholder="biography"
                          data={validation.values.biography}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            validation.setFieldValue("biography", data);
                          }}
                          onBlur={() =>
                            validation.setFieldTouched("biography", true)
                          }
                        />
                        {validation.touched.biography &&
                        validation.errors.biography ? (
                          <div className="invalid-feedback d-block">
                            {validation.errors.biography}
                          </div>
                        ) : null}
                      </Col>

                      <Col md={6}>
                        <Label>Description</Label>
                        <CKEditor
                          editor={ClassicEditor}
                          placeholder="Description"
                          data={validation.values.Description}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            validation.setFieldValue("Description", data);
                          }}
                          onBlur={() =>
                            validation.setFieldTouched("Description", true)
                          }
                        />
                        {validation.touched.Description &&
                        validation.errors.Description ? (
                          <div className="invalid-feedback d-block">
                            {validation.errors.Description}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                    <Col md="4" className="mt-2">
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">avatar</Label>
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            handleAcceptedFiles(acceptedFiles);
                            validation.setFieldValue("files", acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone dz-clickable">
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <div className="mb-3">
                                  <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                </div>
                                <h4>upload Image</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        {validation.touched.files && validation.errors.files ? (
                          <div className="invalid-feedback d-block">
                            {validation.errors.files}
                          </div>
                        ) : null}
                        <div className="list-unstyled mb-0" id="file-previews">
                          {selectedFiles.length > 0 ? (
                            selectedFiles.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              );
                            })
                          ) : (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              // key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      src={item.image}
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {item.name}
                                    </Link>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          )}
                        </div>
                        {validation.touched.Category &&
                        validation.errors.Category ? (
                          <FormFeedback type="invalid">
                            {validation.errors.Category}
                          </FormFeedback>
                        ) : null}
                      </FormGroup>
                    </Col>
                  </CardBody>
                </Card>

                <div className="text-end mb-3">
                  <button type="submit" className="btn btn-success w-sm">
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EditActorsOrDirectors);

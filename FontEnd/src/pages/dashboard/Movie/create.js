import React, { useState, useEffect, createRef } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
import withRouter from "../../../Components/Common/withRouter";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import axios from "axios";

// import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";

const mapStyles = {
  width: "100%",
  height: "100%",
};

// Redux
import { useDispatch, useSelector } from "react-redux";
import { CreateCinemas } from "../../../slices/Cinemas/thunk";
import { clearNotification } from "../../../slices/message/reducer";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link, useNavigate } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";

import Select from "react-select";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const MovieCreate = (props) => {
  document.title = "Create Movie";

  const history = useNavigate();
  const dispatch = useDispatch();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const selectCinemaCreateState = (state) => state;

  const CinemaCreatepageData = createSelector(
    selectCinemaCreateState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
    })
  );

  const statusOption = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];

  const { error, messageError } = useSelector(CinemaCreatepageData);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      fileList: [],
      status: "",
      Description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Cinema name"),
      status: Yup.string().required("Please Enter a status"),
      Description: Yup.string().required("Please Enter Description"),
      fileList: Yup.array()
        .of(
          Yup.mixed().test(
            "fileType",
            "Unsupported File Format",
            (value) => value && value.type.startsWith("image/")
          )
        )
        .min(1, "Please upload at least one Image"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.Description);
      formData.append("address", values.address);
      formData.append("phone", values.phone);
      formData.append("lat", values.lat);
      formData.append("lng", values.lng);
      formData.append("status", values.status);
      values.fileList.forEach((file, index) => {
        formData.append(`files[${index}]`, file.originFileObj);
      });
      dispatch(CreateCinemas(formData, props.router.navigate));
    },
  });
  // useEffect(() => {
  //   console.log("Current validation errors:", validation.errors);
  // }, [validation.errors]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) =>
    validation.setFieldValue("fileList", newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Movie Create" pageTitle="Movie" />

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col md={8}>
              <Col md={12}>
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="product-title-input"
                          >
                            name
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="product-title-input"
                            placeholder="Enter name"
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
                            Status
                          </Label>
                          <Select
                            name="status"
                            options={statusOption}
                            placeholder="Select Status"
                            classNamePrefix="select"
                            onChange={(option) => {
                              validation.setFieldValue("status", option.value);
                              validation.setFieldTouched("status", true);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("status", true)
                            }
                            value={statusOption.find(
                              (opt) => opt.value === validation.values.status
                            )}
                            className={
                              validation.errors.status &&
                              validation.touched.status
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {validation.errors.status &&
                            validation.touched.status && (
                              <FormFeedback type="invalid">
                                {validation.errors.status}
                              </FormFeedback>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md={12}>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Description</h5>
                  </CardHeader>
                  <CardBody>
                    {" "}
                    <CKEditor
                      editor={ClassicEditor}
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
                    ) : (
                      <div className="invalid-feedback d-block"></div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Col>
            <Col md={4}>
              <Row>
                <Col md={4}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">image</h5>
                    </CardHeader>
                    <CardBody>
                      {" "}
                      <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={validation.values.fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {validation.values.fileList.length >= 1
                          ? null
                          : uploadButton}
                      </Upload>
                      {previewImage && (
                        <Image
                          wrapperStyle={{
                            display: "none",
                          }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(""),
                          }}
                          src={previewImage}
                        />
                      )}
                      {validation.errors.fileList ? (
                        <div className="invalid-feedback d-block">
                          {validation.errors.fileList}
                        </div>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">image</h5>
                    </CardHeader>
                    <CardBody>
                      {" "}
                      <Upload
                        beforeUpload={() => false}
                        listType="picture-card"
                        fileList={validation.values.fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {validation.values.fileList.length >= 1
                          ? null
                          : uploadButton}
                      </Upload>
                      {previewImage && (
                        <Image
                          wrapperStyle={{
                            display: "none",
                          }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(""),
                          }}
                          src={previewImage}
                        />
                      )}
                      {validation.errors.fileList ? (
                        <div className="invalid-feedback d-block">
                          {validation.errors.fileList}
                        </div>
                      ) : null}
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Col md={12}>
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">Google Map</h5>
                  </CardHeader>
                  <CardBody></CardBody>
                </Card>
              </Col>
            </Col>
            <div className="text-end mb-3">
              <button type="submit" className="btn btn-success w-sm">
                Submit
              </button>
            </div>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(MovieCreate);

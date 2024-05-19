import React, { useState, useEffect } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
import withRouter from "../../../Components/Common/withRouter";

import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  FormGroup,
  Form,
  Button,
} from "reactstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { GetEditCinema, UpdateCinema } from "../../../slices/Cinemas/thunk";
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

const CinemaEdit = (props) => {
  const slug = props.router.params.slug;
  // console.log(slug);
  document.title = "Edit Cinema";

  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetEditCinema(slug, props.router.navigate));
    validation.resetForm();
  }, []);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const selectCinemaEditState = (state) => state;

  const CinemaEditpageData = createSelector(selectCinemaEditState, (state) => ({
    SelectOption: state.Cinema.SelectOption,
    item: state.Cinema.item,
    error: state.Message.error,
    messageError: state.Message.messageError,
  }));

  const { SelectOption, item, error, messageError } =
    useSelector(CinemaEditpageData);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  // const [files, setFiles] = useState([]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: item.name || "",
      phone: item.phone || "",
      Description: item.description || "",
      address: item.address || "",
      City_id: item.city?.id || "",
      fileList: item.images || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Cinema name"),
      address: Yup.string().required("Please Enter a address"),
      phone: Yup.string()
        .required("Please Enter a phone")
        .matches(/^\d{10}$/, "phone must be exactly 10 digits"),
      Description: Yup.string().required("Please Enter a Description"),
      City_id: Yup.string().required("Please Enter an City"),
      fileList: Yup.array()
        .of(
          Yup.mixed().test(
            "fileType",
            "Unsupported File Format",
            (value) =>
              !value.originFileObj ||
              (value.originFileObj && value.type.startsWith("image/"))
          )
        )
        .min(1, "Please upload at least one Image"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", values.name);
      formData.append("description", values.Description);
      formData.append("address", values.address);
      formData.append("city_id", values.City_id);
      formData.append("phone", values.phone);
      // formData.append("files", values.fileList);
      let fileIndex = 0;
      let imageIndex = 0;

      values.fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append(`files[${fileIndex}]`, file.originFileObj);
          fileIndex += 1;
        } else {
          formData.append(`images[${imageIndex}]`, file.uid);
          imageIndex += 1;
        }
      });

      // const formDataEntries = Array.from(formData.entries());

      // console.table("FormData entries:", formDataEntries);
      dispatch(UpdateCinema(formData, props.router.navigate));
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

  const handleChange = ({ fileList: newFileList }) => {
    validation.setFieldValue("fileList", newFileList);
  };

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
        <BreadCrumb title="Edit Cinema" pageTitle="Cinema" />

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col md={8}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Cinema name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter Cinema name"
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
                          address
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter address"
                          name="address"
                          value={validation.values.address || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.address &&
                            validation.touched.address
                              ? true
                              : false
                          }
                        />
                        {validation.errors.address &&
                        validation.touched.address ? (
                          <FormFeedback type="invalid">
                            {validation.errors.address}
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
                          phone
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter phone"
                          name="phone"
                          value={validation.values.phone || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.phone && validation.touched.phone
                              ? true
                              : false
                          }
                        />
                        {validation.errors.phone && validation.touched.phone ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phone}
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
                          City
                        </Label>
                        <Select
                          name="City_id"
                          options={SelectOption}
                          placeholder="Enter City Name"
                          classNamePrefix="select"
                          onChange={(option) => {
                            validation.setFieldValue("City_id", option.value);
                            validation.setFieldTouched("City_id", true);
                          }}
                          onBlur={() =>
                            validation.setFieldTouched("City_id", true)
                          }
                          value={SelectOption.find(
                            (opt) => opt.value === validation.values.City_id
                          )}
                          className={
                            validation.errors.City_id &&
                            validation.touched.City_id
                              ? "is-invalid"
                              : ""
                          }
                        />
                        {validation.errors.City_id &&
                          validation.touched.City_id && (
                            <div className="invalid-feedback">
                              {validation.errors.City_id}
                            </div>
                          )}
                      </div>
                    </Col>
                  </Row>

                  <div>
                    <Label>Description</Label>
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
                    ) : null}
                  </div>
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
                    {validation.values.fileList.length >= 5
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
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                  {validation.touched.fileList && validation.errors.fileList ? (
                    <div className="invalid-feedback d-block">
                      {validation.errors.fileList}
                    </div>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">image</h5>
                </CardHeader>
                <CardBody></CardBody>
              </Card>
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

export default withRouter(CinemaEdit);

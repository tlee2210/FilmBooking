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
  FormGroup,
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

  const customStyles = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#126f8c",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#126f8c",
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      backgroundColor: "#126f8c",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
  };
  const DirectoryStyles = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#81ce40",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#81ce40",
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      backgroundColor: "#81ce40",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
  };
  const CategoryStyles = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#d36d38",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#d36d38",
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      backgroundColor: "#d36d38",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      fileList: [],
      status: "",
      Description: "",
      Category: [],
      Actor: [],
      Directory: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Cinema name"),
      status: Yup.string().required("Please Enter a status"),
      Description: Yup.string().required("Please Enter Description"),
      // fileList: Yup.array()
      //   .of(
      //     Yup.mixed().test(
      //       "fileType",
      //       "Unsupported File Format",
      //       (value) => value && value.type.startsWith("image/")
      //     )
      //   )
      //   .min(1, "Please upload at least one Image"),
    }),
    onSubmit: (values) => {
      console.log(values);
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
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Category</Label>
                          <Select
                            name="Category"
                            isMulti={true}
                            options={statusOption}
                            classNamePrefix="select"
                            styles={CategoryStyles}
                            onChange={(option) => {
                              validation.setFieldValue(
                                "Category",
                                option.map((item) => item.value)
                              );
                              validation.setFieldTouched("Category", true);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("Category", true)
                            }
                            invalid={
                              validation.touched.Category &&
                              validation.errors.Category
                                ? true
                                : false
                            }
                            value={statusOption.filter((option) =>
                              validation.values.Category.includes(option.value)
                            )}
                          />

                          {validation.touched.Category &&
                            validation.errors.Category && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {validation.errors.Category}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Actor</Label>
                          <Select
                            name="Actor"
                            isMulti={true}
                            options={statusOption}
                            classNamePrefix="select"
                            styles={customStyles}
                            onChange={(option) => {
                              validation.setFieldValue(
                                "Actor",
                                option.map((item) => item.value)
                              );
                              validation.setFieldTouched("Actor", true);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("Actor", true)
                            }
                            invalid={
                              validation.touched.Actor &&
                              validation.errors.Actor
                                ? true
                                : false
                            }
                            value={statusOption.filter((option) =>
                              validation.values.Actor.includes(option.value)
                            )}
                          />

                          {validation.touched.Actor &&
                            validation.errors.Actor && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {validation.errors.Actor}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup className="mb-3">
                          <Label htmlFor="validationCustom02">Directory</Label>
                          <Select
                            name="Directory"
                            isMulti={true}
                            options={statusOption}
                            classNamePrefix="select"
                            styles={DirectoryStyles}
                            onChange={(option) => {
                              validation.setFieldValue(
                                "Directory",
                                option.map((item) => item.value)
                              );
                              validation.setFieldTouched("Directory", true);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("Directory", true)
                            }
                            invalid={
                              validation.touched.Actor &&
                              validation.errors.Directory
                                ? true
                                : false
                            }
                            value={statusOption.filter((option) =>
                              validation.values.Directory.includes(option.value)
                            )}
                          />

                          {validation.touched.Directory &&
                            validation.errors.Directory && (
                              <div
                                className="invalid-feedback"
                                style={{ display: "block" }}
                              >
                                {validation.errors.Directory}
                              </div>
                            )}
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* Directory */}
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
                <Col md={6}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">image Landscape</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="justify-content-center align-items-center d-flex">
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
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <CardHeader>
                      <h5 className="card-title mb-0">image Portrait</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="justify-content-center align-items-center d-flex">
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
                      </div>
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

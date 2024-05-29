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
import Flatpickr from "react-flatpickr";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCreate, CreateMovies } from "../../../slices/Movie/thunk";
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

  const selectMovieCreateState = (state) => state;

  const movieCreatepageData = createSelector(
    selectMovieCreateState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
      selectActors: state.Movie.selectActors,
      selectCategories: state.Movie.selectCategories,
      selectDirectories: state.Movie.selectDirectories,
      selectStatus: state.Movie.selectStatus,
      selectcountry: state.Movie.selectcountry,
    })
  );

  const {
    error,
    messageError,
    selectActors,
    selectCategories,
    selectDirectories,
    selectStatus,
    selectcountry,
  } = useSelector(movieCreatepageData);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  useEffect(() => {
    dispatch(getCreate());
  }, []);

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
      status: "COMING_SOON",
      country: "",
      producer: "",
      duration_movie: "",
      Description: "",
      rules: "",
      releaseDate: "",
      endDate: "",
      language: "",
      movieFormat: "",
      trailer: "",
      fileLandscape: [],
      filePortrait: [],
      Category: [],
      Actor: [],
      Directory: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Movie name"),
      trailer: Yup.string().required("Please Enter Link trailer"),
      producer: Yup.string().required("Please Enter a Movie producer"),
      status: Yup.string().required("Please Enter a Movie status"),
      language: Yup.string().required("Please Enter a Movie language"),
      movieFormat: Yup.string().required("Please Enter a Movie Format"),
      duration_movie: Yup.number()
        .required("Please Enter a duration movie")
        .min(60, "Duration must be at least 60 minutes")
        .max(200, "Duration cannot exceed 200 minutes"),
      rules: Yup.number()
        .min(12, "Age must be at least 12")
        .max(18, "Age cannot exceed 18"),
      country: Yup.string().required("Please Enter a Movie country"),
      Description: Yup.string().required("Please Enter Description"),
      Category: Yup.array().min(1, "Please select at least one Category"),
      Actor: Yup.array().min(1, "Please select at least one Actor"),
      Directory: Yup.array().min(1, "Please select at least one Director"),
      releaseDate: Yup.date()
        .required("Please enter a release date")
        .min(
          new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
          "The release date cannot be less than 15 days from the current date"
        ),
      endDate: Yup.date()
        .min(
          Yup.ref("releaseDate"),
          "The end date must be at least 30 days after the release date"
        )
        .required("Please enter an end date"),
      fileLandscape: Yup.array()
        .of(
          Yup.mixed().test(
            "fileType",
            "Unsupported File Format",
            (value) => value && value.type.startsWith("image/")
          )
        )
        .min(1, "Please upload at least one Image"),
      filePortrait: Yup.array()
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
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("duration_movie", values.duration_movie);
      formData.append("countryId", values.country);
      formData.append("language", values.language);
      formData.append("producer", values.producer);
      formData.append("status", values.status);
      formData.append("description", values.Description);
      formData.append("imageLandscape", values.fileLandscape[0].originFileObj);
      formData.append("imagePortrait", values.filePortrait[0].originFileObj);
      formData.append("trailer", values.trailer);
      formData.append("rules", values.rules);
      formData.append("movieFormat", values.movieFormat);
      formData.append(
        "releaseDate",
        new Date(values.releaseDate).toISOString().split("T")[0]
      );
      formData.append(
        "endDate",
        new Date(values.endDate).toISOString().split("T")[0]
      );
      values.Category.forEach((item, index) => {
        formData.append(`categoriesIds[${index}]`, item);
      });
      values.Actor.forEach((item, index) => {
        formData.append(`actorId[${index}]`, item);
      });
      values.Directory.forEach((item, index) => {
        formData.append(`directorId[${index}]`, item);
      });

      dispatch(CreateMovies(formData, props.router.navigate));
    },
  });
  useEffect(() => {
    console.log("Current validation errors:", validation.errors);
  }, [validation.errors]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangePortrait = ({ fileList: newFileList }) =>
    validation.setFieldValue("filePortrait", newFileList);

  const handleChangeLandscape = ({ fileList: newFileList }) =>
    validation.setFieldValue("fileLandscape", newFileList);

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
                  <CardHeader>
                    <h5 className="card-title mb-0">Movie Detail</h5>
                  </CardHeader>
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
                            trailer Link
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="product-title-input"
                            placeholder="Enter trailer"
                            name="trailer"
                            value={validation.values.trailer || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.trailer &&
                              validation.touched.trailer
                                ? true
                                : false
                            }
                          />
                          {validation.errors.trailer &&
                          validation.touched.trailer ? (
                            <FormFeedback type="invalid">
                              {validation.errors.trailer}
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
                            producer
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="product-title-input"
                            placeholder="Enter producer"
                            name="producer"
                            value={validation.values.producer || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.producer &&
                              validation.touched.producer
                                ? true
                                : false
                            }
                          />
                          {validation.errors.producer &&
                          validation.touched.producer ? (
                            <FormFeedback type="invalid">
                              {validation.errors.producer}
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
                            Duration Movie
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="product-title-input"
                            placeholder="Enter Duration"
                            name="duration_movie"
                            value={validation.values.duration_movie || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.duration_movie &&
                              validation.touched.duration_movie
                                ? true
                                : false
                            }
                          />
                          {validation.errors.duration_movie &&
                          validation.touched.duration_movie ? (
                            <FormFeedback type="invalid">
                              {validation.errors.duration_movie}
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
                            Country
                          </Label>
                          <Select
                            name="country"
                            options={selectcountry}
                            placeholder="Select country"
                            classNamePrefix="select"
                            onChange={(option) => {
                              validation.setFieldValue("country", option.value);
                            }}
                            value={selectcountry.find(
                              (opt) => opt.value === validation.values.country
                            )}
                            className={
                              validation.errors.country &&
                              validation.touched.country
                                ? "is-invalid"
                                : ""
                            }
                          />
                          {validation.errors.country &&
                            validation.touched.country && (
                              <FormFeedback type="invalid">
                                {validation.errors.country}
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
                            options={selectCategories}
                            classNamePrefix="select"
                            styles={CategoryStyles}
                            onChange={(option) => {
                              validation.setFieldValue(
                                "Category",
                                option.map((item) => item.value)
                              );
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
                            value={selectCategories.filter((option) =>
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
                            options={selectActors}
                            classNamePrefix="select"
                            styles={customStyles}
                            onChange={(option) => {
                              validation.setFieldValue(
                                "Actor",
                                option.map((item) => item.value)
                              );
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
                            value={selectActors.filter((option) =>
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
                            options={selectDirectories}
                            classNamePrefix="select"
                            styles={DirectoryStyles}
                            onChange={(option) => {
                              validation.setFieldValue(
                                "Directory",
                                option.map((item) => item.value)
                              );
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
                            value={selectDirectories.filter((option) =>
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
                      config={{
                        toolbar: [
                          "heading",
                          "|",
                          "bold",
                          "italic",
                          "link",
                          "bulletedList",
                          "numberedList",
                          "blockQuote",
                          "|",
                          "undo",
                          "redo",
                          "alignment",
                          "fontSize",
                          "fontFamily",
                          "fontColor",
                          "highlight",
                          "imageUpload",
                          "mediaEmbed",
                          "insertTable",
                          "tableColumn",
                          "tableRow",
                          "mergeTableCells",
                        ],
                      }}
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
                          fileList={validation.values.fileLandscape}
                          onPreview={handlePreview}
                          onChange={handleChangeLandscape}
                        >
                          {validation.values.fileLandscape.length >= 1
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
                        {validation.errors.fileLandscape &&
                        validation.touched.fileLandscape ? (
                          <div className="invalid-feedback d-block">
                            {validation.errors.fileLandscape}
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
                          fileList={validation.values.filePortrait}
                          onPreview={handlePreview}
                          onChange={handleChangePortrait}
                        >
                          {validation.values.filePortrait.length >= 1
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
                        {validation.errors.filePortrait &&
                        validation.touched.filePortrait ? (
                          <div className="invalid-feedback d-block">
                            {validation.errors.filePortrait}
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
                    <h5 className="card-title mb-0">Movie Details Status</h5>
                  </CardHeader>
                  <CardBody>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          language
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter language Movies"
                          name="language"
                          value={validation.values.language || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.language &&
                            validation.touched.language
                              ? true
                              : false
                          }
                        />
                        {validation.errors.language &&
                        validation.touched.language ? (
                          <FormFeedback type="invalid">
                            {validation.errors.language}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Movie Format
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter movie Format"
                          name="movieFormat"
                          value={validation.values.movieFormat || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.movieFormat &&
                            validation.touched.movieFormat
                              ? true
                              : false
                          }
                        />
                        {validation.errors.movieFormat &&
                        validation.touched.movieFormat ? (
                          <FormFeedback type="invalid">
                            {validation.errors.movieFormat}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Status
                        </Label>
                        <Select
                          name="status"
                          options={selectStatus}
                          placeholder="Select Status"
                          classNamePrefix="select"
                          onChange={(option) => {
                            validation.setFieldValue("status", option.value);
                          }}
                          value={selectStatus.find(
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
                    <Col md={12}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Age Limit
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter age limit"
                          name="rules"
                          value={validation.values.rules || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.rules && validation.touched.rules
                              ? true
                              : false
                          }
                        />
                        {validation.errors.rules && validation.touched.rules ? (
                          <FormFeedback type="invalid">
                            {validation.errors.rules}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="releaseDate">
                          Release Date
                        </Label>
                        <Flatpickr
                          className="form-control"
                          placeholder="Enter Release Date"
                          value={validation.values.releaseDate}
                          onChange={([selectedDate]) => {
                            validation.setFieldValue(
                              "releaseDate",
                              selectedDate
                            );
                          }}
                          options={{
                            minDate: new Date(
                              new Date().getTime() + 15 * 24 * 60 * 60 * 1000
                            ),
                          }}
                        />
                        {validation.errors.releaseDate &&
                        validation.touched.releaseDate ? (
                          <div className="text-danger">
                            {validation.errors.releaseDate}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="endDate">
                          End Date
                        </Label>
                        <Flatpickr
                          className="form-control"
                          placeholder="Enter End Date"
                          value={validation.values.endDate}
                          onChange={([selectedDate]) => {
                            validation.setFieldValue("endDate", selectedDate);
                          }}
                          options={{
                            minDate: validation.values.releaseDate
                              ? new Date(
                                  new Date(
                                    validation.values.releaseDate
                                  ).getTime() +
                                    30 * 24 * 60 * 60 * 1000
                                )
                              : new Date().fp_incr(45), // Default to 45 days from now if no release date is selected
                          }}
                        />
                        {validation.errors.endDate &&
                        validation.touched.endDate ? (
                          <div className="text-danger">
                            {validation.errors.endDate}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </CardBody>
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

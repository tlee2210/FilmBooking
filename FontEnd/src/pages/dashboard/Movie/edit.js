import React, { useState, useEffect, createRef } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
import withRouter from "../../../Components/Common/withRouter";

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
  Button,
} from "reactstrap";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import Flatpickr from "react-flatpickr";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { GetEditMovie, UpdateMovie } from "../../../slices/Movie/thunk";
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

const MovieEdit = (props) => {
  const slug = props.router.params.slug;
  document.title = "Edit Movie";

  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetEditMovie(slug, props.router.navigate));
  }, [dispatch, slug, props.router.navigate]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileLandscape, setFileLandscape] = useState([]);
  const [filePortrait, setFilePortrait] = useState([]);

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
      item: state.Movie.item,
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
    item,
  } = useSelector(movieCreatepageData);

  useEffect(() => {
    if (item.imagePortrait) {
      setFilePortrait([{ uid: item.imagePortrait, url: item.imagePortrait }]);
    }
  }, [item.imagePortrait]);

  useEffect(() => {
    if (item.imageLandscape) {
      setFileLandscape([
        { uid: item.imageLandscape, url: item.imageLandscape },
      ]);
    }
  }, [item.imageLandscape]);

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

  const removePrice = (index) => {
    const newPrices = validation.values.prices.filter((_, i) => i !== index);
    validation.setFieldValue("prices", newPrices);
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: item?.name || "",
      status: item?.status?.toUpperCase().replace(" ", "_") || "",
      country: item?.country?.id || "",
      producer: item?.producer || "",
      duration_movie: item?.duration_movie || "",
      Description: item?.description || "",
      rules: item?.rules || "",
      releaseDate: item?.releaseDate || "",
      endDate: item?.endDate || "",
      language: item?.language || "",
      trailer: item?.trailer || "",
      price: item?.price || "",
      prices:
        item?.priceMovies?.map((item) => ({
          date: new Date(item?.date),
          price: item?.price,
        })) || [],
      fileLandscape: item?.imageLandscape
        ? [{ uid: item?.imageLandscape, url: item?.imageLandscape }]
        : [],
      filePortrait: item?.imagePortrait
        ? [{ uid: item?.imagePortrait, url: item?.imagePortrait }]
        : [],
      Category:
        item?.categories?.map((cat) => {
          return cat.id;
        }) || [],
      Actor:
        item?.actor?.map((act) => {
          return act.id;
        }) || [],
      Directory:
        item?.director?.map((dir) => {
          return dir.id;
        }) || [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Movie name"),
      trailer: Yup.string().required("Please Enter Link trailer"),
      producer: Yup.string().required("Please Enter a Movie producer"),
      status: Yup.string().required("Please Enter a Movie status"),
      language: Yup.string().required("Please Enter a Movie language"),
      duration_movie: Yup.number()
        .required("Please Enter a duration movie")
        .min(60, "Duration must be at least 60 minutes")
        .max(200, "Duration cannot exceed 200 minutes"),
      price: Yup.number().required("Please Enter a price movie"),
      rules: Yup.number()
        .min(12, "Age must be at least 12")
        .max(18, "Age cannot exceed 18"),
      country: Yup.string().required("Please Enter a Movie country"),
      Description: Yup.string().required("Please Enter Description"),
      Category: Yup.array().min(1, "Please select at least one Category"),
      Actor: Yup.array().min(1, "Please select at least one Actor"),
      Directory: Yup.array().min(1, "Please select at least one Director"),
      releaseDate: Yup.date().required("Please enter a release date"),
      // .min(
      //   new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
      //   "The release date cannot be less than 15 days from the current date"
      // ),
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
            (value) =>
              !value.originFileObj ||
              (value.originFileObj && value.type.startsWith("image/"))
          )
        )
        .min(1, "Please upload at least one Image"),
      filePortrait: Yup.array()
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
      prices: Yup.array().of(
        Yup.object().shape({
          price: Yup.number().required("Please Enter a price"),
          date: Yup.date()
            .required("Please Enter a date")
            .test("duplicateDate", "Dates must be unique", function (value) {
              const { prices } = this.parent;
              if (!prices) return true;
              const dates = prices.map((price) => price.date);
              const uniqueDates = [...new Set(dates)];
              return uniqueDates.length === dates.length;
            }),
        })
      ),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", values.name);
      formData.append("duration_movie", values.duration_movie);
      formData.append("countryId", values.country);
      formData.append("language", values.language);
      formData.append("producer", values.producer);
      formData.append("status", values.status);
      formData.append("description", values.Description);
      if (values.fileLandscape[0].originFileObj) {
        formData.append(
          "imageLandscape",
          values.fileLandscape[0].originFileObj
        );
      }
      if (values.filePortrait[0].originFileObj) {
        formData.append("imagePortrait", values.filePortrait[0].originFileObj);
      }
      formData.append("trailer", values.trailer);
      formData.append("rules", values.rules);
      formData.append("price", values.price);
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

      values.prices.forEach((item, index) => {
        formData.append(`prices[${index}].price`, item.price);
        formData.append(
          `prices[${index}].date`,
          item.date.toISOString().split("T")[0]
        );
      });

      dispatch(UpdateMovie(formData, props.router.navigate));
    },
  });
  // console.log(validation.values);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangePortrait = ({ fileList: newFileList }) => {
    setFilePortrait(newFileList);
    validation.setFieldValue("filePortrait", newFileList);
  };

  const handleChangeLandscape = ({ fileList: newFileList }) => {
    setFileLandscape(newFileList);
    validation.setFieldValue("fileLandscape", newFileList);
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
                      <Col md={6}>
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

                      <Col md={3}>
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
                              validation.errors.rules &&
                              validation.touched.rules
                                ? true
                                : false
                            }
                          />
                          {validation.errors.rules &&
                          validation.touched.rules ? (
                            <FormFeedback type="invalid">
                              {validation.errors.rules}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label
                            className="form-label"
                            htmlFor="product-title-input"
                          >
                            price
                          </Label>
                          <Input
                            type="number"
                            className="form-control"
                            id="product-title-input"
                            placeholder="Enter price"
                            name="price"
                            value={validation.values.price || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.price &&
                              validation.touched.price
                                ? true
                                : false
                            }
                          />
                          {validation.errors.price &&
                          validation.touched.price ? (
                            <FormFeedback type="invalid">
                              {validation.errors.price}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3}>
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
                      <Col md={3}>
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
                            // options={{
                            //   minDate: new Date(
                            //     new Date().getTime() + 15 * 24 * 60 * 60 * 1000
                            //   ),
                            // }}
                          />
                          {validation.errors.releaseDate &&
                          validation.touched.releaseDate ? (
                            <div className="text-danger">
                              {validation.errors.releaseDate}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
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
                                : new Date().fp_incr(45),
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
                          fileList={fileLandscape || []}
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
                          fileList={filePortrait || []}
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
                    <h5 className="card-title mb-0">Special Release Price</h5>
                  </CardHeader>
                  <CardBody>
                    {(validation.values.prices || []).map((price, index) => (
                      <Row key={index} className="mb-3">
                        <Col md={4}>
                          <Input
                            type="number"
                            name={`prices.${index}.price`}
                            placeholder="Enter price"
                            value={price.price || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                          />
                          {validation.touched.prices?.[index]?.price &&
                            validation.errors.prices?.[index]?.price && (
                              <div className="text-danger">
                                {validation.errors.prices[index].price}
                              </div>
                            )}
                        </Col>
                        <Col md={5}>
                          <Flatpickr
                            className="form-control"
                            placeholder="Enter Release Date"
                            name={`prices.${index}.date`}
                            value={price.date || ""}
                            onChange={([selectedDate]) => {
                              validation.setFieldValue(
                                `prices.${index}.date`,
                                selectedDate
                              );
                            }}
                            options={{
                              // minDate: new Date(
                              //   new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                              // ),
                              disable: validation.values.prices
                                .filter((_, i) => i !== index)
                                .map((price) => new Date(price.date)),
                            }}
                          />
                          {validation.touched.prices?.[index]?.date &&
                            validation.errors.prices?.[index]?.date && (
                              <div className="text-danger">
                                {validation.errors.prices[index].date}
                              </div>
                            )}
                        </Col>
                        <Col md={2}>
                          <Button
                            color="danger"
                            outline
                            onClick={() => removePrice(index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    ))}

                    <Button
                      color="secondary"
                      outline
                      onClick={() => {
                        const newPrices = [...(validation.values.prices || [])];
                        newPrices.push({ price: "", date: "" });
                        validation.setFieldValue("prices", newPrices);
                      }}
                    >
                      Add
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Col>
            <div className="mb-3">
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

export default withRouter(MovieEdit);

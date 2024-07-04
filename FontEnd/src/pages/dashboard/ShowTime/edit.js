import React, { useEffect, useState } from "react";
import withRouter from "../../../Components/Common/withRouter";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Label,
  Form,
  Button,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/material_blue.css"; // Import a Flatpickr theme

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import filmImageDefaut from "../../../assets/images/film.jpg";
import { message } from "antd";
import { clearNotification } from "../../../slices/message/reducer";

import * as Yup from "yup";
import { useFormik } from "formik";

import {
  getMovieAndCinema,
  getRoomForShowTime,
  getMovieForShowTime,
  updateShowTimeEdit,
  getShowTimeEdit,
} from "../../../slices/ShowTime/thunk";

const ShowTimeCreate = (props) => {
  document.title = "Set Show Time";
  const id = props.router.params.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShowTimeEdit(id, props.router.navigate));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMovieAndCinema());
  }, [dispatch]);

  // Select state
  const selectShowTimeState = (state) => state;

  const ShowTimeStateData = createSelector(selectShowTimeState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    selectCinema: state.ShowTime.selectCinema,
    selectMovie: state.ShowTime.selectMovie,
    movieItem: state.ShowTime.movieItem,
    selectRoom: state.ShowTime.selectRoom,
    MovieFormat: state.ShowTime.MovieFormat,
    item: state.ShowTime.item,
  }));

  const {
    error,
    messageError,
    selectCinema,
    selectMovie,
    movieItem,
    selectRoom,
    item,
    MovieFormat,
  } = useSelector(ShowTimeStateData);

  useEffect(() => {
    if (error && messageError) {
      message.error(messageError);
      dispatch(clearNotification());
    }
  }, [error, messageError, dispatch]);

  const validationSchema = Yup.object({
    cinema: Yup.string().required("Please Select a Cinema"),
    movieFormat: Yup.string().required("Please Select Movie Format"),
    movie: Yup.string().required("Please Select a Movie"),
    day: Yup.string().required("Please Select a Day"),
    time: Yup.string().required("Please Select a time"),
    room: Yup.string().required("Please Select a room"),
  });

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      cinema: item.cinemaId || "",
      movie: item.movieId || "",
      day: item.days ? item.days : "",
      time: item.times ? item.times : "",
      room: item.roomId || "",
      movieFormat: item.movieFormat || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("movieId", values.movie);
      formData.append("cinemaId", values.cinema);
      formData.append("roomId", values.room);
      formData.append("movieFormat", values.movieFormat);
      formData.append("days", values.day);
      formData.append("times", values.time);
      dispatch(updateShowTimeEdit(formData, props.router.navigate));
    },
  });

  // useEffect(() => {
  //   console.log("validation" + validation.values.time);
  // });

  useEffect(() => {
    if (validation.values.cinema) {
      dispatch(getRoomForShowTime(validation.values.cinema));
    }
  }, [validation.values.cinema, dispatch]);

  useEffect(() => {
    if (validation.values.movie) {
      dispatch(getMovieForShowTime(validation.values.movie));
    }
  }, [validation.values.movie, dispatch]);

  const Styles = {
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#81ce40",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      backgroundColor: "#81ce40",
      color: "white",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "white",
      backgroundColor: "#81ce40",
      ":hover": {
        backgroundColor: "#405189",
        color: "white",
      },
    }),
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Set Show Time Management"
          pageTitle="Set Show Time"
        />
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
                <CardHeader>
                  <h5 className="card-title mb-0">Set Movie And Cinema</h5>
                </CardHeader>
                <CardBody>
                  <Col sm={12}>
                    <div className="search-box mb-3">
                      <Label className="form-label" htmlFor="movie">
                        Movie
                      </Label>
                      <Select
                        name="movie"
                        options={selectMovie}
                        placeholder="Select Movie..."
                        classNamePrefix="select"
                        onChange={(option) => {
                          validation.setFieldValue("time", "");
                          validation.setFieldValue("day", "");
                          validation.setFieldValue("room", "");

                          validation.setFieldValue(
                            "movie",
                            option ? option.value : null
                          );
                          validation.setFieldTouched("movie", true);
                        }}
                        onBlur={() => validation.setFieldTouched("movie", true)}
                        value={selectMovie.find(
                          (opt) => opt.value === validation.values.movie
                        )}
                      />
                      {validation.touched.movie && validation.errors.movie && (
                        <div
                          className="invalid-feedback"
                          style={{ display: "block" }}
                        >
                          {validation.errors.movie}
                        </div>
                      )}
                    </div>
                  </Col>
                  <Col sm={12}>
                    <div className="search-box">
                      <Label className="form-label" htmlFor="cinema">
                        Cinema
                      </Label>
                      <Select
                        name="cinema"
                        options={selectCinema}
                        placeholder="Select Cinema..."
                        classNamePrefix="select"
                        onChange={(option) => {
                          validation.setFieldValue("time", "");
                          validation.setFieldValue("day", "");
                          validation.setFieldValue("room", "");

                          validation.setFieldValue(
                            "cinema",
                            option ? option.value : null
                          );
                          validation.setFieldTouched("cinema", true);
                        }}
                        onBlur={() =>
                          validation.setFieldTouched("cinema", true)
                        }
                        value={selectCinema.find(
                          (opt) => opt.value === validation.values.cinema
                        )}
                      />
                      {validation.touched.cinema &&
                        validation.errors.cinema && (
                          <div
                            className="invalid-feedback"
                            style={{ display: "block" }}
                          >
                            {validation.errors.cinema}
                          </div>
                        )}
                    </div>
                  </Col>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Set Show Time Details</h5>
                </CardHeader>
                {validation.values.movie &&
                validation.values.cinema &&
                selectRoom.length > 0 ? (
                  <CardBody>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label mb-0">Day</label>
                            <Flatpickr
                              className="form-control"
                              placeholder="Select days"
                              value={validation.values.day}
                              onChange={([selectedDate]) => {
                                if (selectedDate) {
                                  const formattedDate =
                                    selectedDate.toLocaleDateString("en-CA");
                                  validation.setFieldValue(
                                    "day",
                                    formattedDate
                                  );
                                } else {
                                  validation.setFieldValue("day", null);
                                }
                              }}
                              options={{
                                minDate: movieItem.releaseDate,
                                maxDate: movieItem.endDate,
                              }}
                            />
                            {validation.touched.day &&
                              validation.errors.day && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {validation.errors.day}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="search-box">
                            <Label
                              className="form-label"
                              htmlFor="product-title-input"
                            >
                              Movie Format
                            </Label>
                            <Select
                              name="movieFormat"
                              options={MovieFormat}
                              placeholder="Select Movie Format..."
                              classNamePrefix="select"
                              onChange={(option) => {
                                const roleValue = option ? option.value : null;
                                validation.setFieldValue(
                                  "movieFormat",
                                  roleValue
                                );
                                validation.setFieldTouched("movieFormat", true);
                              }}
                              onBlur={() =>
                                validation.setFieldTouched("movieFormat", true)
                              }
                              value={MovieFormat.find(
                                (opt) =>
                                  opt.value === validation.values.movieFormat
                              )}
                            />
                            {validation.touched.MovieFormat &&
                              validation.errors.MovieFormat && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {validation.errors.MovieFormat}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label mb-0">Time</label>
                            <Flatpickr
                              placeholder="Select times"
                              className="form-control"
                              value={validation.values.time}
                              onChange={([selectedTimes]) => {
                                validation.setFieldValue(
                                  "time",
                                  selectedTimes.toTimeString().slice(0, 5)
                                );
                              }}
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                              }}
                            />
                            {validation.touched.time &&
                              validation.errors.time && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {validation.errors.time}
                                </div>
                              )}
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mb-3">
                            <label className="form-label mb-0">Room</label>
                            <Select
                              options={selectRoom}
                              styles={Styles}
                              placeholder="Select Room..."
                              classNamePrefix="select"
                              onChange={(option) => {
                                validation.setFieldValue(
                                  "room",
                                  option ? option.value : null
                                );
                              }}
                              onBlur={() =>
                                validation.setFieldTouched("room", true)
                              }
                              value={selectRoom.find(
                                (opt) => opt.value === validation.values.room
                              )}
                            />
                            {validation.touched.room &&
                              validation.errors.room && (
                                <div
                                  className="invalid-feedback"
                                  style={{ display: "block" }}
                                >
                                  {validation.errors.room}
                                </div>
                              )}
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </CardBody>
                ) : null}
              </Card>
            </Col>
            <Col md={4}>
              <Row>
                <Col sm={12} xl={12}>
                  <Card>
                    <img
                      className="card-img-top img-fluid"
                      src={movieItem?.imageLandscape || filmImageDefaut}
                      alt="Card cap"
                      width={70}
                    />
                    {movieItem && movieItem.name && (
                      <CardBody>
                        <h4 className="card-title mb-2">
                          Movie: {movieItem.name}
                        </h4>
                        <p className="card-text">
                          Duration Movie: {movieItem.duration_movie} Minute
                        </p>
                        <p className="card-text">Price: {movieItem.price}</p>
                        <p className="card-text">
                          Release Date: {movieItem.releaseDate}
                        </p>
                        <p className="card-text">
                          End Date: {movieItem.endDate}
                        </p>
                      </CardBody>
                    )}
                  </Card>
                </Col>
              </Row>
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

export default withRouter(ShowTimeCreate);

import React, { useEffect } from "react";
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
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
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
  createShowTime,
} from "../../../slices/ShowTime/thunk";

const ShowTimeCreate = (props) => {
  document.title = "Set Show Time";
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieAndCinema());
  }, [dispatch]);
  // ShowTime
  const selectShowTimeState = (state) => state;

  const ShowTimeStateData = createSelector(selectShowTimeState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    selectCinema: state.ShowTime.selectCinema,
    selectMovie: state.ShowTime.selectMovie,
    movieItem: state.ShowTime.movieItem,
    selectRoom: state.ShowTime.selectRoom,
    MovieFormat: state.ShowTime.MovieFormat,
  }));

  const {
    error,
    messageError,
    selectCinema,
    selectMovie,
    movieItem,
    selectRoom,
    MovieFormat,
  } = useSelector(ShowTimeStateData);

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
      cinema: "",
      movie: "",
      day: [],
      time: [],
      room: [],
      movieFormat: "",
    },
    validationSchema: Yup.object({
      cinema: Yup.string().required("Please Select a Cinema"),
      movieFormat: Yup.string().required("Please Select Movie Format"),
      movie: Yup.string().required("Please Select a Movie"),
      day: Yup.array().min(1, "Please Select a Day"),
      time: Yup.array().min(1, "Please Select a time"),
      room: Yup.array().min(1, "Please Select a room"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("cinemaId", values.cinema);
      formData.append("movieId", values.movie);
      formData.append("roomId", values.room);
      formData.append("movieFormat", values.movieFormat);
      values.room.forEach((value, index) => {
        formData.append(`roomId[${index}]`, value);
      });
      values.time.forEach((value, index) => {
        formData.append(`times[${index}]`, value);
      });
      // formData.append("days", values.day);
      values.day.forEach((value, index) => {
        formData.append(`days[${index}]`, value);
      });
      dispatch(createShowTime(formData, props.router.navigate));
    },
  });

  useEffect(() => {
    if (validation.values.cinema) {
      dispatch(getRoomForShowTime(validation.values.cinema));
    }
    validation.setFieldValue("time", []);
    validation.setFieldValue("day", []);
    validation.setFieldValue("room", []);
  }, [validation.values.cinema]);

  useEffect(() => {
    if (validation.values.movie) {
      dispatch(getMovieForShowTime(validation.values.movie));
    }
    validation.setFieldValue("time", []);
    validation.setFieldValue("day", []);
    validation.setFieldValue("room", []);
  }, [validation.values.movie]);

  const Styles = {
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

  const generateTimeOptions = (startTime, duration, interval) => {
    const options = [];
    let currentTime = new Date(`1970-01-01T${startTime}:00`);
    const midnight = new Date(`1970-01-02T00:00:00`);

    while (currentTime < midnight) {
      const formattedTime = currentTime.toTimeString().slice(0, 5);
      options.push({
        value: formattedTime,
        label: formattedTime,
      });

      currentTime.setMinutes(currentTime.getMinutes() + duration + interval);
    }

    return options;
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Set Show Time Management"
          pageTitle="Set Show Time"
        />{" "}
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
                      <Label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Movie
                      </Label>
                      <Select
                        name="Movie"
                        options={selectMovie}
                        placeholder="Select Movie..."
                        classNamePrefix="select"
                        onChange={(option) => {
                          const roleValue = option ? option.value : null;
                          validation.setFieldValue("movie", roleValue);
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
                      <Label
                        className="form-label"
                        htmlFor="product-title-input"
                      >
                        Cinema
                      </Label>
                      <Select
                        name="Cinema"
                        options={selectCinema}
                        placeholder="Select Cinema..."
                        classNamePrefix="select"
                        onChange={(option) => {
                          const roleValue = option ? option.value : null;
                          validation.setFieldValue("cinema", roleValue);
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
                              placeholder="select days"
                              value={validation.values.day || null}
                              onChange={(selectedDates) => {
                                const formatDate = selectedDates.map((date) => {
                                  return (
                                    date.getFullYear() +
                                    "-" +
                                    String(date.getMonth() + 1).padStart(
                                      2,
                                      "0"
                                    ) +
                                    "-" +
                                    String(date.getDate()).padStart(2, "0")
                                  );
                                });
                                validation.setFieldValue("day", formatDate);
                              }}
                              options={{
                                mode: "multiple",
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
                            {validation.values.time.length > 0 &&
                            validation.values.time != null ? (
                              <Select
                                options={generateTimeOptions(
                                  validation.values.time[0],
                                  movieItem.duration_movie,
                                  5
                                )}
                                isMulti={true}
                                styles={Styles}
                                placeholder="Select Time..."
                                classNamePrefix="select"
                                onChange={(option) => {
                                  validation.setFieldValue(
                                    "time",
                                    option.map((item) => item.value)
                                  );
                                }}
                                onBlur={() =>
                                  validation.setFieldTouched("time", true)
                                }
                                value={generateTimeOptions(
                                  validation.values.time[0],
                                  movieItem.duration_movie,
                                  5
                                ).filter((opt) =>
                                  validation.values.time.includes(opt.value)
                                )}
                              />
                            ) : (
                              <Flatpickr
                                placeholder="select times"
                                className="form-control"
                                value={validation.values.time}
                                onChange={(selectedTimes) => {
                                  const formattedTimes = selectedTimes.map(
                                    (time) => {
                                      return time.toTimeString().slice(0, 5);
                                    }
                                  );
                                  validation.setFieldValue(
                                    "time",
                                    formattedTimes
                                  );
                                }}
                                options={{
                                  mode: "multiple",
                                  enableTime: true,
                                  noCalendar: true,
                                  dateFormat: "H:i",
                                }}
                              />
                            )}
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
                              isMulti={true}
                              styles={Styles}
                              placeholder="Select Room..."
                              classNamePrefix="select"
                              onChange={(option) => {
                                validation.setFieldValue(
                                  "room",
                                  option.map((item) => item.value)
                                );
                              }}
                              onBlur={() =>
                                validation.setFieldTouched(
                                  validation.values.room,
                                  true
                                )
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
                      src={
                        movieItem && movieItem.imageLandscape
                          ? movieItem?.imageLandscape
                          : filmImageDefaut
                      }
                      alt="Card cap"
                      width={70}
                    />
                    {movieItem && movieItem.name ? (
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
                    ) : null}
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

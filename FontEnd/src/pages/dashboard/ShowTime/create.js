import React, { useState, useEffect, createRef } from "react";
import withRouter from "../../../Components/Common/withRouter";
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
  Button,
  FormGroup,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import filmImageDefaut from "../../../assets/images/film.jpg";

import * as Yup from "yup";
import { useFormik } from "formik";

import {
  getMovieAndCinema,
  getRoomForShowTime,
  getMovieForShowTime,
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
  }));

  const {
    error,
    messageError,
    selectCinema,
    selectMovie,
    movieItem,
    selectRoom,
  } = useSelector(ShowTimeStateData);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      cinema: "",
      movie: "",
      showTime: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (validation.values.cinema) {
      dispatch(getRoomForShowTime(validation.values.cinema));
    }
    validation.setFieldValue("showTime", []);
  }, [validation.values.cinema]);

  useEffect(() => {
    if (validation.values.movie) {
      dispatch(getMovieForShowTime(validation.values.movie));
    }
    validation.setFieldValue("showTime", []);
  }, [validation.values.movie]);

  const remove = (index) => {
    const newPrices = validation.values.showTime.filter((_, i) => i !== index);
    validation.setFieldValue("showTime", newPrices);
  };

  const areShowTimesComplete = (showTimes) => {
    return showTimes.every((item) => item.day && item.time && item.room);
  };

  const canAddShowTime = () => {
    const { showTime } = validation.values;
    return showTime.length < 1 || areShowTimesComplete(showTime);
  };

  useEffect(() => {
    const lastShowTime =
      validation.values.showTime[validation.values.showTime.length - 1];
    if (lastShowTime?.day && lastShowTime?.room && lastShowTime?.time) {
      console.log("Last showTime entry:", lastShowTime);
    }
  }, [validation.values.showTime]);

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
                  <h5 className="card-title mb-0">Set Show Time Details</h5>
                </CardHeader>
                <CardBody>
                  {(validation.values.showTime || []).map((item, index) => (
                    <Card
                      key={index}
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                    >
                      <Row className="mb-3">
                        <Col sm={12}>
                          <div className="text-end mb-3">
                            {/* ri-close-line */}
                            <Button
                              color="danger"
                              outline
                              onClick={() => remove(index)}
                            >
                              <i className="ri-close-line"></i>
                            </Button>
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label mb-0">Day</label>
                            <Flatpickr
                              className="form-control"
                              placeholder="select days"
                              // value={`showTime.${index}.day` || null}
                              value={item.day ? new Date(item.day) : null}
                              // disabled
                              disabled={
                                index < validation.values.showTime.length - 1
                              }
                              onChange={([selectedDate]) => {
                                const formatDate =
                                  selectedDate.getFullYear() +
                                  "-" +
                                  String(selectedDate.getMonth() + 1).padStart(
                                    2,
                                    "0"
                                  ) +
                                  "-" +
                                  String(selectedDate.getDate()).padStart(
                                    2,
                                    "0"
                                  );
                                validation.setFieldValue(
                                  `showTime.${index}.day`,
                                  formatDate
                                );
                              }}
                              options={{
                                minDate: movieItem.releaseDate,
                                maxDate: movieItem.endDate,
                              }}
                            />
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label mb-0">Time</label>
                            <Flatpickr
                              placeholder="select time"
                              className="form-control"
                              disabled={
                                index < validation.values.showTime.length - 1
                              }
                              value={item.time || null}
                              onChange={([selectedDate]) => {
                                const formattedTime = selectedDate
                                  .toTimeString()
                                  .slice(0, 5);
                                validation.setFieldValue(
                                  `showTime.${index}.time`,
                                  formattedTime
                                );
                              }}
                              options={{
                                enableTime: true,
                                noCalendar: true,
                                dateFormat: "H:i",
                              }}
                            />
                          </div>
                        </Col>
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label mb-0">Room</label>
                            <Select
                              options={selectRoom}
                              placeholder="Select Room..."
                              classNamePrefix="select"
                              isDisabled={
                                index < validation.values.showTime.length - 1
                              }
                              onChange={(option) => {
                                validation.setFieldValue(
                                  `showTime.${index}.room`,
                                  option.value
                                );
                              }}
                              onBlur={() =>
                                validation.setFieldTouched(
                                  `showTime.${index}.room`,
                                  true
                                )
                              }
                              value={selectRoom.find(
                                (opt) => opt.value === validation.values.Room
                              )}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                  {validation.values.movie &&
                  validation.values.cinema &&
                  selectRoom.length > 0 &&
                  canAddShowTime() ? (
                    <Button
                      color="secondary"
                      outline
                      onClick={() => {
                        const newPrices = [
                          ...(validation.values.showTime || []),
                        ];
                        newPrices.push({});
                        validation.setFieldValue("showTime", newPrices);
                      }}
                    >
                      Set ShowTime
                    </Button>
                  ) : null}
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
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
                    </div>
                  </Col>
                </CardBody>
              </Card>
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
                      width={100}
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Booking/css/order.css";
import "../Dat-Ve-Xem-Phim/dat-ve.css";
import {
  Form,
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Button,
  NavLink,
  Nav,
  Badge,
  Accordion,
  AccordionItem,
  Input,
  Collapse,
  Container,
} from "reactstrap";
import classnames from "classnames";
import SimpleBar from "simplebar-react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { message } from "antd";
import { BuyTicketFast } from "../../../slices/booking/thunk";
import { clearNotification } from "../../../slices/message/reducer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/bundle";
import "swiper/css";
import withRouter from "../../../Components/Common/withRouter";
import { getBookingTime } from "../../../slices/home/bookingHome/thunk";
import "../BuyTicket/css/BuyTicket.css";

const Booking = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [animationNavTab, setAnimationNavTab] = useState(0);
  const [isMovieListVisible, setIsMovieListVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const BookingState = (state) => state;

  const BookingStateData = createSelector(BookingState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    ticketFast: state.Booking.ticketFast,
  }));

  const { error, success, messageSuccess, messageError, ticketFast } =
    useSelector(BookingStateData);

  const [date, setDate] = useState(
    ticketFast?.bookingShowTimeResponses?.[0] || null
  );
  const [openAccordion, setOpenAccordion] = useState(["accordion1"]);

  useEffect(() => {
    dispatch(BuyTicketFast(selectedCity, selectedMovie?.slug));
  }, [dispatch, selectedMovie, selectedCity]);

  useEffect(() => {
    if (success && messageSuccess) {
      message.success(messageSuccess);
    }
    if (error && messageError) {
      message.error(messageError);
    }
    dispatch(clearNotification());
  }, [dispatch, success, error, messageSuccess, messageError]);

  const toggleAccordion = (id) => {
    setOpenAccordion((prevState) => (prevState.includes(id) ? [] : [id]));
  };

  const handleChangeCity = (value) => {
    setSelectedCity(value);
    setSelectedMovie(null);
    toggleAccordion("accordion2");
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  const handleBooking = (idRoom) => {
    dispatch(getBookingTime(idRoom, props.router.navigate));
  };

  const animationNavToggle = (tab) => {
    if (animationNavTab !== tab) {
      setAnimationNavTab(tab);
    }
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const isToday = date.toDateString() === today.toDateString();
    const dayOfWeek = isToday ? "Today" : daysOfWeek[date.getDay()];
    return `${dayOfWeek} ${day}/${month}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  document.title = `Buy Ticket Fast`;

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#e9e9e9" }}>
        <div style={{ paddingTop: 100 }}>
          <Container>
            <Col xl="12">
              <Card>
                <CardBody className="checkout-tab">
                  <Form action="#">
                    <div className="step-arrow-nav">
                      <div
                        className="nav-pills nav-justified custom-nav"
                        role="tablist"
                      >
                        <div className={`step-item -order-1 active done`}>
                          <span>Cinema interest</span>
                        </div>
                        <div className={`step-item -order-2`}>
                          <span>Choose a food</span>
                        </div>
                        <div className={`step-item -order-3`}>
                          <span>Payment</span>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </div>
        <Container>
          <div
            style={{ paddingTop: 30, paddingBottom: 50 }}
            className="page-content"
          >
            <Container fluid>
              <Row>
                <Row className="gx-3">
                  <Col md={8}>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId={1}>
                        <Row>
                          <Accordion
                            open={openAccordion}
                            toggle={toggleAccordion}
                            className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-danger"
                            id="accordionBordered"
                          >
                            <AccordionItem>
                              <h1
                                className="accordion-header"
                                id="accordionborderedExample1"
                                style={{ fontSize: "20px", fontWeight: "Bold" }}
                              >
                                <button
                                  className={classnames(
                                    "accordion-button fs-2",
                                    {
                                      collapsed:
                                        !openAccordion.includes("accordion1"),
                                    }
                                  )}
                                  type="button"
                                  onClick={() => toggleAccordion("accordion1")}
                                  style={{ cursor: "pointer" }}
                                >
                                  Choose Place
                                </button>
                              </h1>
                              <Collapse
                                isOpen={openAccordion.includes("accordion1")}
                                className="accordion-collapse"
                                id="accor_borderedExamplecollapse1"
                              >
                                <div className="accordion-body">
                                  <Row className="ms-4 mb-4">
                                    <Col className="d-flex flex-wrap">
                                      {ticketFast?.listCity?.map(
                                        (item, index) => (
                                          <button
                                            key={index}
                                            onClick={() =>
                                              handleChangeCity(item)
                                            }
                                            className={classnames({
                                              "btn btn-primary me-2 mb-2":
                                                selectedCity === item,
                                              "btn btn-outline-primary me-2 mb-2":
                                                selectedCity !== item,
                                            })}
                                          >
                                            {item}
                                          </button>
                                        )
                                      )}
                                    </Col>
                                  </Row>
                                </div>
                              </Collapse>
                            </AccordionItem>
                            <AccordionItem>
                              <h2
                                className="accordion-header"
                                id="accordionborderedExample2"
                                style={{ fontSize: "20px", fontWeight: "Bold" }}
                              >
                                <button
                                  className={classnames("accordion-button", {
                                    collapsed:
                                      !openAccordion.includes("accordion2"),
                                  })}
                                  type="button"
                                  onClick={() => toggleAccordion("accordion2")}
                                  style={{ cursor: "pointer" }}
                                >
                                  Choose Movie
                                </button>
                              </h2>
                              <Collapse
                                isOpen={openAccordion.includes("accordion2")}
                                className="accordion-collapse"
                                id="accor_borderedExamplecollapse2"
                              >
                                <div className="accordion-body">
                                  <div className="selection-section">
                                    <SimpleBar
                                      style={{
                                        maxHeight: 600,
                                        maxWidth: "2000px",
                                      }}
                                      className="px-3"
                                    >
                                      <Row className="movie-options gx-3">
                                        {ticketFast?.movieList?.map(
                                          (item, index) => (
                                            <Col
                                              xxl={3}
                                              xl={3}
                                              lg={3}
                                              md={3}
                                              sm={6}
                                              key={index}
                                              onClick={() => {
                                                setSelectedMovie(item);
                                                toggleAccordion("accordion3");
                                                setIsMovieListVisible(false);
                                              }}
                                              className={classnames(
                                                "movie-option element-item project designing development",
                                                {
                                                  "selected-movie":
                                                    selectedMovie?.name ===
                                                    item.name,
                                                }
                                              )}
                                            >
                                              <div className="movie-container">
                                                <img
                                                  className="gallery-img img-fluid mx-auto rounded-3"
                                                  src={item.imagePortrait}
                                                  alt={item.name}
                                                />
                                                <p>{item.name}</p>
                                                {selectedMovie?.name ===
                                                  item.name && (
                                                  <div className="selected-overlay">
                                                    <i
                                                      className="ri-checkbox-circle-fill"
                                                      style={{ fontSize: 62 }}
                                                    ></i>
                                                  </div>
                                                )}
                                              </div>
                                            </Col>
                                          )
                                        )}
                                      </Row>
                                    </SimpleBar>
                                  </div>
                                </div>
                              </Collapse>
                            </AccordionItem>
                            <AccordionItem>
                              <h2
                                className="accordion-header"
                                id="accordionborderedExample3"
                                style={{ fontSize: "20px", fontWeight: "Bold" }}
                              >
                                <button
                                  className={classnames("accordion-button", {
                                    collapsed:
                                      !openAccordion.includes("accordion3"),
                                  })}
                                  type="button"
                                  onClick={() => toggleAccordion("accordion3")}
                                  style={{ cursor: "pointer" }}
                                >
                                  Choose movie show time
                                </button>
                              </h2>
                              <Collapse
                                isOpen={openAccordion.includes("accordion3")}
                                className="accordion-collapse"
                                id="accor_borderedExamplecollapse3"
                              >
                                <div className="accordion-body">
                                  <Nav
                                    pills
                                    className="nav nav-pills animation-nav nav-justified gap-2 mb-3"
                                    style={{ width: "80%" }}
                                  >
                                    <Row style={{ width: "100%" }}>
                                      <Col md="7">
                                        <Swiper
                                          spaceBetween={10}
                                          slidesPerView={4.5}
                                        >
                                          {ticketFast?.bookingShowTimeResponses?.map(
                                            (item, index) => (
                                              <SwiperSlide key={index}>
                                                <NavLink
                                                  style={{
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                    padding: "5px",
                                                    textAlign: "center",
                                                  }}
                                                  className={classnames(
                                                    "nav-link-lich-chieu-phim",
                                                    {
                                                      active:
                                                        animationNavTab ===
                                                        index,
                                                    }
                                                  )}
                                                  onClick={() => {
                                                    animationNavToggle(index);
                                                    setDate(item?.day);
                                                  }}
                                                >
                                                  {formatDate(item?.day)}
                                                </NavLink>
                                              </SwiperSlide>
                                            )
                                          )}
                                        </Swiper>
                                      </Col>
                                    </Row>
                                  </Nav>
                                  <div
                                    style={{
                                      borderBottom: "4px solid #dee2e6",
                                    }}
                                  ></div>
                                  <TabContent
                                    activeTab={animationNavTab}
                                    className="text-muted"
                                  >
                                    {ticketFast?.bookingShowTimeResponses?.map(
                                      (item, index) => (
                                        <TabPane
                                          tabId={index}
                                          key={index}
                                          id="animation-home"
                                        >
                                          <Row>
                                            <Col>
                                              <Card>
                                                <CardBody
                                                  style={{ padding: 0 }}
                                                >
                                                  <div className="live-preview">
                                                    <div className="table-responsive table-striped table-nowrap align-middle mb-0">
                                                      {item?.cinemaTimeMovies?.map(
                                                        (cinema, index) => (
                                                          <Row
                                                            className="border-Bottom d-flex"
                                                            key={index}
                                                          >
                                                            <Col
                                                              md={12}
                                                              className="table-showTime"
                                                            >
                                                              <div className="fw-bolder max-width mb-4 mt-3">
                                                                {cinema.name}
                                                              </div>
                                                              <Row className="time-item">
                                                                {cinema?.movieFormat?.map(
                                                                  (
                                                                    format,
                                                                    formatIndex
                                                                  ) => (
                                                                    <Row
                                                                      className="mb-4"
                                                                      key={
                                                                        formatIndex
                                                                      }
                                                                    >
                                                                      <Col
                                                                        md={2}
                                                                        className="ms-4"
                                                                      >
                                                                        {
                                                                          format.name
                                                                        }
                                                                      </Col>
                                                                      <Col
                                                                        md={9}
                                                                        className="d-flex flex-wrap"
                                                                      >
                                                                        {format?.times?.map(
                                                                          (
                                                                            timeItem,
                                                                            timeIndex
                                                                          ) => (
                                                                            <div
                                                                              key={
                                                                                timeIndex
                                                                              }
                                                                              className="me-2"
                                                                              onClick={() =>
                                                                                handleBooking(
                                                                                  timeItem.idRoom
                                                                                )
                                                                              }
                                                                            >
                                                                              <Button className="btn-showTime mb-2">
                                                                                {formatTime(
                                                                                  timeItem.time
                                                                                )}
                                                                              </Button>
                                                                            </div>
                                                                          )
                                                                        )}
                                                                      </Col>
                                                                    </Row>
                                                                  )
                                                                )}
                                                              </Row>
                                                            </Col>
                                                          </Row>
                                                        )
                                                      )}
                                                    </div>
                                                  </div>
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          </Row>
                                        </TabPane>
                                      )
                                    )}
                                  </TabContent>
                                </div>
                              </Collapse>
                            </AccordionItem>
                          </Accordion>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Col>
                  <Col md={4}>
                    <Card className="shadow-lg bg-white rounded">
                      <CardBody className="card-body-order">
                        <div className="image-description">
                          <div className="image-info">
                            <img
                              src={
                                selectedMovie?.imagePortrait
                                  ? selectedMovie?.imagePortrait
                                  : "https://www.galaxycine.vn/_next/static/media/img-blank.bb695736.svg"
                              }
                              alt={selectedMovie?.name}
                            />
                          </div>
                          <div>
                            <div className="movie-title">
                              {selectedMovie?.name ? selectedMovie?.name : null}
                            </div>
                          </div>
                        </div>
                        <div className="detailed-info">
                          <div className="movie-info">
                            {date ? (
                              <p>
                                <strong>day: </strong>
                                {date}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Booking);

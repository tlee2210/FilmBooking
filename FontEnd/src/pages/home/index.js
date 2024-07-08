import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import { createSelector } from "reselect";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import img1 from "../../assets/images/galaxy/img-1.png";
import filmtest from "../../assets/images/filmtest.jpg";
import "../home/home.css";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { Pagination, Autoplay } from "swiper/modules";
import MovieList from "../../pages/Page/Movie/MovieList";
import { gethomepage } from "../../slices/home/MovieHome/thunk";
import withRouter from "../../Components/Common/withRouter";

import {
  BuyFastTicket,
  getBookingTime,
} from "../../slices/home/bookingHome/thunk";

const homepage = (props) => {
  document.title = "home";
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    dispatch(gethomepage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      BuyFastTicket(selectedMovie, selectedTheater, selectedDate, useNavigate)
    );
  }, [dispatch, selectedMovie, selectedTheater, selectedDate]);

  const handleBooking = () => {
    dispatch(getBookingTime(selectedTime, props.router.navigate));
  };

  const HomeState = (state) => state;
  const HomeStateData = createSelector(HomeState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    HomeData: state.HomeMovie.HomeData,
    buyFastTicket: state.HomeBooking.buyFastTicket,
  }));

  const { error, messageError, HomeData, buyFastTicket } =
    useSelector(HomeStateData);
  // console.log("HomeData: ", HomeData);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activeTab1, setActiveTab1] = useState("3");
  const tabChange1 = (tab) => {
    if (activeTab1 !== tab) setActiveTab1(tab);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <React.Fragment>
      <section className="section job-hero-section pb-0" id="hero">
        <Swiper
          slidesPerView={"1"}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination, Autoplay]}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="mySwiper swiper pagination-dynamic-swiper rounded bg-light custom-swiper-height"
        >
          <div className="swiper-wrapper">
            <SwiperSlide>
              <div className="swiper-slide d-flex justify-content-center align-items-center">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide d-flex justify-content-center align-items-center">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-slide d-flex justify-content-center align-items-center">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </SwiperSlide>
          </div>
        </Swiper>
        <Container>
          <div
            className="position-relative mb-5"
            style={{
              marginTop: "-20px",
              marginBottom: "100px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Form action="#" className="job-panel-filter shadow">
              <Row className="g-md-0 g-2">
                <Col className="col-md-3 ">
                  <div className="circle">1</div>
                  <div className="custom-select-wrapper">
                    <select
                      className="form-control custom-select"
                      style={{ paddingLeft: 35 }}
                      value={selectedMovie}
                      onChange={(e) => setSelectedMovie(e.target.value)}
                      data-choices
                    >
                      <option value="">Select movie</option>
                      {buyFastTicket && buyFastTicket.movieList
                        ? buyFastTicket?.movieList?.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </Col>
                <Col className="col-md-3 ">
                  <div className="circle">2</div>
                  <div className="custom-select-wrapper">
                    <select
                      className="form-control custom-select"
                      style={{ paddingLeft: 35 }}
                      value={selectedTheater}
                      onChange={(e) => setSelectedTheater(e.target.value)}
                      data-choices
                      disabled={!selectedMovie}
                    >
                      <option value="">Choose a cinema</option>
                      {buyFastTicket?.cinemaList?.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2 ">
                  <div className="circle">3</div>
                  <div className="custom-select-wrapper">
                    <select
                      className="form-control custom-select"
                      style={{ paddingLeft: 35 }}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      data-choices
                      disabled={!selectedTheater}
                    >
                      <option value="">Select date</option>
                      {buyFastTicket && buyFastTicket.dateList
                        ? buyFastTicket?.dateList?.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2 ">
                  <div className="circle">4</div>
                  <div className="custom-select-wrapper">
                    <select
                      className="form-control custom-select"
                      style={{ paddingLeft: 35 }}
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      data-choices
                      disabled={!selectedDate}
                    >
                      <option value="">Select Times</option>
                      {buyFastTicket?.movieFormat?.length > 0 &&
                        buyFastTicket.movieFormat.map((format, formatIndex) =>
                          format.times.map((timeItem, timeIndex) => (
                            <option
                              key={`${formatIndex}_${timeIndex}`}
                              value={timeItem.idRoom}
                            >
                              {`${formatTime(timeItem.time)} - ${format.name}`}
                            </option>
                          ))
                        )}
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2">
                  <div className="h-100">
                    <Button
                      className={`btn submit-btn w-100 h-100 ${
                        selectedTime ? "bg-danger" : ""
                      }`}
                      type="submit"
                      disabled={!selectedTime}
                      onClick={() => handleBooking()}
                    >
                      <i className="ri-search-2-line align-bottom me-1"></i> Buy
                      Fast Tickets
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>

          {HomeData && <MovieList HomeData={HomeData} SeeMore={true} />}
        </Container>

        {/* Góc Điển Ảnh */}
        <Container className="mt-5 pb-5">
          <Card style={{ marginTop: "80px" }} className="bg-light">
            <CardHeader style={{ paddingBottom: 30 }}>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0 d-flex align-items-center"
                role="tablist"
              >
                <div
                  className="text-xl inline-block font-bold uppercase d-flex align-items-center"
                  style={{
                    borderLeft: "4px solid #007bff",
                    fontSize: "23px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    paddingLeft: "0.5rem",
                    marginRight: "1rem",
                  }}
                >
                  CINEMA CORNER
                </div>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab1 === "3",
                      "text-secondary-emphasis": activeTab1 === "3",
                    })}
                    onClick={() => {
                      tabChange1("3");
                    }}
                    type="button"
                  >
                    <i className="fas fa-home"></i>
                    Blog Movie
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({
                      active: activeTab1 === "4",
                      "text-secondary-emphasis": activeTab1 === "4",
                    })}
                    onClick={() => {
                      tabChange1("4");
                    }}
                    type="button"
                  >
                    <i className="far fa-user"></i>
                    Movie Commentary
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <CardBody className="p-4">
              <TabContent activeTab={activeTab1}>
                <TabPane tabId="3">
                  <Row className="mb-3">
                    {HomeData && HomeData.movieBlogList
                      ? HomeData.movieBlogList.map((item, index) => (
                          <Col md={6} key={index}>
                            <Link
                              to={`/blog-movie/${item.slug}/details`}
                              className="hover-link-home d-flex align-items-center"
                              style={{
                                fontSize: 21,
                                fontWeight: "bold",
                                width: "100%",
                                marginBottom: 10,
                              }}
                            >
                              <div className="d-flex align-items-center mb-2 hover-img-home">
                                <img
                                  src={item.imagePortrait}
                                  alt={item.name}
                                  style={{
                                    marginRight: "15px",
                                    width: "195px",
                                    height: "130px",
                                    objectFit: "cover",
                                    flexShrink: 0,
                                  }}
                                />
                                <div>
                                  <d
                                    to="#"
                                    className="hover-link-home d-flex align-items-center"
                                    style={{
                                      fontSize: 21,
                                      fontWeight: "bold",
                                      width: "100%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    {item.name}
                                  </d>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        ))
                      : null}
                  </Row>
                  <Col>
                    <div style={{ paddingLeft: 450 }}>
                      <Link
                        to="/blog-movie"
                        className="btn btn-outline-danger waves-effect waves-light material-shadow-none"
                        style={{ textDecoration: "none" }}
                      >
                        See More <i className="bx bx-right-arrow-alt"></i>
                      </Link>
                    </div>
                  </Col>
                </TabPane>

                <TabPane tabId="4">
                  <Row className="mb-3">
                    {HomeData && HomeData.reviewList
                      ? HomeData.reviewList.map((item, index) => (
                          <Col md={6} key={index}>
                            <Link
                              to={`/movie-commentary/${item.slug}/details`}
                              className="hover-link-home d-flex align-items-center"
                              style={{
                                fontSize: 21,
                                fontWeight: "bold",
                                width: "100%",
                                marginBottom: 10,
                              }}
                            >
                              <div className="d-flex align-items-center mb-2 hover-img-home">
                                <img
                                  src={item.imagePortrait}
                                  alt={item.name}
                                  style={{
                                    marginRight: "15px",
                                    width: "195px",
                                    height: "130px",
                                    objectFit: "cover",
                                    flexShrink: 0,
                                  }}
                                />
                                <div>
                                  <div
                                    className="hover-link-home d-flex align-items-center"
                                    style={{
                                      fontSize: 21,
                                      fontWeight: "bold",
                                      width: "100%",
                                      marginBottom: 10,
                                    }}
                                  >
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </Col>
                        ))
                      : null}
                  </Row>
                  <Col>
                    <div style={{ paddingLeft: 450 }}>
                      <Link
                        to="/movie-commentary"
                        className="btn btn-outline-danger waves-effect waves-light material-shadow-none"
                        style={{ textDecoration: "none" }}
                      >
                        See More <i className="bx bx-right-arrow-alt"></i>
                      </Link>
                    </div>
                  </Col>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default withRouter(homepage);

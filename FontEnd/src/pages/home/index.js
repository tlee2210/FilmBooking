import React, { useState, useEffect } from "react";
import Flatpickr from "react-flatpickr";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
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
// C:\Users\Dell\Documents\GitHub\FilmBooking\FontEnd\src\pages\Page\Movie\MovieList.js
import Masonry from "react-masonry-component";
import { useSelector, useDispatch } from "react-redux";
import { gethomepage } from "../../slices/home/MovieHome/thunk";

const homepage = () => {
  document.title = "home";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gethomepage());
  }, [dispatch]);
  const HomeState = (state) => state;
  const HomeStateData = createSelector(HomeState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    HomeData: state.HomeMovie.HomeData,
  }));

  const { error, messageError, HomeData } = useSelector(HomeStateData);
  // console.log("HomeData: ", HomeData);

  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [activeTab1, setActiveTab1] = useState("3");
  const tabChange1 = (tab) => {
    if (activeTab1 !== tab) setActiveTab1(tab);
  };

  const data = ["item1", "item1"];
  const data2 = [
    {
      title: "TitleTitleTitleTitleTitleTitleTitleTitleTitle1",
      items: ["item1", "item1", "item1"],
    },
    { title: "Title 2", items: ["item2", "item2", "item2"] },
    { title: "Title 3", items: ["item3", "item3", "item3"] },
  ];

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
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
              <Row className="g-md-0 g-2 rounded-1">
                <Col className="col-md-3 border">
                  <div>
                    <select className="form-control" data-choices>
                      <option value="">Choose Movie</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-3 border">
                  <div>
                    <select className="form-control" data-choices>
                      <option value="">Choose Theater</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2 border">
                  <div>
                    <select className="form-control" data-choices>
                      <option value="">Choose Date</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2 border">
                  <div>
                    <select className="form-control" data-choices>
                      <option value="">Choose Time</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2">
                  <div className="h-100">
                    <button
                      className="btn submit-btn w-100 h-100 bg-warning"
                      type="submit"
                    >
                      <i className="ri-search-2-line align-bottom me-1"></i> Buy
                      Tickets Quickly
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>

          {HomeData && <MovieList HomeData={HomeData} />}

          <Col>
            <div style={{ paddingLeft: 450 }}>
              <Link
                to="/movie"
                className="btn btn-outline-danger waves-effect waves-light material-shadow-none"
                style={{ textDecoration: "none" }}
              >
                See More <i className="bx bx-right-arrow-alt"></i>
              </Link>
            </div>
          </Col>
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
                              to="#"
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

export default homepage;

import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
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
} from "reactstrap";
import classnames from "classnames";
import img1 from "../../assets/images/galaxy/img-1.png";
import filmtest from "../../assets/images/filmtest.jpg";

// filmtest.jpg
// C:\Users\Dell\Documents\GitHub\FilmBooking\FontEnd\src\assets\images\filmtest.jpg
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { Pagination, Autoplay } from "swiper/modules";

import Masonry from "react-masonry-component";

const homepage = () => {
  document.title = "home";

  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const data = ["item1", "item1", "item1", "item1", "item1", "item1"];

  return (
    // <React.Fragment>
    //   <div className="layout-wrapper landing">
    //     <Home />

    //   </div>
    // </React.Fragment>
    <React.Fragment>
      <section className="section job-hero-section pb-0" id="hero">
        <Swiper
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination, Autoplay]}
          loop={true}
          centeredSlides={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="mySwiper swiper pagination-dynamic-swiper rounded bg-light"
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
              marginBottom: "100px",
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
          <Card style={{ marginTop: "80px" }} className="bg-light">
            <CardHeader>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: activeTab === "1",
                      "text-secondary-emphasis": activeTab === "1",
                      "bg-light": activeTab === "1",
                      "bg-opacity-50": activeTab === "1",
                    })}
                    onClick={() => {
                      tabChange("1");
                    }}
                  >
                    <i className="fas fa-home"></i>
                    Now showing
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({
                      active: activeTab === "2",
                      "text-secondary-emphasis": activeTab === "2",
                      "bg-light": activeTab === "2",
                      "bg-opacity-50": activeTab === "2",
                    })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    <i className="far fa-user"></i>
                    Coming soon
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <CardBody className="p-4">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  {" "}
                  <Masonry className="row gallery-wrapper">
                    {/* {filteredGallery.map(
                      ({ img, title, auther, likes, comments }, key) => ( */}
                    {data.map((item, index) => (
                      <Col
                        xxl={3}
                        xl={4}
                        sm={6}
                        className="element-item project designing development"
                        key={index}
                      >
                        <Card className="gallery-box">
                          <div className="gallery-container">
                            <Link
                              className="image-popup"
                              to="#"
                              // title={title}
                              title="test"
                              // onClick={() => setIndex(key)}
                            >
                              <img
                                className="gallery-img img-fluid mx-auto"
                                src={filmtest}
                                alt=""
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  {" "}
                                  <div className="mb-3">
                                    <Button
                                      color="warning"
                                      className="custom-toggle active"
                                      style={{ width: "134px" }}
                                    >
                                      <span className="icon-off">
                                        <i className="ri-ticket-2-line align-bottom me-1"></i>{" "}
                                        {/* ri-ticket-2-line */}
                                        Buy Tickets
                                      </span>
                                    </Button>
                                  </div>
                                  <Button
                                    color="warning"
                                    outline
                                    className="waves-effect waves-light material-shadow-none text-light align-items-center"
                                    style={{ width: "134px" }}
                                  >
                                    {" "}
                                    {/* <span>
                                    {" "}
                                    <i className="bx bx-play-circle me-2 align-bottom"></i>
                                    Trailer{" "}
                                  </span> */}
                                    <span className="icon-off">
                                      <i className=" ri-play-circle-line align-bottom me-1"></i>{" "}
                                      <span>Trailer</span>
                                    </span>
                                  </Button>
                                </h5>
                              </div>
                            </Link>
                          </div>

                          <div className="box-content">
                            <div className="d-flex align-items-center mt-1">
                              <div className="flex-grow-1 text-muted">
                                <Link
                                  to="#"
                                  className="text-body text-truncate"
                                >
                                  {/* {auther} */}
                                  Lật Mặt 7: Một Điều Ước
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                    {/* ) )} */}
                  </Masonry>
                </TabPane>
                <TabPane tabId="2">
                  {" "}
                  <Masonry className="row gallery-wrapper">
                    {/* {filteredGallery.map(
                      ({ img, title, auther, likes, comments }, key) => ( */}
                    {data.map((item, index) => (
                      <Col
                        xxl={3}
                        xl={4}
                        sm={6}
                        className="element-item project designing development"
                        key={index}
                      >
                        <Card className="gallery-box">
                          <div className="gallery-container">
                            <Link
                              className="image-popup"
                              to="#"
                              // title={title}
                              title="test"
                              // onClick={() => setIndex(key)}
                            >
                              <img
                                className="gallery-img img-fluid mx-auto"
                                src={filmtest}
                                alt=""
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  {" "}
                                  <div className="mb-3">
                                    <Button
                                      color="warning"
                                      className="custom-toggle active"
                                      style={{ width: "134px" }}
                                    >
                                      <span className="icon-off">
                                        <i className="ri-ticket-2-line align-bottom me-1"></i>{" "}
                                        {/* ri-ticket-2-line */}
                                        Buy Tickets
                                      </span>
                                    </Button>
                                  </div>
                                  <Button
                                    color="warning"
                                    outline
                                    className="waves-effect waves-light material-shadow-none text-light align-items-center"
                                    style={{ width: "134px" }}
                                  >
                                    {" "}
                                    {/* <span>
                                    {" "}
                                    <i className="bx bx-play-circle me-2 align-bottom"></i>
                                    Trailer{" "}
                                  </span> */}
                                    <span className="icon-off">
                                      <i className=" ri-play-circle-line align-bottom me-1"></i>{" "}
                                      <span>Trailer</span>
                                    </span>
                                  </Button>
                                </h5>
                              </div>
                            </Link>
                          </div>

                          <div className="box-content">
                            <div className="d-flex align-items-center mt-1">
                              <div className="flex-grow-1 text-muted">
                                <Link
                                  to="#"
                                  className="text-body text-truncate"
                                >
                                  {/* {auther} */}
                                  Lật Mặt 7: Một Điều Ước
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                    {/* ) )} */}
                  </Masonry>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>
        <Container className="mt-5"></Container>
      </section>
    </React.Fragment>
  );
};

export default homepage;

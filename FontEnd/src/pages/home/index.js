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
import '../home/home.css';
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

  const [activeTab1, setActiveTab1] = useState("3");
  const tabChange1 = (tab) => {
    if (activeTab1 !== tab) setActiveTab1(tab);
  };

  const data = ["item1", "item1"];
  const data2 = [
    { title: 'TitleTitleTitleTitleTitleTitleTitleTitleTitle1', items: ["item1", "item1", "item1"] },
    { title: 'Title 2', items: ["item2", "item2", "item2"] },
    { title: 'Title 3', items: ["item3", "item3", "item3"] }
  ];
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

                  <Masonry className="row gallery-wrapper">
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
                              title="test"
                            >
                              <img
                                className="gallery-img img-fluid mx-auto"
                                src={filmtest}
                                alt=""
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  <div className="mb-3">
                                    <Button
                                      color="warning"
                                      className="custom-toggle active"
                                      style={{ width: "134px" }}
                                    >
                                      <span className="icon-off">
                                        <i className="ri-ticket-2-line align-bottom me-1"></i>
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
                                    <span className="icon-off">
                                      <i className=" ri-play-circle-line align-bottom me-1"></i>
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
                                  Lật Mặt 7: Một Điều Ước
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Masonry>
                </TabPane>
                <TabPane tabId="2">
                  <Masonry className="row gallery-wrapper">
                    {data2.map((item, index) => (
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
                              title="test"
                            >
                              <img
                                className="gallery-img img-fluid mx-auto"
                                src={filmtest}
                                alt=""
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  <div className="mb-3">
                                    <Button
                                      color="warning"
                                      className="custom-toggle active"
                                      style={{ width: "134px" }}
                                    >
                                      <span className="icon-off">
                                        <i className="ri-ticket-2-line align-bottom me-1"></i>
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
                                    <span className="icon-off">
                                      <i className=" ri-play-circle-line align-bottom me-1"></i>
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
                                  Lật Mặt 7: Một Điều Ước
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Masonry>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>

        {/* Góc Điển Ảnh */}
        <Container className="mt-5 pb-5">
          <Card style={{ marginTop: "80px" }} className="bg-light">
            <CardHeader style={{paddingBottom:30}}>
              <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0 d-flex align-items-center" role="tablist">
                <div className="text-xl inline-block font-bold uppercase d-flex align-items-center" style={{ borderLeft: "4px solid #007bff", fontSize: "23px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem", marginRight: "1rem" }}>
                  GÓC ĐIỆN ẢNH
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
                    Bình Luận Phim
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
                    Blog Điện Ảnh
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>

            <CardBody className="p-4">
              <TabContent activeTab={activeTab1}>
                <TabPane tabId="3">
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <img
                          src={filmtest}
                          alt=""
                          className="hover-img-home"
                          style={{ width: "500px", height: "400px", objectFit: "cover" }}
                        />
                        <Link
                          to="#"
                          className="hover-link-home"
                          style={{
                            fontSize: 23,
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          [Review] Badboi và gã đồ tể
                        </Link>
                      </div>
                    </Col>
                    <Col md={6}>
                      {data2.map((item, index) => (
                        <Row key={index} className="mb-3">
                          <Col md={6}>
                            <div className="d-flex align-items-center">
                              <img
                                src={filmtest}
                                alt=""
                                className="hover-img-home"
                                style={{
                                  width: "195px",
                                  height: "130px",
                                  marginRight: "15px",
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flexGrow: 1, marginTop: "-70px", width: "99%" }}>
                                <Link
                                  to="#"
                                  className="hover-link-home"
                                  style={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                    width: "100%",
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="4">
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <img
                          src={filmtest}
                          alt=""
                          className="hover-img-home"
                          style={{ width: "500px", height: "400px", objectFit: "cover" }}
                        />
                        <Link
                          to="#"
                          className="hover-link-home"
                          style={{
                            fontSize: 23,
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >
                          VENOM 3 sẽ chết
                        </Link>
                      </div>
                    </Col>
                    <Col md={6}>
                      {data2.map((item, index) => (
                        <Row key={index} className="mb-3">
                          <Col md={6}>
                            <div className="d-flex align-items-center">
                              <img
                                src={filmtest}
                                alt=""
                                className="hover-img-home"
                                style={{
                                  width: "195px",
                                  height: "130px",
                                  marginRight: "15px",
                                  objectFit: "cover",
                                  flexShrink: 0,
                                }}
                              />
                              <div style={{ flexGrow: 1, marginTop: "-70px", width: "99%" }}>
                                <Link
                                  to="#"
                                  className="hover-link-home"
                                  style={{
                                    fontSize: 23,
                                    fontWeight: "bold",
                                    width: "100%",
                                  }}
                                >
                                  {item.title}
                                </Link>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      ))}
                    </Col>
                  </Row>
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

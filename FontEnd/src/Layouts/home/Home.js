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
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import {
  Pagination,
  Navigation,
  Scrollbar,
  EffectFade,
  EffectCreative,
  Mousewheel,
  EffectFlip,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

import img1 from "../../assets/images/galaxy/img-1.png";

const Home = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
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
              <div class="swiper-slide d-flex justify-content-center align-items-center">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="swiper-slide d-flex justify-content-center align-items-center">
                <img src={img1} alt="" className="img-fluid" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div class="swiper-slide d-flex justify-content-center align-items-center">
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
              position: "relative",
              zIndex: 1,
              marginBottom: "100px",
            }}
          >
            <Form action="#" className="job-panel-filter border shadow">
              <Row className="g-md-0 g-2">
                <Col className="col-md-3">
                  <div>
                    <select className="form-control border" data-choices>
                      <option value="">Choose Movie</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-3">
                  <div>
                    <select className="form-control border" data-choices>
                      <option value="">Choose Theater</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2">
                  <div>
                    <select className="form-control border" data-choices>
                      <option value="">Choose Date</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Intership">Intership</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2">
                  <div>
                    <select
                      className="form-control border rounded-1"
                      data-choices
                    >
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
                      className="btn submit-btn w-100 h-100 bg-warning-subtle"
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
          <Card className="mt-xxl-n5" style={{ marginTop: "50px" }}>
            <CardHeader>
              <Nav
                className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                  >
                    <i className="fas fa-home"></i>
                    Đang chiếu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    <i className="far fa-user"></i>
                    Sắp chiếu
                  </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody className="p-4">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">a</TabPane>
                <TabPane tabId="2">b</TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Container>
        <Container className="mt-5"></Container>
      </section>
    </React.Fragment>
  );
};

export default Home;

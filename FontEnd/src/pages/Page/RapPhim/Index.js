import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import {
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import img1 from "../../../assets/images/sliderRapFlim/1.png";
import img2 from "../../../assets/images/sliderRapFlim/2.jpg";
import img3 from "../../../assets/images/sliderRapFlim/3.jpg";
import img4 from "../../../assets/images/sliderRapFlim/4.jpg";
import img5 from "../../../assets/images/sliderRapFlim/5.jpg";
import img6 from "../../../assets/images/sliderRapFlim/6.jpg";
import "./css/RapPhim.css";
import GoogleMap from "./GoogleMap";

const Index = () => {
  document.title = "Rạp Phim";

  const [activeTab, setActiveTab] = useState("1");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const data = [
    {
      title: "Garfield: Mèo Béo Siêu Quậy",
      img: "https://cdn.galaxycine.vn/media/2024/5/28/mv-500_1716879166318.jpg",
      showtimes: ["10:00", "12:30", "13:30", "15:45"],
    },
    {
      title: "Móng Vuốt",
      img: "https://cdn.galaxycine.vn/media/2024/5/27/garfield-1_1716798361490.jpg",
      showtimes: ["10:00", "12:30", "13:30", "15:45", "17:15", "19:45"],
    },
    {
      title: "Ngôi Đền Kỳ Quái 4",
      img: "https://cdn.galaxycine.vn/media/2024/5/27/pee-nak-4-1_1716796582162.jpg",
      showtimes: ["10:00", "12:30"],
    },
    {
      title: "Phim Điện Ảnh Doraemon: Nobita Và Bản Giao Hưởng Địa Cầu",
      img: "https://cdn.galaxycine.vn/media/2024/5/21/doraemon-movie-43-nobitas-earth-symphony-1-1_1716273120350.jpg",
      showtimes: ["10:00", "12:30", "13:30"],
    },
    {
      title: "Furiosa: Câu Chuyện Từ Max Điên",
      img: "https://cdn.galaxycine.vn/media/2024/5/24/furiosa-500_1716547292998.jpg",
      showtimes: ["10:00", "12:30", "13:30", "15:45", "17:15", "19:45", "21:00"],
    },
    {
      title: "Lật Mặt 7: Một Điều Ước 1",
      img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
      showtimes: ["10:00", "12:30", "17:15", "19:45", "21:00"],
    },
    {
      title: "Lật Mặt 7: Một Điều Ước 2",
      img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
      showtimes: ["10:00", "12:30", "13:30", "15:45", "17:15", "19:45", "21:00"],
    },
    {
      title: "Lật Mặt 7: Một Điều Ước 3",
      img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
      showtimes: ["10:00", "12:30", "13:30", "15:45", "17:15", "19:45", "21:00"],
    },
  ];

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <React.Fragment>
      <div style={{ paddingTop: 80, backgroundColor: "rgb(228 228 228)" }}>
        <Row>
          <Card>
            <CardBody>
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"1.3"}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                  dynamicBullets: true,
                }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper swiper effect-coverflow-swiper rounded pb-5"
              >
                <SwiperSlide>
                  <img src={img1} alt="" className="img-fluid swiper-rap-phim" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img2} alt="" className="img-fluid swiper-rap-phim" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img3} alt="" className="img-fluid swiper-rap-phim" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img4} alt="" className="img-fluid swiper-rap-phim" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img5} alt="" className="img-fluid swiper-rap-phim" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img6} alt="" className="img-fluid swiper-rap-phim" />
                </SwiperSlide>
                <div className="swiper-pagination swiper-pagination-dark"></div>
              </Swiper>
            </CardBody>
            <Container style={{ paddingTop: 26 }}>
              <Row>
                <Col md="9">
                  <h1 style={{ fontSize: 25, fontWeight: "bold" }}>
                    Galaxy Tân Bình
                  </h1>
                  <p>
                    Địa Chỉ: 391 Nam Kỳ Khởi Nghĩa, Quận 3 , Thành Phố Hồ Chí Minh <br />
                    Hotline: 1900123
                  </p>
                </Col>
                <Col md="3" className="d-flex">
                  <Input
                    type="select"
                    className="mx-2"
                    style={{
                      height: 45,
                      cursor: "pointer",
                      fontSize: "15px",
                      width: "auto",
                    }}
                  >
                    <option>Tất Cả Tỉnh</option>
                    <option>Tân Bình</option>
                    <option>Option 2</option>
                  </Input>
                  <Input
                    type="select"
                    className="mx-2"
                    style={{
                      height: 45,
                      cursor: "pointer",
                      fontSize: "15px",
                      width: "auto",
                    }}
                  >
                    <option>Rạp Phim</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </Input>
                </Col>
              </Row>
            </Container>
          </Card>
        </Row>
        <Container>
          <Row>
            <div className="movies-section-ActorInfor" style={{ paddingTop: 70 }}>
              <Row>
                <Card style={{ marginTop: "5px" }} className="bg-light">
                  <CardHeader>
                    <div className="d-flex align-items-center pb-3-rapphim">
                      <div className="text-xl inline-block font-bold uppercase title-rapphim">
                        PHIM
                      </div>
                    </div>
                    <Nav className="nav-tabs-custom-rapphim card-header-tabs-rapphim border-bottom-0-rapphim" role="tablist">
                      <NavItem className="nav-item-rapphim">
                        <NavLink
                          className={classnames("nav-link-rapphim", {
                            "active-rapphim": activeTab === "1",
                          })}
                          onClick={() => {
                            tabChange("1");
                          }}
                        >
                          Hôm Nay 25/06
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-rapphim">
                        <NavLink
                          className={classnames("nav-link-rapphim", {
                            "active-rapphim": activeTab === "2",
                          })}
                          onClick={() => {
                            tabChange("2");
                          }}
                          type="button"
                        >
                          Thứ Tư 26/06
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-rapphim">
                        <NavLink
                          className={classnames("nav-link-rapphim", {
                            "active-rapphim": activeTab === "3",
                          })}
                          onClick={() => {
                            tabChange("3");
                          }}
                          type="button"
                        >
                          Thứ Năm 27/06
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-rapphim">
                        <NavLink
                          className={classnames("nav-link-rapphim", {
                            "active-rapphim": activeTab === "4",
                          })}
                          onClick={() => {
                            tabChange("4");
                          }}
                          type="button"
                        >
                          Thứ Sáu 28/06
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-rapphim">
                        <NavLink
                          className={classnames("nav-link-rapphim", {
                            "active-rapphim": activeTab === "5",
                          })}
                          onClick={() => {
                            tabChange("5");
                          }}
                          type="button"
                        >
                          Thứ Bảy 29/06
                        </NavLink>
                      </NavItem>
                      <NavItem className="nav-item-rapphim">
                        <NavLink
                          className={classnames("nav-link-rapphim", {
                            "active-rapphim": activeTab === "6",
                          })}
                          onClick={() => {
                            tabChange("6");
                          }}
                          type="button"
                        >
                          Chủ Nhật 07/07
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>

                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <div className="movie-selection-rapphim">
                          <div className="movies-rapphim">
                            {data.map((movie, index) => (
                              <div
                                key={index}
                                className={`movie-rapphim ${selectedMovie === movie.title ? 'selected-rapphim' : ''}`}
                                onClick={() => handleMovieClick(movie.title)}
                              >
                                <img src={movie.img} alt={movie.title} />
                                <div className="title-phim-rapphim">{movie.title}</div>
                                {selectedMovie === movie.title && (
                                  <div className="selection-overlay-rapphim">
                                    <i style={{ fontSize: 70 }} className="ri-checkbox-circle-fill"></i>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {selectedMovie && (
                            <div className="showtimes-container-rapphim">
                              <div className="showtimes-rapphim">
                                <h3>Suất chiếu</h3>
                                <div className="title-phu-de">
                                  2D Phụ Đề
                                </div>
                                <div className="times-rapphim">
                                  {data.find((m) => m.title === selectedMovie).showtimes.map((time, idx) => (
                                    <button key={idx} className="time-rapphim">
                                      <span style={{fontSize:17}}>{time}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabPane>


                      {/* Tab pane 2 */}
                      <TabPane tabId="2">

                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Row>
            </div>
          </Row>
          <Row>
            {/* Thông tin chi tiết */}
            <div className="movies-section-ActorInfor" style={{ paddingTop: 30 }}>
              {/* Google Map */}
              <Row className="mb-4">
                <Col>
                  <GoogleMap />
                </Col>
              </Row>
              {/* Description */}
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Index;

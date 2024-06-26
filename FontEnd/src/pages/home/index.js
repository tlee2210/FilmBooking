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

  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
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
                      <option value="">Chọn Phim</option>
                      <option value="ke_trom_mat_trang_4">Kẻ Trộm Mặt Trăng 4</option>
                      <option value="mua_he_dep_nhat">Mùa Hè Đẹp Nhất</option>
                      <option value="nhung_manh_ghep_cam_xuc_2">Những Mảnh Ghép Cảm Xúc 2</option>
                      <option value="cuu_long_thanh_trai_vay_thanh">Cửu Long Thành Trại: Vây Thành</option>
                      <option value="chuyen_ma_giang_duong_nam_3">Chuyện Ma Giảng Đường - Năm 3</option>
                      <option value="cung_em_o_ngay_the_gioi_ket_thuc">Cùng Em Ở Ngày Thế Giới Kết Thúc</option>
                      <option value="gia_tai_cua_ngoai">Gia Tài Của Ngoại</option>
                      <option value="tru_bat_gioi_dai_nao_the_gioi_moi">Trư Bát Giới: Đại Náo Thế Giới Mới</option>
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
                      <option value="">Chọn Rạp</option>
                      <option value="theater1">Theater 1</option>
                      <option value="theater2">Theater 2</option>
                      <option value="theater3">Theater 3</option>
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
                      <option value="">Chọn Ngày</option>
                      <option value="date1">Ngày 1</option>
                      <option value="date2">Ngày 2</option>
                      <option value="date3">Ngày 3</option>
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
                      <option value="">Chọn Giờ</option>
                      <option value="time1">Time 1</option>
                      <option value="time2">Time 2</option>
                      <option value="time3">Time 3</option>
                    </select>
                  </div>
                </Col>
                <Col className="col-md-2">
                  <div className="h-100">
                    <Button
                      className={`btn submit-btn w-100 h-100 ${selectedTime ? 'bg-danger' : ''}`}
                      type="submit"
                      disabled={!selectedTime}
                    >
                      <i className="ri-search-2-line align-bottom me-1"></i> Mua Vé Nhanh
                    </Button>
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

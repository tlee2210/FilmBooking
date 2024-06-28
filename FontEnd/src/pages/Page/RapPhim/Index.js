import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { useDispatch, useSelector } from "react-redux";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "./css/RapPhim.css";
// import GoogleMap from "./GoogleMap";
import withRouter from "../../../Components/Common/withRouter";
import { getCinemaHome } from "../../../slices/home/CinemaHome/thunk";
import { createSelector } from "reselect";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const HomeCinema = (props) => {
  const dispatch = useDispatch();

  const slug = props.router.params.slug;
  // console.log(slug);

  const CinemaState = (state) => state;
  const CinemaStateData = createSelector(CinemaState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    cinemaData: state.HomeCinema.cinemaData,
  }));
  const { error, messageError, cinemaData } = useSelector(CinemaStateData);

  useEffect(() => {
    dispatch(getCinemaHome(slug, props.router.navigate));
  }, [slug]);

  document.title = cinemaData.name || "Cinema";

  const [activeTab, setActiveTab] = useState(0);
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
      showtimes: [
        "10:00",
        "12:30",
        "13:30",
        "15:45",
        "17:15",
        "19:45",
        "21:00",
      ],
    },
    {
      title: "Lật Mặt 7: Một Điều Ước 1",
      img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
      showtimes: ["10:00", "12:30", "17:15", "19:45", "21:00"],
    },
    {
      title: "Lật Mặt 7: Một Điều Ước 2",
      img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
      showtimes: [
        "10:00",
        "12:30",
        "13:30",
        "15:45",
        "17:15",
        "19:45",
        "21:00",
      ],
    },
    {
      title: "Lật Mặt 7: Một Điều Ước 3",
      img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg",
      showtimes: [
        "10:00",
        "12:30",
        "13:30",
        "15:45",
        "17:15",
        "19:45",
        "21:00",
      ],
    },
  ];

  const handleMovieClick = (movie) => {
    console.log("movie: ", movie);
    if (selectedMovie === movie) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
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
                {/* cinemaData */}
                {cinemaData && cinemaData?.images
                  ? cinemaData.images.map((item, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={item.url}
                          alt={item.uid}
                          className="img-fluid swiper-rap-phim"
                        />
                      </SwiperSlide>
                    ))
                  : null}
                <div className="swiper-pagination swiper-pagination-dark"></div>
              </Swiper>
            </CardBody>
            <Container style={{ paddingTop: 26 }}>
              <Row>
                <Col md="9">
                  <h1 style={{ fontSize: 25, fontWeight: "bold" }}>
                    {cinemaData?.name}
                  </h1>
                  <p>
                    Address: {cinemaData?.address}
                    <br />
                    Hotline: {cinemaData?.phone}
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
            <div
              className="movies-section-ActorInfor"
              style={{ paddingTop: 70 }}
            >
              <Row>
                <Card style={{ marginTop: "5px" }} className="bg-light">
                  <CardHeader>
                    <div className="d-flex align-items-center pb-3-rapphim">
                      <div className="text-xl inline-block font-bold uppercase title-rapphim">
                        MOVIE
                      </div>
                    </div>
                    <Nav
                      className="nav-tabs-custom-rapphim card-header-tabs-rapphim border-bottom-0-rapphim"
                      role="tablist"
                    >
                      {cinemaData && cinemaData.days
                        ? cinemaData?.days.map((day, index) => (
                            <NavItem key={index} className="nav-item-rapphim">
                              <NavLink
                                className={classnames("nav-link-rapphim", {
                                  "active-rapphim": activeTab === index,
                                })}
                                onClick={() => {
                                  tabChange(index);
                                }}
                                type="button"
                              >
                                {day?.date}
                              </NavLink>
                            </NavItem>
                          ))
                        : null}
                    </Nav>
                  </CardHeader>

                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      {cinemaData && Array.isArray(cinemaData.days)
                        ? cinemaData.days.map((day, index) => (
                            <TabPane tabId={index} key={index}>
                              <div className="movie-selection-rapphim">
                                <div className="movies-rapphim">
                                  {Array.isArray(day.movieList) &&
                                    day.movieList.map((movie, movieIndex) => (
                                      <div
                                        key={movieIndex}
                                        className={`movie-rapphim ${
                                          selectedMovie === movie.name
                                            ? "selected-rapphim"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleMovieClick(movie.name)
                                        }
                                      >
                                        <img
                                          src={movie.imagePortrait}
                                          alt={movie.name}
                                        />
                                        <div className="title-phim-rapphim">
                                          {movie.name}
                                        </div>
                                        {selectedMovie === movie.name && (
                                          <div className="selection-overlay-rapphim">
                                            <i
                                              style={{ fontSize: 70 }}
                                              className="ri-checkbox-circle-fill"
                                            ></i>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                </div>
                                {selectedMovie && cinemaData && (
                                  <div className="showtimes-container-rapphim">
                                    <div className="showtimes-rapphim">
                                      <h3>Suất chiếu</h3>
                                      <div className="title-phu-de">
                                        2D Phụ Đề
                                      </div>
                                      <div className="times-rapphim">
                                        {cinemaData.days.map(
                                          (day, dayIndex) => {
                                            const movie = day.movieList.find(
                                              (m) => m.name === selectedMovie
                                            );
                                            return (
                                              movie &&
                                              movie.times.map(
                                                (time, timeIndex) => (
                                                  <button
                                                    key={`${dayIndex}-${timeIndex}`}
                                                    className="time-rapphim"
                                                  >
                                                    <span
                                                      style={{ fontSize: 17 }}
                                                    >
                                                      {time}
                                                    </span>
                                                  </button>
                                                )
                                              )
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TabPane>
                          ))
                        : null}
                    </TabContent>
                  </CardBody>
                </Card>
              </Row>
            </div>
          </Row>
          <Row>
            {/* Thông tin chi tiết */}
            <div
              className="movies-section-ActorInfor"
              style={{ paddingTop: 30 }}
            >
              {/* Google Map */}
              <Row className="mb-4">
                <div className="page-content">
                  <Container fluid>
                    <Card>
                      <CardBody>
                        <Row className="mb-4">
                          <Col>
                            <div className="d-flex align-items-center pb-3">
                              <div
                                className="text-xl inline-block font-bold uppercase"
                                style={{
                                  borderLeft: "4px solid #007bff",
                                  fontSize: "23px",
                                  paddingLeft: "0.5rem",
                                }}
                              >
                                CINEMA DETAILS
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {/* Address and Phone */}
                        <Row className="mb-3">
                          <Col>
                            <div
                              style={{
                                fontSize: "18px",
                                marginBottom: "10px",
                              }}
                            >
                              <strong>Address: </strong> {cinemaData?.address}
                              <br />
                              <strong>Phone: </strong> {cinemaData?.phone}
                            </div>
                          </Col>
                        </Row>
                        <div
                          id="gmaps-markers"
                          className="gmaps"
                          style={{ position: "relative" }}
                        >
                          {/* {cinemaData?.lat } */}
                          <Map
                            google={props.google}
                            zoom={10}
                            style={mapStyles}
                            initialCenter={{
                              lat: cinemaData?.lat,
                              lng: cinemaData?.lng,
                            }}
                          >
                            {cinemaData && cinemaData.lat && cinemaData.lng ? (
                              <Marker
                                position={{
                                  lat:
                                    cinemaData && cinemaData?.lat
                                      ? cinemaData?.lat
                                      : 48.0,
                                  lng:
                                    cinemaData && cinemaData?.lng
                                      ? cinemaData?.lng
                                      : -122.0,
                                }}
                              />
                            ) : null}
                          </Map>
                        </div>
                        <Row className="mt-4" style={{ fontSize: "17px" }}>
                          <div
                            id="renderHtml"
                            dangerouslySetInnerHTML={{
                              __html: cinemaData?.description,
                            }}
                          />
                        </Row>
                      </CardBody>
                    </Card>
                  </Container>
                </div>
              </Row>
              {/* Description */}
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
const LoadingContainer = () => <div>Loading...</div>;

const WrappedComponent = GoogleApiWrapper({
  apiKey: "AIzaSyDFP-fyihmScYjgRGuxmgMoX5Mj1Nvv7bY",
  LoadingContainer: LoadingContainer,
  v: "3",
})(HomeCinema);

export default withRouter(WrappedComponent);

// export default withRouter(HomeCinema);

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
import { getBookingTime } from "../../../slices/home/bookingHome/thunk";
import { createSelector } from "reselect";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const HomeCinema = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const slug = props.router.params.slug;
  // console.log(slug);

  const [activeTab, setActiveTab] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieTime, setMovieTime] = useState(null);
  const [movieIndexRender, setMovieIndexRender] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");

  const CinemaState = (state) => state;
  const CinemaStateData = createSelector(CinemaState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    cinemaData: state.HomeCinema.cinemaData,
  }));
  const { error, messageError, cinemaData } = useSelector(CinemaStateData);

  useEffect(() => {
    dispatch(
      getCinemaHome(
        slug,
        selectedCity ? selectedCity : null,
        props.router.navigate
      )
    );
  }, [slug, selectedCity]);

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
    setSelectedMovie(null);
  };

  const handleBooking = (idRoom) => {
    dispatch(getBookingTime(idRoom, props.router.navigate));
  };

  const handleMovieClick = (movie, movieIndex, index) => {
    if (selectedMovie === movie.name) {
      setSelectedMovie("");
      setMovieTime("");
      setMovieIndexRender("");
    } else {
      const totalMovies = cinemaData.days[index].movieList.length;

      if (movieIndex <= 5) {
        setMovieIndexRender(Math.min(totalMovies - 1, 5));
      } else if (movieIndex < totalMovies - 1 && totalMovies - 1 <= 11) {
        setMovieIndexRender(Math.min(totalMovies - 1, 11));
      } else {
        setMovieIndexRender(totalMovies - 1);
      }

      setMovieTime(movie);
      setSelectedMovie(movie.name);
    }
  };

  const handleSelectCityChange = (event) => {
    setSelectedCinema("");
    setSelectedCity(event.target.value);
  };

  const handleSelectCinemaChange = (event) => {
    if (event.target.value !== slug && event.target.value !== "") {
      props.router.navigate(`/cinema/${event.target.value}`);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  document.title = cinemaData.name || "Cinema";

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
                    onChange={handleSelectCityChange}
                  >
                    <option value="">All City</option>
                    {cinemaData && cinemaData.cityList
                      ? cinemaData?.cityList.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        ))
                      : null}
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
                    onChange={handleSelectCinemaChange}
                    value={selectedCinema}
                  >
                    <option value={""}>Cinema</option>
                    {cinemaData && cinemaData.cinema
                      ? cinemaData?.cinema.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.label}
                          </option>
                        ))
                      : null}
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
                                      <React.Fragment key={movieIndex}>
                                        <Row>
                                          <Col
                                            md={3}
                                            className={`movie-rapphim ${
                                              selectedMovie === movie.name
                                                ? "selected-rapphim"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              handleMovieClick(
                                                movie,
                                                movieIndex,
                                                index
                                              )
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
                                          </Col>
                                        </Row>

                                        {selectedMovie &&
                                          movieTime &&
                                          movieIndex === movieIndexRender && (
                                            <Row className="showtimes-rapphim mb-3">
                                              <Col className=" max-width mb-1">
                                                <h3>Show Times</h3>
                                              </Col>
                                              {movieTime &&
                                                movieTime?.movieFormats?.map(
                                                  (movieFormats, dayIndex) => (
                                                    <Row>
                                                      <Col
                                                        key={dayIndex}
                                                        md={12}
                                                        className="table-showTime ms-3 mn-4"
                                                      >
                                                        <div className="title-phu-de">
                                                          {movieFormats.name}
                                                        </div>
                                                      </Col>
                                                      <div className="times-rapphim mb-3">
                                                        {movieTime &&
                                                        movieTime.movieFormats ? (
                                                          <Row>
                                                            {movieFormats.times.map(
                                                              (
                                                                format,
                                                                formatIndex
                                                              ) => (
                                                                <Col
                                                                  key={
                                                                    formatIndex
                                                                  }
                                                                >
                                                                  {" "}
                                                                  <button
                                                                    className="time-rapphim"
                                                                    onClick={() =>
                                                                      handleBooking(
                                                                        format.idRoom
                                                                      )
                                                                    }
                                                                  >
                                                                    <span
                                                                      style={{
                                                                        fontSize: 17,
                                                                      }}
                                                                    >
                                                                      {formatTime(
                                                                        format.time
                                                                      )}
                                                                    </span>
                                                                  </button>
                                                                </Col>
                                                              )
                                                            )}
                                                          </Row>
                                                        ) : null}
                                                      </div>
                                                    </Row>
                                                  )
                                                )}
                                            </Row>
                                            // </Row>
                                          )}
                                      </React.Fragment>
                                    ))}
                                </div>
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
                        {cinemaData && cinemaData?.lat && cinemaData.lng ? (
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
                              {cinemaData &&
                              cinemaData.lat &&
                              cinemaData.lng ? (
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
                        ) : null}

                        <Row className="mt-4" style={{ fontSize: "16px" }}>
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

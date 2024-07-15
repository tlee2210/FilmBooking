import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavLink,
  Modal,
  Row,
  Button,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./css/BuyTicket.css";
import "../CinemaCorner/css/CinemaCorner.css";
import classnames from "classnames";
// import { StrippedRow } from "../../../Components/Common/BasicTablesCode";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/bundle";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../../Components/Common/withRouter";
import {
  getBooking,
  getBookingTime,
} from "../../../slices/home/bookingHome/thunk";

// getMovieDetailsBook
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import {
  getMovieDetailsBook,
  getMovieActiveLimitIntroduce,
} from "../../../slices/home/MovieHome/thunk";
import { createSelector } from "reselect";

const Booking = (props) => {
  const dispatch = useDispatch();

  const slug = props.router.params.slug;
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");

  //   console.log(slug);

  useEffect(() => {
    dispatch(getMovieDetailsBook(slug));
  }, [slug]);

  useEffect(() => {
    dispatch(
      getBooking(
        slug,
        selectedCity ? selectedCity : null,
        selectedCinema ? selectedCinema : null
      )
    );
  }, [slug, selectedCity, selectedCinema]);

  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const MovieState = (state) => state;
  const MovieStateData = createSelector(MovieState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    MovieDetails: state.HomeMovie.MovieDetails,
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
    citySelect: state.HomeBooking.citySelect,
    cinemaSelect: state.HomeBooking.cinemaSelect,
    bookingShowTime: state.HomeBooking.bookingShowTime,
  }));

  const {
    error,
    messageError,
    MovieDetails,
    MovieIntroduce,
    citySelect,
    cinemaSelect,
    bookingShowTime,
  } = useSelector(MovieStateData);

  document.title = MovieDetails?.name || "Movie";

  const [animationNavTab, setanimationNavTab] = useState(0);

  const animationNavToggle = (tab) => {
    if (animationNavTab !== tab) {
      setanimationNavTab(tab);
    }
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleBooking = (idRoom) => {
    // console.log(idRoom);
    dispatch(getBookingTime(idRoom, props.router.navigate));
  };

  const getEmbedUrl = (url) => {
    const videoId = url?.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      const cleanVideoId =
        ampersandPosition !== -1
          ? videoId.substring(0, ampersandPosition)
          : videoId;
      return `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1`;
    }
  };

  const handleSelectCityChange = (event) => {
    setSelectedCinema("");
    setSelectedCity(event.target.value);
  };
  const handleSelectCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <Container style={{ paddingTop: 80 }} fluid>
      {/* Banner */}
      <div className="banner-container">
        <div className="overlay-side overlay-left"></div>
        <div className="banner-wrapper-buy-ticket" onClick={toggleModal}>
          <div className="banner-overlay"></div>
          <img
            src={MovieDetails?.imageLandscape}
            alt={MovieDetails?.name}
            className="img-fluid banner-thumbnail w-[860]"
          />
          <button className="play-button">▶️</button>
          <Modal
            id="flipModal"
            size="lg"
            isOpen={modal}
            toggle={() => {
              toggleModal();
            }}
            modalClassName="zoomIn"
            centered
          >
            <div className="ratio ratio-16x9">
              <iframe
                width="942"
                height="750"
                src={getEmbedUrl(MovieDetails.trailer)}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube video"
              ></iframe>
            </div>
          </Modal>
        </div>
        <div className="overlay-side overlay-right"></div>
      </div>

      <Container>
        {/* Content */}
        <Row className="mt-4">
          <Row>
            <Col lg={8}>
              <Col className="mb-4 mt-4">
                <Card className="h-100">
                  <Row className="mt-4">
                    <Col md={4} className="position-relative">
                      <img
                        style={{
                          height: "400px",
                          width: "300px",
                          objectFit: "cover",
                          border: "3px white solid",
                          marginTop: -120,
                        }}
                        className="rounded img-fluid position-absolute"
                        src={MovieDetails.imagePortrait}
                        alt="Movie Poster"
                      />
                    </Col>
                    <Col md={8} className="offset-md-4">
                      <Card className="h-100" style={{ paddingLeft: 20 }}>
                        <h1 className="title-ticketFilm mb-1">
                          {MovieDetails.name}
                        </h1>
                        <p className=" mb-2">
                          <span>
                            <i
                              style={{ color: "orange" }}
                              className="ri-time-line"
                            ></i>{" "}
                            {MovieDetails.duration_movie} Minutes
                          </span>
                          <span style={{ paddingLeft: 20 }}>
                            <i
                              style={{ color: "orange" }}
                              className="bx bx-calendar"
                            ></i>{" "}
                            {MovieDetails.releaseDate}
                          </span>
                        </p>
                        {/* <p className="card-text mb-2">
                          <span>
                            <i
                              className="bx bxs-star"
                              style={{ fontSize: 25, color: "orange" }}
                            ></i>
                            <span style={{ fontSize: 19 }}>9.0</span>
                            <span
                              className="text-muted"
                              style={{ fontSize: 15 }}
                            >
                              (89 votes)
                            </span>
                          </span>
                        </p> */}
                        <p className="card-text mb-2">
                          <span className="text-muted">
                            Nation: {MovieDetails.country?.name}
                          </span>
                        </p>
                        <p className="card-text mb-2">
                          <span
                            className="text-muted"
                            style={{ cursor: "pointer" }}
                          >
                            Producer: {MovieDetails.producer}
                          </span>
                        </p>
                        <p className="card-text mb-2">
                          <span
                            className="text-muted"
                            style={{ marginRight: 20 }}
                          >
                            Category:
                          </span>
                          <span className="genre-container-ticketFilm">
                            {MovieDetails && MovieDetails.categories?.length > 0
                              ? MovieDetails.categories.map((item, index) => {
                                  return (
                                    <Link
                                      key={index}
                                      to={`/movie-genre?category=${item.slug}`}
                                    >
                                      <button className="custom-button-ticketFilm">
                                        {item.name}
                                      </button>
                                    </Link>
                                  );
                                })
                              : null}
                          </span>
                        </p>
                        <p className="card-text mb-2">
                          <span
                            className="text-muted"
                            style={{ marginRight: 10 }}
                          >
                            Director:
                          </span>
                          <span className="genre-container-ticketFilm">
                            {MovieDetails && MovieDetails.director?.length > 0
                              ? MovieDetails.director.map((item, index) => {
                                  return (
                                    <Link
                                      to={`/director/${item.slug}/details`}
                                      style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                      }}
                                      key={index}
                                    >
                                      <button className="custom-button-ticketFilm">
                                        {item.name}
                                      </button>
                                    </Link>
                                  );
                                })
                              : null}
                          </span>
                        </p>
                        <p className="card-text mb-2">
                          <span
                            className="text-muted"
                            style={{ marginRight: 20 }}
                          >
                            Actor:
                          </span>
                          <span className="genre-container-ticketFilm">
                            {MovieDetails && MovieDetails.actor?.length > 0
                              ? MovieDetails.actor.map((item, index) => {
                                  return (
                                    <Link
                                      to={`/actor/${item.slug}/details`}
                                      style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                      }}
                                      key={index}
                                    >
                                      <button className="custom-button-ticketFilm">
                                        {item.name}
                                      </button>
                                    </Link>
                                  );
                                })
                              : null}
                          </span>
                        </p>
                      </Card>
                    </Col>
                  </Row>

                  {/* Nội dung phim  */}
                  <div className="mt-5 mb-3">
                    <div className="d-flex align-items-center pb-3">
                      <div
                        className="text-xl inline-block font-bold uppercase"
                        style={{
                          borderLeft: "4px solid #007bff",
                          fontSize: "16px",
                          fontWeight: "bold",
                          paddingLeft: "0.5rem",
                        }}
                      >
                        Movie Content
                      </div>
                    </div>
                    <Row>
                      <div
                        id="renderHtml"
                        dangerouslySetInnerHTML={{
                          __html: MovieDetails.description,
                        }}
                      />
                    </Row>
                  </div>

                  {/* Lịch Chiếu */}
                  <div className="">
                    <div className="d-flex align-items-center pb-3">
                      <div
                        className="text-xl inline-block font-bold uppercase"
                        style={{
                          borderLeft: "4px solid #007bff",
                          fontSize: "16px",
                          fontWeight: "bold",
                          paddingLeft: "0.5rem",
                        }}
                      >
                        Show Times
                      </div>
                    </div>
                    <Row>
                      <Col>
                        <Card>
                          <CardBody style={{ padding: 0 }}>
                            <Nav
                              pills
                              className="nav nav-pills animation-nav nav-justified gap-2 mb-3"
                              style={{ width: "80%" }}
                            >
                              <Row style={{ width: "100%" }}>
                                <Col md="7">
                                  <Swiper spaceBetween={10} slidesPerView={3.5}>
                                    {bookingShowTime
                                      ? bookingShowTime.map((item, index) => (
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
                                                    animationNavTab === index,
                                                }
                                              )}
                                              onClick={() => {
                                                animationNavToggle(index);
                                              }}
                                            >
                                              {item.day}
                                            </NavLink>
                                          </SwiperSlide>
                                        ))
                                      : null}
                                  </Swiper>
                                </Col>
                                <Col
                                  md="4"
                                  className="d-flex align-items-center"
                                  style={{ paddingLeft: 50 }}
                                >
                                  <Input
                                    type="select"
                                    style={{
                                      minWidth: 150,
                                      maxWidth: 150,
                                    }}
                                    className="custom-select-cinemaCorner mx-2"
                                    value={selectedCity}
                                    onChange={handleSelectCityChange}
                                  >
                                    <option value="">City</option>
                                    {citySelect
                                      ? citySelect.map((item, index) => (
                                          <option
                                            key={index}
                                            value={item.value}
                                          >
                                            {item.label}
                                          </option>
                                        ))
                                      : null}
                                  </Input>
                                  <Input
                                    type="select"
                                    className="custom-select-cinemaCorner mx-2"
                                    value={selectedCinema}
                                    style={{ minWidth: 180, maxWidth: 180 }}
                                    onChange={handleSelectCinemaChange}
                                  >
                                    <option value="">Cinema</option>
                                    {cinemaSelect
                                      ? cinemaSelect.map((item, index) => (
                                          <option
                                            key={index}
                                            value={item.value}
                                          >
                                            {item.label}
                                          </option>
                                        ))
                                      : null}
                                  </Input>
                                </Col>
                              </Row>
                            </Nav>
                            <div
                              style={{ borderBottom: "4px solid #dee2e6" }}
                            ></div>
                            <TabContent
                              activeTab={animationNavTab}
                              className="text-muted "
                            >
                              {bookingShowTime
                                ? bookingShowTime.map((item, index) => (
                                    <TabPane
                                      tabId={index}
                                      key={index}
                                      id="animation-home"
                                    >
                                      <Row>
                                        <Col>
                                          <Card>
                                            <CardBody style={{ padding: 0 }}>
                                              <div className="live-preview">
                                                <div className="table-responsive table-striped table-nowrap align-middle mb-0">
                                                  {/* <Row className="table-striped table-nowrap align-middle mb-0"> */}
                                                  {item && item.cinemaTimeMovies
                                                    ? item.cinemaTimeMovies.map(
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
                                                                {cinema &&
                                                                cinema.movieFormat ? (
                                                                  <Row>
                                                                    {cinema.movieFormat.map(
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
                                                                            md={
                                                                              2
                                                                            }
                                                                            className="ms-4"
                                                                          >
                                                                            {
                                                                              format.name
                                                                            }
                                                                          </Col>
                                                                          <Col
                                                                            md={
                                                                              9
                                                                            }
                                                                            className="d-flex flex-wrap"
                                                                          >
                                                                            {format.times
                                                                              ? format.times.map(
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
                                                                                )
                                                                              : null}
                                                                          </Col>
                                                                        </Row>
                                                                      )
                                                                    )}
                                                                  </Row>
                                                                ) : null}
                                                              </Row>
                                                            </Col>
                                                          </Row>
                                                        )
                                                      )
                                                    : null}

                                                  {/* </Row> */}
                                                </div>
                                              </div>
                                            </CardBody>
                                          </Card>
                                        </Col>
                                      </Row>
                                    </TabPane>
                                  ))
                                : null}
                            </TabContent>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Col>

            {/* Bên Phải */}
            <Col lg={4}>
              <MovieIsShowing MovieIntroduce={MovieIntroduce} />
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
};

export default withRouter(Booking);

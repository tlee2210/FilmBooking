import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
  Modal,
  Row,
  ModalBody,
  Button,
  TabContent,
  TabPane,
  Table,
  Input,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./css/BuyTicket.css";
import "../CinemaCorner/css/CinemaCorner.css";
import classnames from "classnames";
import { StrippedRow } from "../../../Components/Common/BasicTablesCode";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/bundle";
import "swiper/css";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../../Components/Common/withRouter";
// getMovieDetailsBook
import {
  getMovieDetailsBook,
  getMovieActiveLimitIntroduce,
} from "../../../slices/home/MovieHome/thunk";
import { createSelector } from "reselect";

const Booking = (props) => {
  const dispatch = useDispatch();

  const slug = props.router.params.slug;
  //   console.log(slug);

  useEffect(() => {
    dispatch(getMovieDetailsBook(slug));
    // dispatch(getMovieDetailsBook(slug, props.router.navigate));
  }, [slug]);

  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const MovieState = (state) => state;
  const MovieStateData = createSelector(MovieState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    MovieDetails: state.HomeMovie.MovieDetails,
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
  }));

  const { error, messageError, MovieDetails, MovieIntroduce } =
    useSelector(MovieStateData);
  document.title = MovieDetails?.name || "Movie";

  const [animationNavTab, setanimationNavTab] = useState("1");
  const animationNavToggle = (tab) => {
    if (animationNavTab !== tab) {
      setanimationNavTab(tab);
    }
  };

  const theaters = [
    {
      id: 1,
      name: "Galaxy Nguyễn Du",
      showtimes: ["09:00", "12:00", "15:00", "17:00"],
    },
    { id: 2, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 3, name: "Start", showtimes: ["11:00", "14:00", "17:00"] },
    { id: 4, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 5, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 6, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 7, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 8, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 9, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
    { id: 10, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
  ];

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
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
                                    <button
                                      key={index}
                                      className="custom-button-ticketFilm"
                                    >
                                      {item.name}
                                    </button>
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
                                    >
                                      <button
                                        key={index}
                                        className="custom-button-ticketFilm"
                                      >
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
                                    >
                                      <button
                                        key={index}
                                        className="custom-button-ticketFilm"
                                      >
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
                        Lịch Chiếu
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
                                <Col md="8">
                                  <Swiper spaceBetween={10} slidesPerView={3.5}>
                                    <SwiperSlide>
                                      <NavLink
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "14px",
                                          padding: "5px",
                                          textAlign: "center",
                                        }}
                                        className={classnames(
                                          "nav-link-lich-chieu-phim",
                                          { active: animationNavTab === "1" }
                                        )}
                                        onClick={() => {
                                          animationNavToggle("1");
                                        }}
                                      >
                                        Ngày 27/5
                                      </NavLink>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                      <NavLink
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "14px",
                                          padding: "5px",
                                          textAlign: "center",
                                        }}
                                        className={classnames(
                                          "nav-link-lich-chieu-phim",
                                          { active: animationNavTab === "2" }
                                        )}
                                        onClick={() => {
                                          animationNavToggle("2");
                                        }}
                                      >
                                        Ngày 28/5
                                      </NavLink>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                      <NavLink
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "14px",
                                          padding: "5px",
                                          textAlign: "center",
                                        }}
                                        className={classnames(
                                          "nav-link-lich-chieu-phim",
                                          { active: animationNavTab === "3" }
                                        )}
                                        onClick={() => {
                                          animationNavToggle("3");
                                        }}
                                      >
                                        Ngày 29/5
                                      </NavLink>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                      <NavLink
                                        style={{
                                          cursor: "pointer",
                                          fontSize: "14px",
                                          padding: "5px",
                                          textAlign: "center",
                                        }}
                                        className={classnames(
                                          "nav-link-lich-chieu-phim",
                                          { active: animationNavTab === "4" }
                                        )}
                                        onClick={() => {
                                          animationNavToggle("4");
                                        }}
                                      >
                                        Ngày 30/5
                                      </NavLink>
                                    </SwiperSlide>
                                  </Swiper>
                                </Col>
                                <Col
                                  md="4"
                                  className="d-flex align-items-center"
                                  style={{ paddingLeft: 80 }}
                                >
                                  <Input
                                    type="select"
                                    className="custom-select-cinemaCorner mx-2"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "12px",
                                      width: "auto",
                                    }}
                                  >
                                    <option>Toàn Quốc</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                  </Input>
                                  <Input
                                    type="select"
                                    className="custom-select-cinemaCorner mx-2"
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "12px",
                                      width: "auto",
                                    }}
                                  >
                                    <option>Tất Cả Rạp</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
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
                              {/* Tab ID 1 */}
                              <TabPane tabId="1" id="animation-home">
                                <Row>
                                  <Col>
                                    <Card>
                                      <CardBody style={{ padding: 0 }}>
                                        <div className="live-preview">
                                          <div className="table-responsive">
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                              <tbody>
                                                {theaters.map((theater) => (
                                                  <tr
                                                    key={theater.id}
                                                    style={{ height: 120 }}
                                                    className="fw-bolder"
                                                  >
                                                    <td
                                                      style={{ fontSize: 17 }}
                                                    >
                                                      {theater.name}
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          gap: "20px",
                                                          cursor: "pointer",
                                                          fontSize: "12px",
                                                          width: "auto",
                                                        }}
                                                      >
                                                        {theater.showtimes.map(
                                                          (showtime) => (
                                                            <Button
                                                              style={{
                                                                width: 110,
                                                                backgroundColor:
                                                                  "white",
                                                                color: "black",
                                                                border:
                                                                  "1px solid rgb(189, 192, 194)",
                                                              }}
                                                              key={showtime}
                                                              color="primary"
                                                              onMouseEnter={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "#c0c1df";
                                                              }}
                                                              onMouseLeave={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "white";
                                                              }}
                                                              onClick={() =>
                                                                setSelectedShowtime(
                                                                  showtime
                                                                )
                                                              }
                                                            >
                                                              {showtime}
                                                            </Button>
                                                          )
                                                        )}
                                                      </div>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </TabPane>

                              {/* Tab ID 2 */}
                              <TabPane tabId="2" id="animation-profile">
                                <Row>
                                  <Col>
                                    <Card>
                                      <CardBody style={{ padding: 0 }}>
                                        <div className="live-preview">
                                          <div className="table-responsive">
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                              <tbody>
                                                {theaters.map((theater) => (
                                                  <tr
                                                    key={theater.id}
                                                    style={{ height: 120 }}
                                                    className="fw-bolder"
                                                  >
                                                    <td
                                                      style={{ fontSize: 17 }}
                                                    >
                                                      {theater.name}
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          gap: "20px",
                                                          cursor: "pointer",
                                                          fontSize: "12px",
                                                          width: "auto",
                                                        }}
                                                      >
                                                        {theater.showtimes.map(
                                                          (showtime) => (
                                                            <Button
                                                              style={{
                                                                width: 110,
                                                                backgroundColor:
                                                                  "white",
                                                                color: "black",
                                                                border:
                                                                  "1px solid rgb(189, 192, 194)",
                                                              }}
                                                              key={showtime}
                                                              color="primary"
                                                              onMouseEnter={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "#c0c1df";
                                                              }}
                                                              onMouseLeave={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "white";
                                                              }}
                                                              onClick={() =>
                                                                setSelectedShowtime(
                                                                  showtime
                                                                )
                                                              }
                                                            >
                                                              {showtime}
                                                            </Button>
                                                          )
                                                        )}
                                                      </div>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>
                                        <div className="d-none code-view">
                                          <pre
                                            className="language-markup"
                                            style={{ height: "275px" }}
                                          >
                                            <code>
                                              <StrippedRow />
                                            </code>
                                          </pre>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </TabPane>

                              <TabPane tabId="3" id="animation-messages">
                                <Row>
                                  <Col>
                                    <Card>
                                      <CardBody style={{ padding: 0 }}>
                                        <div className="live-preview">
                                          <div className="table-responsive">
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                              <tbody>
                                                {theaters.map((theater) => (
                                                  <tr
                                                    key={theater.id}
                                                    style={{ height: 120 }}
                                                    className="fw-bolder"
                                                  >
                                                    <td
                                                      style={{ fontSize: 17 }}
                                                    >
                                                      {theater.name}
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          gap: "20px",
                                                          cursor: "pointer",
                                                          fontSize: "12px",
                                                          width: "auto",
                                                        }}
                                                      >
                                                        {theater.showtimes.map(
                                                          (showtime) => (
                                                            <Button
                                                              style={{
                                                                width: 110,
                                                                backgroundColor:
                                                                  "white",
                                                                color: "black",
                                                                border:
                                                                  "1px solid rgb(189, 192, 194)",
                                                              }}
                                                              key={showtime}
                                                              color="primary"
                                                              onMouseEnter={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "#c0c1df";
                                                              }}
                                                              onMouseLeave={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "white";
                                                              }}
                                                              onClick={() =>
                                                                setSelectedShowtime(
                                                                  showtime
                                                                )
                                                              }
                                                            >
                                                              {showtime}
                                                            </Button>
                                                          )
                                                        )}
                                                      </div>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>
                                        <div className="d-none code-view">
                                          <pre
                                            className="language-markup"
                                            style={{ height: "275px" }}
                                          >
                                            <code>
                                              <StrippedRow />
                                            </code>
                                          </pre>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </TabPane>

                              <TabPane tabId="4" id="animation-settings">
                                <Row>
                                  <Col>
                                    <Card>
                                      <CardBody style={{ padding: 0 }}>
                                        <div className="live-preview">
                                          <div className="table-responsive">
                                            <Table className="table-striped table-nowrap align-middle mb-0">
                                              <tbody>
                                                {theaters.map((theater) => (
                                                  <tr
                                                    key={theater.id}
                                                    style={{ height: 120 }}
                                                    className="fw-bolder"
                                                  >
                                                    <td
                                                      style={{ fontSize: 17 }}
                                                    >
                                                      {theater.name}
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          gap: "20px",
                                                          cursor: "pointer",
                                                          fontSize: "12px",
                                                          width: "auto",
                                                        }}
                                                      >
                                                        {theater.showtimes.map(
                                                          (showtime) => (
                                                            <Button
                                                              style={{
                                                                width: 110,
                                                                backgroundColor:
                                                                  "white",
                                                                color: "black",
                                                                border:
                                                                  "1px solid rgb(189, 192, 194)",
                                                              }}
                                                              key={showtime}
                                                              color="primary"
                                                              onMouseEnter={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "#c0c1df";
                                                              }}
                                                              onMouseLeave={(
                                                                e
                                                              ) => {
                                                                e.target.style.backgroundColor =
                                                                  "white";
                                                              }}
                                                              onClick={() =>
                                                                setSelectedShowtime(
                                                                  showtime
                                                                )
                                                              }
                                                            >
                                                              {showtime}
                                                            </Button>
                                                          )
                                                        )}
                                                      </div>
                                                    </td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </div>
                                        <div className="d-none code-view">
                                          <pre
                                            className="language-markup"
                                            style={{ height: "275px" }}
                                          >
                                            <code>
                                              <StrippedRow />
                                            </code>
                                          </pre>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                </Row>
                              </TabPane>
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
              {/* PHIM ĐANG CHIẾU */}
              <Card className="quick-ticket-card-phim-dang-chieu">
                <div className="d-flex align-items-center pb-3">
                  <div
                    className="text-xl inline-block font-bold uppercase"
                    style={{
                      borderLeft: "4px solid #007bff",
                      fontSize: "18px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    MOVIE IS SHOWING
                  </div>
                </div>
              </Card>

              {MovieIntroduce
                ? MovieIntroduce?.map((movie, index) => (
                    <Card
                      key={index}
                      className="quick-ticket-card-phim-dang-chieu mt-4"
                    >
                      <Link
                        to={`/booking/${movie.slug}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <CardBody className="position-relative p-0 hover-container">
                          <img
                            style={{
                              height: "280px",
                              width: "380px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            className="img-fluid hover-image"
                            src={movie.imageLandscape}
                            alt="Movie"
                          />
                          <div className="ticket-overlay">
                            <img
                              src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
                              alt="Ticket"
                              className="ticket-image"
                            />
                          </div>
                          <div style={{ paddingTop: 7 }}>
                            <h1>{movie.name}</h1>
                          </div>
                        </CardBody>
                      </Link>
                    </Card>
                  ))
                : null}
              <div className="button-dien-vien">
                <Button
                  color="secondary"
                  outline
                  className="waves-effect waves-light material-shadow-none"
                >
                  {" "}
                  Xem Thêm <i className="bx bx-right-arrow-alt"></i>{" "}
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
};

export default withRouter(Booking);

import React, { useState, useEffect } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  FormGroup,
  Button,
} from "reactstrap";
import "../CinemaCorner/css/CinemaCorner.css";
import withRouter from "../../../Components/Common/withRouter";

import RightColumn from "../CinemaCorner/RightColumn";
import { getBlogDetails } from "../../../slices/home/BlogAndReviewHome/thunk";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";

const BlogDetails = (props) => {
  const dispatch = useDispatch();

  const slug = props.router.params.slug;

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    dispatch(getBlogDetails(slug, props.router.navigate));
  }, [dispatch, slug]);

  // getMovieActiveLimitIntroduce
  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const BlogState = (state) => state;
  const BlogStateData = createSelector(BlogState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    item: state.BlogOrReview.item,
    otherItem: state.BlogOrReview.otherItem,
    // HomeMovie
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
  }));

  const { error, messageError, item, otherItem, MovieIntroduce } =
    useSelector(BlogStateData);

  document.title = item?.name || "blog";

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <Container fluid>
          <Row>
            <Col lg={8}>
              <Row>
                <Col md={12}>
                  <p style={{ fontSize: 26, fontWeight: "bold" }}>
                    {item?.name}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={12} id="renderHtml">
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div
                    className="d-flex align-items-center pb-3"
                    style={{ paddingTop: 100 }}
                  >
                    <div
                      className="text-xl inline-block font-bold uppercase"
                      style={{
                        borderLeft: "4px solid #007bff",
                        fontSize: "17px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        paddingLeft: "0.5rem",
                      }}
                    >
                      Blog Other
                    </div>
                  </div>
                  <Row className="g-3">
                    {otherItem
                      ? otherItem?.map((movie, index) => (
                          <Col key={index} className="col-xxl col-6">
                            <Link
                              key={index}
                              to={`/blog-movie/${movie.slug}/details`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <Card className="h-100">
                                <img
                                  className="card-img-top img-fluid"
                                  src={movie.thumbnail}
                                  alt={movie.thumbnail}
                                />
                                <CardBody>
                                  <h4 className="card-title">{movie.name}</h4>
                                </CardBody>
                              </Card>
                            </Link>
                          </Col>
                        ))
                      : null}
                  </Row>
                </Col>
              </Row>
            </Col>

            {/* Bên Phải */}
            <Col lg={4}>
              <Container>
                <RightColumn />
                <Row>
                  <div
                    className="text-xl inline-block font-bold uppercase"
                    style={{
                      borderLeft: "4px solid #007bff",
                      fontSize: "18px",
                      fontWeight: "bold",
                      paddingLeft: "0.5rem",
                      marginLeft: "40px",
                    }}
                  >
                    MOVIE IS SHOWING
                  </div>
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
                </Row>
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
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(BlogDetails);

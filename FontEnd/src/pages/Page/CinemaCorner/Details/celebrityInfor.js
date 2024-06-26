import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  CardHeader,
} from "reactstrap";
import { Link } from "react-router-dom";

import { createSelector } from "reselect";
import RightColumn from "../RightColumn";
import { useSelector, useDispatch } from "react-redux";
import withRouter from "../../../../Components/Common/withRouter";
import { getcelebrityDetails } from "../../../../slices/home/CelebrityHome/thunk";
import { getMovieActiveLimitIntroduce } from "../../../../slices/home/MovieHome/thunk";

import buttonTicket from '../../../../assets/images/buttonTicket/btn-ticket.png';

const ActorInfor = (props) => {
  const dispatch = useDispatch();
  const slug = props.router.params.slug;

  useEffect(() => {
    dispatch(getcelebrityDetails(slug, props.router.navigate));

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [dispatch, slug]);

  // getMovieActiveLimitIntroduce
  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const CelebrityState = (state) => state;
  const CelebrityStateData = createSelector(CelebrityState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    item: state.HomeCelebrity.item,
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
  }));

  const { error, messageError, item, MovieIntroduce } =
    useSelector(CelebrityStateData);

  document.title = item?.name || "Actor";

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col lg={8}>
                <Card>
                  <CardBody>
                    {item ? (
                      <>
                        <div className="actor-info-ActorInfor">
                          <div>
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="actor-info-text-ActorInfor">
                            <h2>{item.name}</h2>
                            {/* <p>{item.biography}</p> */}
                            <div
                              id="renderHtml"
                              dangerouslySetInnerHTML={{
                                __html: item.biography,
                              }}
                            />
                            <p>
                              <strong>Day Of Birthday: </strong>{" "}
                              {item.dateOfBirth}
                            </p>
                            <p>
                              <strong>Country: </strong>
                              {item?.country?.name}
                            </p>
                          </div>
                        </div>

                        <div className="movies-section-ActorInfor">
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
                              FILM DA PARTICIPATES
                            </div>
                          </div>
                          <Row>
                            {item.movieList?.map((movie, index) => (
                              <Col key={index} md={6}>
                                <div className="movie-item-ActorInfor hadow-lg p-3 bg-white rounded">
                                  <img
                                    src={movie.image || "default_image_url"}
                                    alt={movie.name}
                                    className="img-fluid"
                                  />
                                  <div className="align-items-center">
                                    {/* <h5>{movie.name}</h5> */}
                                    {movie.name}
                                  </div>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </div>

                        <div className="movies-section-ActorInfor">
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
                              STORY
                            </div>
                          </div>
                          <Row>
                            <div
                              id="renderHtml"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          </Row>
                        </div>
                      </>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </CardBody>
                </Card>
              </Col>

              <Col lg={4}>
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
                                src={movie.imagePortrait}
                                alt="Movie"
                              />
                              <div className="ticket-overlay">
                                <img
                                  src={buttonTicket}
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
                  <Link
                    to="/movie"
                    className="btn btn-outline-danger waves-effect waves-light material-shadow-none"
                    style={{ textDecoration: "none" }}
                  >
                    See More <i className="bx bx-right-arrow-alt"></i>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(ActorInfor);

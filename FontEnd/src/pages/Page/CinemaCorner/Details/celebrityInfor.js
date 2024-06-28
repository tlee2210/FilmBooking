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
import { useSelector, useDispatch } from "react-redux";
import withRouter from "../../../../Components/Common/withRouter";
import { getcelebrityDetails } from "../../../../slices/home/CelebrityHome/thunk";
import { getMovieActiveLimitIntroduce } from "../../../../slices/home/MovieHome/thunk";
import MovieIsShowing from "../../BuyTicket/MovieIsShowing";
import RightColumn from "../RightColumn";

import buttonTicket from "../../../../assets/images/buttonTicket/btn-ticket.png";

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
                <MovieIsShowing MovieIntroduce={MovieIntroduce} />
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(ActorInfor);

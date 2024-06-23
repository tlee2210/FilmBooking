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
import { createSelector } from "reselect";
import RightColumn from "../RightColumn";
import { useSelector, useDispatch } from "react-redux";
import withRouter from "../../../../Components/Common/withRouter";
import { getcelebrityDetails } from "../../../../slices/home/CelebrityHome/thunk";

const ActorInfor = (props) => {
  const dispatch = useDispatch();
  const slug = props.router.params.slug;

  useEffect(() => {
    dispatch(getcelebrityDetails(slug, props.router.navigate));
  }, [dispatch, slug]);

  const CelebrityState = (state) => state;
  const CelebrityStateData = createSelector(CelebrityState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    item: state.HomeCelebrity.item,
  }));

  const { error, messageError, item } = useSelector(CelebrityStateData);

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
                <div className="button-dien-vien">
                  <Button
                    color="secondary"
                    outline
                    className="waves-effect waves-light material-shadow-none"
                  >
                    Xem Thêm <i className="bx bx-right-arrow-alt"></i>
                  </Button>
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

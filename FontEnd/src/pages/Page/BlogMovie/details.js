import React, { useEffect } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import "../CinemaCorner/css/CinemaCorner.css";
import withRouter from "../../../Components/Common/withRouter";

import RightColumn from "../CinemaCorner/RightColumn";
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import { getBlogDetails } from "../../../slices/home/BlogAndReviewHome/thunk";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";

// import buttonTicket from "../../../assets/images/buttonTicket/btn-ticket.png";

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
                                  src={movie.imagePortrait}
                                  alt={movie.imagePortrait}
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
              <RightColumn />
              <MovieIsShowing MovieIntroduce={MovieIntroduce} />
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(BlogDetails);

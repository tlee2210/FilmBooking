import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";
import "./css/TheLoaiPhim.css";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";
import RightColumn from "../CinemaCorner/RightColumn";
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import { getMovieGenreDetail } from "../../../slices/home/Movie-GenreHome/thunk";
import { message, Image } from "antd";

const MovieDetail = (props) => {
  const dispatch = useDispatch();
  const slug = props.router.params.slug;

  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMovieGenreDetail(slug, props.router.navigate));
  }, [dispatch, slug]);

  const MovieGenreState = (state) => state;
  const MovieGenreStateData = createSelector(MovieGenreState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
    movie: state.HomeMovieGenre.movieDetail,
  }));

  const { error, messageError, MovieIntroduce, movie } =
    useSelector(MovieGenreStateData);

  const getFirstSentence = (description) => {
    const firstPeriodIndex = description.indexOf(".");
    if (firstPeriodIndex !== -1) {
      return description.substring(0, firstPeriodIndex + 1);
    }
    return description + "...";
  };

  document.title = `Movie ${movie?.name}`;

  return (
    <Container
      className="movie-detail-container-theloaiphimDetails"
      style={{ paddingTop: 100 }}
    >
      <div className="page-content-theloaiphimDetails">
        <Container fluid>
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="movie-header-theloaiphimDetails">
                    <Row>
                      <Col md="3">
                        <img
                          src={movie?.imagePortrait}
                          alt={movie?.name}
                          className="movie-poster-theloaiphimDetails"
                        />
                      </Col>
                      <Col md="9" style={{ paddingLeft: 20 }}>
                        <h1 className="movie-title-theloaiphimDetails">
                          {movie?.name}{" "}
                          {movie && movie?.rules ? (
                            <span className="movie-rating-badge-theloaiphimDetails">
                              {movie?.rules} yrs
                            </span>
                          ) : null}
                        </h1>
                        <div className="movie-meta-theloaiphimDetails">
                          <span className="movie-duration-theloaiphimDetails">
                            <i className="fa fa-clock-o"></i>{" "}
                            {movie?.duration_movie} Minute
                          </span>
                          <span className="movie-releaseDate-theloaiphimDetails">
                            <i className="fa fa-calendar"></i>{" "}
                            {movie?.releaseDate}
                          </span>
                          {/* <span className="movie-views-theloaiphimDetails">
                            <i className="fa fa-eye"></i> 2601990
                          </span> */}
                          {/* <span className="movie-rating-theloaiphimDetails">
                            <i className="fa fa-star"></i> {movieDetails.rating}{" "}
                            <span className="movie-votes-theloaiphimDetails">
                              ({movieDetails.votes})
                            </span>
                          </span> */}
                        </div>
                        <div className="movie-info-theloaiphimDetails">
                          <p>
                            <strong>Actor: </strong>
                            {movie?.actor
                              ?.map((actor) => actor.name)
                              .join(", ")}
                          </p>
                          <p>
                            <strong>Producer: </strong>
                            {movie?.producer}
                          </p>
                          <p>
                            <strong>Category: </strong>
                            {movie?.categories
                              ?.map((Category) => Category.name)
                              .join(", ")}
                          </p>
                          <p>
                            <strong>Director: </strong>
                            {movie?.director
                              ?.map((director) => director.name)
                              .join(", ")}
                          </p>
                          <p>
                            <strong>Country: </strong>
                            {movie?.country?.name}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="movie-description-theloaiphimDetails">
                    <h2 className="section-title-theloaiphimDetails">
                      MOVIE CONTENT
                    </h2>
                    <div
                      className="card-text text-muted"
                      style={{
                        fontFamily: "Arial",
                        fontSize: "12px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: movie?.description,
                      }}
                    />
                  </div>
                  <div className="movie-cast-theloaiphimDetails">
                    <h2 className="section-title-theloaiphimDetails">Actor</h2>
                    <Row>
                      {movie &&
                        movie?.actor?.map((actor, index) => (
                          <Col key={index} md={6}>
                            <Link
                              key={index}
                              to={`/actor/${actor.slug}/details`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <div className="actor-item-theloaiphimDetails">
                                <img
                                  src={actor.image}
                                  alt={actor.name}
                                  className="actor-image-theloaiphimDetails"
                                />
                                <p className="actor-name-theloaiphimDetails">
                                  {actor.name}
                                </p>
                              </div>
                            </Link>
                          </Col>
                        ))}
                    </Row>
                  </div>
                  {/* FILM IMAGES */}
                  <div className="movie-trivia-theloaiphimDetails">
                    <Row>
                      <h2 className="section-title-theloaiphimDetails">
                        FILM IMAGES
                      </h2>
                      {movie && movie.images && movie.images.length > 0 ? (
                        movie?.images?.map((image, index) => (
                          <Col key={index} md={2} className="me-2 mb-1">
                            <Image
                              src={image.url}
                              alt={image.url}
                              className="film-image-theloaiphimDetails"
                            />
                          </Col>
                        ))
                      ) : (
                        <p>Updating...</p>
                      )}
                    </Row>
                  </div>
                  <div className="movie-trivia-theloaiphimDetails">
                    <h2 className="section-title-theloaiphimDetails">
                      SUBPLOT
                    </h2>
                    {movie && movie.subplot && movie.subplot.length > 0 ? (
                      movie?.subplot?.map((item, index) => (
                        <React.Fragment key={index}>
                          <p
                            className="card-text mb-2 text-muted"
                            style={{
                              fontFamily: "Arial",
                              fontSize: "12px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: getFirstSentence(item.description),
                            }}
                          ></p>
                          <Link
                            to={`/movie-commentary/${item?.slug}/details`}
                            className="see-more-link-theloaiphimDetails"
                          >
                            See More
                          </Link>
                        </React.Fragment>
                      ))
                    ) : (
                      <p>Updating...</p>
                    )}
                  </div>
                  <div className="movie-comments-theloaiphimDetails">
                    <h2 className="section-title-theloaiphimDetails">
                      MOVIE REVIEW
                    </h2>
                    {movie &&
                    movie.movieReview &&
                    movie.movieReview.length > 0 ? (
                      movie?.movieReview?.map((item, index) => (
                        <React.Fragment key={index}>
                          <p
                            className="card-text mb-2 text-muted"
                            style={{
                              fontFamily: "Arial",
                              fontSize: "12px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: getFirstSentence(item.description),
                            }}
                          ></p>
                          <Link
                            to={`/movie-commentary/${item?.slug}/details`}
                            className="see-more-link-theloaiphimDetails"
                          >
                            see more
                          </Link>
                        </React.Fragment>
                      ))
                    ) : (
                      <p>Updating...</p>
                    )}
                  </div>
                  <div className="related-articles-theloaiphimDetails mt-5">
                    <h2 className="section-title-theloaiphimDetails">
                      RELATED ARTICLES
                    </h2>
                    <Row className="g-3">
                      {movie && movie?.reviews
                        ? movie?.reviews?.map((movie, index) => (
                            <Col key={index} className="col-xxl col-6">
                              <Link
                                key={index}
                                to={`/movie-commentary/${movie.slug}/details`}
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
                  </div>
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
  );
};

export default withRouter(MovieDetail);

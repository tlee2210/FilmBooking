import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../../../Components/Common/withRouter";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";

import RightColumn from "../CinemaCorner/RightColumn";
import { getHomeReview } from "../../../slices/home/BlogAndReviewHome/thunk";

// Import Images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const MovieCommentary = () => {
  document.title = "Movie Commentary";
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState("");

  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 10
  );
  const [type, setType] = useState(searchParams.get("type") || null);

  // getMovieActiveLimitIntroduce
  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const RevewState = (state) => state;
  const ReviewStateData = createSelector(RevewState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    data: state.BlogOrReview.data,
    selectOptions: state.BlogOrReview.selectOptions,
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
  }));
  const { error, messageError, data, selectOptions, MovieIntroduce } =
    useSelector(ReviewStateData);

  useEffect(() => {
    let params = {};

    type && type.length > 0 && type !== "" ? (params.type = type) : null;

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);
    dispatch(getHomeReview(type ? type : null, pageNo, pageSize));

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [dispatch, type, pageNo, pageSize]);

  const handlePagination = (page) => {
    const newPageNo = page + 1;
    setPageNo(newPageNo);
    setSearchParams({ type, page: newPageNo, pageSize });
  };

  const getPagination = (totalPages, currentPage) => {
    if (totalPages <= 1) {
      return [1];
    }

    let delta = 2;
    let range = [];
    let rangeWithDots = [];
    let l;

    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i >= 2 && i < totalPages) {
        range.push(i);
      }
    }
    range.push(totalPages);

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots.filter(
      (item, index) => rangeWithDots.indexOf(item) === index
    );
  };

  const paginationItems = data
    ? getPagination(data.totalPages, data.number)
    : [];

  const handleSelectChange = (event) => {
    const selectedtype = event.target.value;
    setSelectedOption(event.target.value);
    setPageNo(1);
    setType(selectedtype);
    setSearchParams({ type: selectedtype, pageNo: 1, pageSize });
    // dispatch(getHomeReview(selectedtype, pageNo, pageSize));
  };

  const getFirstSentence = (description) => {
    const firstPeriodIndex = description.indexOf(".");
    if (firstPeriodIndex !== -1) {
      return description.substring(0, firstPeriodIndex + 1);
    }
    return description;
  };
  //   console.log(data);

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col lg={8}>
                <div className="director-header-container-cinemaCorner">
                  <Row>
                    <Col md="12" className="d-flex align-items-center">
                      <div className="title-icon-cinemaCorner"></div>
                      <h2 className="title-cinemaCorner">Movie Commentary</h2>
                    </Col>
                    <Col md="4" className="d-flex" style={{ paddingTop: 20 }}>
                      <Input
                        type="select"
                        className="custom-select-cinemaCorner mx-2"
                        value={selectedOption}
                        onChange={handleSelectChange}
                      >
                        <option value="">Type</option>
                        {selectOptions
                          ? selectOptions.map((item, index) => (
                              <option key={index} value={item.value}>
                                {item.label}
                              </option>
                            ))
                          : null}
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
                        <option>Đang Chiếu/Sắp Chiếu</option>
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
                        <option>Mới Nhất</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </Input>
                    </Col>
                  </Row>
                  <div className="bottom-border"></div>
                </div>
                {data && data.content
                  ? data.content.map((item, index) => (
                      <Link
                        key={index}
                        to={`/movie-commentary/${item.slug}/details`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Col key={index} className="mb-4 mt-4">
                          <Card className="h-100">
                            <Row className="g-0">
                              <Col
                                md={4}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                <img
                                  style={{
                                    height: "250px",
                                    width: "250px",
                                    objectFit: "cover",
                                  }}
                                  className="rounded w-100 h-auto"
                                  src={item.thumbnail}
                                  alt={item.name}
                                />
                              </Col>
                              <Col md={8}>
                                <CardHeader>
                                  <h1 className="title-cinemaCorner-name mb-0">
                                    {item.name}
                                  </h1>
                                  <span className="badge bg-primary-subtle text-primary">
                                    View: {item.views}
                                  </span>
                                </CardHeader>
                                <CardBody>
                                  <p
                                    className="card-text mb-2 text-muted"
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "12px",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: getFirstSentence(
                                        item.description
                                      ),
                                    }}
                                  ></p>
                                </CardBody>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Link>
                    ))
                  : null}
                {data && data.content && data.content.length > 0 ? (
                  <div className="col-sm-auto mb-3 mt-1">
                    <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                      <li
                        className={
                          data.number === 0 ? "page-item disabled" : "page-item"
                        }
                      >
                        <Link
                          to="#"
                          className="page-link"
                          onClick={() => handlePagination(data.number - 1)}
                        >
                          Previous
                        </Link>
                      </li>
                      {paginationItems.map((item, index) => (
                        <li
                          key={index}
                          className={
                            item === "..." ? "page-item disabled" : "page-item"
                          }
                        >
                          <Link
                            to="#"
                            className={
                              data.number === item - 1
                                ? "page-link active"
                                : "page-link"
                            }
                            onClick={() =>
                              item !== "..." && handlePagination(item - 1)
                            }
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                      <li
                        className={
                          data.number === data.totalPages - 1
                            ? "page-item disabled"
                            : "page-item"
                        }
                      >
                        <Link
                          to="#"
                          className="page-link"
                          onClick={() => handlePagination(data.number + 1)}
                        >
                          Next
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </Col>

              {/* Bên Phải */}
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
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default MovieCommentary;

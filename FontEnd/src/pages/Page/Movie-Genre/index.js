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
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import { Image } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { getHomeBlog } from "../../../slices/home/BlogAndReviewHome/thunk";
import { getHomeMovieGenre } from "../../../slices/home/Movie-GenreHome/thunk";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";
import RightColumn from "../CinemaCorner/RightColumn";

const index = () => {
  document.title = "Movie Genre";
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  //   const [selectedOption, setSelectedOption] = useState("");

  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 10
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [country, setcountry] = useState(searchParams.get("country") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [years, setYears] = useState(searchParams.get("years") || "");

  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const MovieGenreState = (state) => state;
  const MovieGenreStateData = createSelector(MovieGenreState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    MovieIntroduce: state.HomeMovie.MovieIntroduce,
    data: state.HomeMovieGenre.data,
    selectOptionGenre: state.HomeMovieGenre.selectOptionGenre,
    selectOptionCountry: state.HomeMovieGenre.selectOptionCountry,
    selectOptionStatus: state.HomeMovieGenre.selectOptionStatus,
    selectOptionYear: state.HomeMovieGenre.selectOptionYear,
  }));

  const {
    error,
    messageError,
    data,
    MovieIntroduce,
    selectOptionGenre,
    selectOptionCountry,
    selectOptionStatus,
    selectOptionYear,
  } = useSelector(MovieGenreStateData);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let params = {};

    if (category && category !== null && category !== undefined) {
      params.category = category;
    }

    if (country && country !== null && country !== undefined) {
      params.country = country;
    }
    if (status && status !== null && status !== undefined) {
      params.status = status;
    }
    if (years && years !== null && years !== undefined) {
      params.years = years;
    }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(
      getHomeMovieGenre(
        category ? category : null,
        country ? country : null,
        status ? status : null,
        years ? years : null,
        pageNo,
        pageSize
      )
    );
  }, [dispatch, pageNo, pageSize, category, status, country, years]);

  const handlePagination = (page) => {
    const newPageNo = page + 1;
    setPageNo(newPageNo);
    setSearchParams({ page: newPageNo, pageSize });
    dispatch(getHomeMovieGenre(pageNo, pageSize));
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
    setCategory(event.target.value);
    setPageNo(1);
    setSearchParams({
      category: event.target.value,
      country,
      status,
      years,
      pageNo: 1,
      pageSize,
    });
  };

  const handleSelectChangeCountry = (event) => {
    setcountry(event.target.value);
    setPageNo(1);
    setSearchParams({
      category,
      country: event.target.value,
      status,
      years,

      pageNo: 1,
      pageSize,
    });
  };
  const handleSelectChangeStatus = (event) => {
    setStatus(event.target.value);
    setPageNo(1);
    setSearchParams({
      category,
      country,
      status: event.target.value,
      years,
      pageNo: 1,
      pageSize,
    });
  };
  const handleSelectChangeYears = (event) => {
    setYears(event.target.value);
    setPageNo(1);
    setSearchParams({
      category,
      country,
      status,
      years: event.target.value,
      pageNo: 1,
      pageSize,
    });
  };

  const getFirstSentence = (description) => {
    const firstPeriodIndex = description?.indexOf(".");
    if (firstPeriodIndex !== -1) {
      return description?.substring(0, firstPeriodIndex + 1);
    }
    return description;
  };

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <Container fluid>
          <Row>
            <Col lg={8} className="shadow-lg p-3 bg-white rounded">
              <div className="director-header-container-cinemaCorner">
                <Row>
                  <Col md="12" className="d-flex align-items-center">
                    <div className="title-icon-cinemaCorner"></div>
                    <h2 className="title-cinemaCorner">Movie Genre</h2>
                  </Col>
                  <Col md="10" className="d-flex" style={{ paddingTop: 15 }}>
                    <Input
                      type="select"
                      className="custom-select-cinemaCorner mx-2"
                      value={category}
                      onChange={handleSelectChange}
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                        width: "150px",
                      }}
                    >
                      <option value="">All Genren</option>
                      {selectOptionGenre.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Input>
                    <Input
                      type="select"
                      className="custom-select-cinemaCorner mx-2"
                      value={country}
                      onChange={handleSelectChangeCountry}
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                        width: "150px",
                      }}
                    >
                      <option value="">Country</option>
                      {/* selectOptionCountry */}
                      {selectOptionCountry.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Input>
                    <Input
                      type="select"
                      className="custom-select-cinemaCorner mx-2"
                      onChange={handleSelectChangeStatus}
                      value={status}
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                        width: "150px",
                      }}
                    >
                      <option value="">Status</option>
                      {selectOptionStatus.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Input>
                    <Input
                      type="select"
                      className="custom-select-cinemaCorner mx-2"
                      onChange={handleSelectChangeYears}
                      value={years}
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                        width: "150px",
                      }}
                    >
                      <option value="">years</option>
                      {selectOptionYear.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
                <div className="bottom-border"></div>
              </div>
              {data && data.content
                ? data.content.map((item, index) => (
                    <Link
                      key={index}
                      to={`/movie/${item.slug}/details`}
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
                                src={item.imagePortrait}
                                alt={item.name}
                              />
                            </Col>
                            <Col md={8}>
                              <CardHeader>
                                <h1 className="title-cinemaCorner-name mb-0">
                                  {item.name}
                                </h1>
                              </CardHeader>
                              <CardBody>
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
              <MovieIsShowing MovieIntroduce={MovieIntroduce} />
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default index;

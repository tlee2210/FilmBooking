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

// Import Images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const BlogDetails = (props) => {
  const dispatch = useDispatch();

  const slug = props.router.params.slug;

  useEffect(() => {
    dispatch(getBlogDetails(slug, props.router.navigate));
  }, [dispatch, slug]);

  const BlogState = (state) => state;
  const BlogStateData = createSelector(BlogState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    item: state.BlogOrReview.item,
  }));

  const { error, messageError, item } = useSelector(BlogStateData);

  const movies = [
    {
      url: "/#",
      alt: "preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa",
      imageUrl:
        "https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg",
      title:
        "[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa",
    },
    {
      url: "/#",
      alt: "preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa",
      imageUrl:
        "https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg",
      title:
        "[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa",
    },
    {
      url: "/#",
      alt: "preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa",
      imageUrl:
        "https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg",
      title:
        "[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa",
    },
    {
      url: "/binh-luan-phim/phim1/",
      alt: "preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa",
      imageUrl:
        "https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg",
      title:
        "[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa",
    },
  ];

  document.title = item.name || "blog";

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <Container fluid>
          <Row>
            <Col lg={8}>
              <Row>
                <Col md={12}>
                  <p style={{ fontSize: 26, fontWeight: "bold" }}>
                    {item.name}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={12} id="renderHtml">
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
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
                      Bình Luận Phim Khác
                    </div>
                  </div>
                  <div className="d-flex gap-3 pb-5">
                    {movies.map((movie, index) => (
                      <div
                        key={index}
                        className="inline-block"
                        style={{ width: "193px" }}
                      >
                        <a href={movie.url}>
                          <img
                            alt={movie.alt}
                            loading="lazy"
                            width="193"
                            height="128"
                            decoding="async"
                            src={movie.imageUrl}
                            style={{ color: "transparent" }}
                          />
                        </a>
                        <div className="text-base mt-3">
                          <a href={movie.url}>{movie.title}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>

            {/* Bên Phải */}
            <Col lg={4}>
              <RightColumn />
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
      </Container>
    </React.Fragment>
  );
};

export default withRouter(BlogDetails);

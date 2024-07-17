import React, { useEffect } from "react";
import "./css/Event.css";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

import { Col, Container, Row } from "reactstrap";
import RightColumn from "../CinemaCorner/RightColumn";
import "../CinemaCorner/css/CinemaCorner.css";
import withRouter from "../../../Components/Common/withRouter";
import { getHomePromotionDetails } from "../../../slices/home/PromotionHome/thunk";
import { Link } from "react-router-dom";
import { getMovieActiveLimitIntroduce } from "../../../slices/home/MovieHome/thunk";
import MovieIsShowing from "../BuyTicket/MovieIsShowing";

const PromotionDetails = (props) => {
  const dispatch = useDispatch();

  const slug = props.router.params.slug;
  //   console.log(slug);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    dispatch(getHomePromotionDetails(slug, props.router.navigate));
  }, [dispatch, slug]);

  // getMovieActiveLimitIntroduce
  useEffect(() => {
    dispatch(getMovieActiveLimitIntroduce());
  }, [dispatch]);

  const PromotionDetailsState = (state) => state;
  const PromotionDetailsStateData = createSelector(
    PromotionDetailsState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
      item: state.HomePromotion.item,
      related: state.HomePromotion.related,
      MovieIntroduce: state.HomeMovie.MovieIntroduce,
    })
  );

  const { error, messageError, item, related, MovieIntroduce } = useSelector(
    PromotionDetailsStateData
  );

  const relatedNews = [
    {
      id: 1,
      title: "Khởi Động “Giải Đua Mùa Hè” GalaXummer 2024",
      image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg",
    },
    {
      id: 2,
      title: "Cine Với Cạ Cứng - Tụ Tập Vui “Cóa Chời”",
      image: "https://cdn.galaxycine.vn/media/2024/5/24/500_1716521540457.jpg",
    },
    {
      id: 3,
      title: "Xem Phim Hay - Ngất Ngây Cùng Bánh Phồng Đề Rec Rec",
      image: "https://cdn.galaxycine.vn/media/2024/4/2/500_1712051408911.jpg",
    },
    {
      id: 4,
      title: "Happy Day - Vé Chỉ Từ 50K",
      image: "https://cdn.galaxycine.vn/media/2024/4/16/500_1713257519345.jpg",
    },
  ];
  document.title = item?.name || "Promotion";

  return (
    <Container style={{ paddingTop: 100, paddingBottom: 50 }}>
      <Row>
        <Col lg={8}>
          <div className="container-eventDetails">
            <h1 className="title-eventDetails mb-5">{item?.name}</h1>
            {/* <div className="social-eventDetails">
              <button className="button-eventDetails">Thích</button>
              <button className="button-eventDetails">Chia sẻ</button>
            </div> */}
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
          </div>
          <div className="related-news-eventDetails">
            <Col
              md={3}
              className="d-flex align-items-center"
              style={{ width: 250 }}
            >
              <div className="title-icon-cinemaCorner"></div>
              <h2 className="title-cinemaCorner">RELATED NEWS</h2>
            </Col>
            <Row style={{ paddingTop: 10 }}>
              {related?.map((news, index) => (
                <Col
                  key={index}
                  md={3}
                  className="related-news-item-eventDetails gx-2 gy-2"
                >
                  <Link to={`/promotion/${news.slug}/details`}>
                    <img
                      src={news.imagePortrait}
                      alt={news.name}
                      className="related-news-image-eventDetails"
                    />
                    <p className="related-news-title-eventDetails">
                      {news.name}
                    </p>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col lg={4}>
          <RightColumn />
          <MovieIsShowing MovieIntroduce={MovieIntroduce} />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(PromotionDetails);

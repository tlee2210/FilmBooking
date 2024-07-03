import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './css/Event.css';
import RightColumn from '../CinemaCorner/RightColumn';
import MovieIsShowing from '../BuyTicket/MovieIsShowing';

const movies = [
    {
        id: 1,
        title: "1. Tarot – Kinh dị – 03.05.2024",
        description: "Xuyên suốt 7 thập kỷ tồn tại, sức hấp dẫn của Tarot là điều không thể chối cãi. Bộ môn bói bài mang đến cảm giác bí ẩn, đánh thức trí tò mò của người tham gia và thỏa mãn họ bằng những lời tiên tri về tương lai. Thế nhưng, trải nghiệm tâm linh này lại trở nên đen tối hơn bao giờ hết dưới lăng kính của Spenser Cohen cùng Anna Halberg. Qua bàn tay của bộ đôi đạo diễn, bộ bài trở thành công cụ định đoạt số phận của những nạn nhân xấu số.",
        image: "https://www.galaxycine.vn/media/2024/5/3/tarot-338_1714723581315.jpg"
    },
    {
        id: 2,
        title: "2. Movie Title – Genre – Release Date",
        description: "Movie description goes here. This should include some interesting details about the movie, its plot, and why it's worth watching.",
        image: "https://www.galaxycine.vn/media/2024/5/3/apes-338_1714723603414.jpg"
    },
    {
        id: 3,
        title: "3. Movie Title – Genre – Release Date",
        description: "Movie description goes here. This should include some interesting details about the movie, its plot, and why it's worth watching.",
        image: "https://www.galaxycine.vn/media/2024/5/3/if-338_1714723618044.jpg"
    },
    {
        id: 4,
        title: "4. Movie Title – Genre – Release Date",
        description: "Movie description goes here. This should include some interesting details about the movie, its plot, and why it's worth watching.",
        image: "https://www.galaxycine.vn/media/2024/5/3/doraemon-338_1714723634907.jpg"
    },
    {
        id: 5,
        title: "5. Movie Title – Genre – Release Date",
        description: "Movie description goes here. This should include some interesting details about the movie, its plot, and why it's worth watching.",
        image: "https://www.galaxycine.vn/media/2024/5/3/furiosa338_1714723655148.jpg"
    }
];

const relatedNews = [
    {
        id: 1,
        title: "[Review] A Quiet Place Day One: Ngày New York Thành Vùng Đất Chết",
        image: "https://cdn.galaxycine.vn/media/2024/6/30/a-quiet-place-day-one-ngay-new-york-thanh-vung-dat-chet-2_1719726875743.jpg"
    },
    {
        id: 2,
        title: "Phim Hay Tháng 7: Siêu Anh Hùng Trỗi Dậy",
        image: "https://cdn.galaxycine.vn/media/2024/6/24/despicable-me-4-chung-ta-biet-duoc-bao-nhieu-ve-minions-3_1719218662477.jpg"
    },
    {
        id: 3,
        title: "Despicable Me 4: Chúng Ta Biết Được Bao Nhiêu Về Minions?",
        image: "https://cdn.galaxycine.vn/media/2024/6/19/750_1718788973451.jpg"
    },
    {
        id: 4,
        title: "[Review] Cửu Long Thành Trại Vây Thành: Hồi Sinh Thời Huy Hoàng Của Điện Ảnh Hong Kong",
        image: "https://cdn.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg"
    }
];

const MovieDetailPage = () => {
    return (
        <Container style={{ paddingTop: 100, paddingBottom: 50 }}>
            <Row>
                <Col lg={8}>
                    <h1 className="title-page-eventPhimHayThang">Phim Hay Tháng 05.2024: Tháng Của Người Hùng</h1>
                    <div className="social-section-eventPhimHayThang">
                        <button className="button-like-eventPhimHayThang">Thích</button>
                        <button className="button-share-eventPhimHayThang">Chia sẻ</button>
                        <span className="views-count-eventPhimHayThang">547</span>
                    </div>
                    <p className="description-eventPhimHayThang">
                        Mùa hè năm nay mọi người đều được tận hưởng 5 ngày nghỉ ngơi, ngoài những kế hoạch du lịch hay tụ tập, các Stars vẫn còn rạp chiếu phim là lựa chọn hoàn hảo cho những ngày dài rảnh rỗi. Các phim mà Galaxy Cinema mang tới trong tháng 5 này cũng rất đa dạng từ kinh dị đến hành động, hoạt hình và hài hước... đều có đủ để phục hồi sự mệt mỏi của mọi người, mọi lứa tuổi khán giả.
                    </p>
                    <p className="description-eventPhimHayThang">
                        Cùng tham khảo nha!
                    </p>
                    <div className="video-container-eventPhimHayThang">
                        <iframe
                            width="100%"
                            height="400"
                            src="https://www.youtube.com/embed/ISjw6Whrq8w" title="Phim Hay Tháng 05.2024: Tháng Của Người Hùng"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <Row>
                        {movies.map(movie => (
                            <Col lg={12} key={movie.id} className="movie-section-eventPhimHayThang">
                                <h2 className="movie-title-eventPhimHayThang">{movie.title}</h2>
                                <p className="movie-description-eventPhimHayThang">{movie.description}</p>
                                <div className="movie-image-container-eventPhimHayThang">
                                    <img src={movie.image} alt={movie.title} className="movie-image-eventPhimHayThang" />
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div className="related-news-eventPhimHayThang">
                        <Col md="3" className="d-flex align-items-center" style={{ width: 250 }}>
                            <div className="title-icon-cinemaCorner"></div>
                            <h2 className="title-cinemaCorner">TIN LIÊN QUAN</h2>
                        </Col>
                        <Row style={{ paddingTop: 10 }}>
                            {relatedNews.map((news) => (
                                <Col md={3} key={news.id} className="related-news-item-eventPhimHayThang gx-2 gy-2 cursor-pointer">
                                    <img src={news.image} className="related-news-image-eventPhimHayThang " />
                                    <p className="related-news-title-eventPhimHayThang">{news.title}</p>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                <Col lg={4}>
                    <RightColumn />
                    <MovieIsShowing />
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetailPage;

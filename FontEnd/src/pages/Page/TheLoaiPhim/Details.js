import React from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../../../Components/Common/withRouter";
import './css/TheLoaiPhim.css';

const MovieDetail = () => {
    const movieDetails = {
        title: "Avengers: Hồi Kết",
        duration: "182 Phút",
        releaseDate: "18/04/2019",
        rating: "9.0",
        votes: "3391 votes",
        director: "Anthony Russo, Joe Russo",
        country: "Mỹ",
        genre: "Hành Động, Phiêu Lưu, Giả Tưởng",
        cast: [
            { name: "Robert Downey Jr.", image: "https://via.placeholder.com/100x100.png?text=Robert+Downey+Jr" },
            { name: "Chris Hemsworth", image: "https://via.placeholder.com/100x100.png?text=Chris+Hemsworth" },
            { name: "Chris Evans", image: "https://via.placeholder.com/100x100.png?text=Chris+Evans" },
            { name: "Scarlett Johansson", image: "https://via.placeholder.com/100x100.png?text=Scarlett+Johansson" },
            { name: "Mark Ruffalo", image: "https://via.placeholder.com/100x100.png?text=Mark+Ruffalo" },
            { name: "Jeremy Renner", image: "https://via.placeholder.com/100x100.png?text=Jeremy+Renner" },
            { name: "Paul Rudd", image: "https://via.placeholder.com/100x100.png?text=Paul+Rudd" }
        ],
        description: "Cú búng tay của Thanos đã khiến toàn bộ ...",
        trivia: "Có lẽ vào năm 2008, khi đặt viên gạch đầu tiên...",
        comments: "Hơn 3 tiếng đồng hồ của Avengers: Endgame chúng ta có gì?...",
        relatedArticles: [
            { title: "[Review] A Quiet Place Day One...", image: "https://via.placeholder.com/150x150.png?text=A+Quiet+Place+Day+One", link: "#" },
            { title: "Phim Hay Tháng 7: Siêu Anh Hùng Trỗi Dậy", image: "https://via.placeholder.com/150x150.png?text=Phim+Hay+Tháng+7", link: "#" },
            { title: "Despicable Me 4: Chúng Ta Biết Được Bao Nhiêu Về Minions?", image: "https://via.placeholder.com/150x150.png?text=Despicable+Me+4", link: "#" },
            { title: "[Review] Cửu Long Thành Trại Vây Thành...", image: "https://via.placeholder.com/150x150.png?text=Cửu+Long+Thành+Trại+Vây+Thành", link: "#" },
        ]
    };

    return (
        <Container className="movie-detail-container-theloaiphimDetails" style={{ paddingTop: 100 }}>
            <div className="page-content-theloaiphimDetails">
                <Container fluid>
                    <Row>
                        <Col lg={8}>
                            <Card>
                                <CardBody>
                                    <div className="movie-header-theloaiphimDetails">
                                        <Row>
                                            <Col md="3">
                                                <img src="https://via.placeholder.com/150x200.png?text=Movie+Poster" alt="Avengers: Hồi Kết" className="movie-poster-theloaiphimDetails" />
                                            </Col>
                                            <Col md="9" style={{paddingLeft:20}}>
                                                <h1 className="movie-title-theloaiphimDetails">
                                                    {movieDetails.title} <span className="movie-rating-badge-theloaiphimDetails">T13</span>
                                                </h1>
                                                <div className="movie-meta-theloaiphimDetails">
                                                    <span className="movie-duration-theloaiphimDetails"><i className="fa fa-clock-o"></i> {movieDetails.duration}</span>
                                                    <span className="movie-releaseDate-theloaiphimDetails"><i className="fa fa-calendar"></i> {movieDetails.releaseDate}</span>
                                                    <span className="movie-views-theloaiphimDetails"><i className="fa fa-eye"></i> 2601990</span>
                                                    <span className="movie-rating-theloaiphimDetails"><i className="fa fa-star"></i> {movieDetails.rating} <span className="movie-votes-theloaiphimDetails">({movieDetails.votes})</span></span>
                                                </div>
                                                <div className="movie-info-theloaiphimDetails">
                                                    <p><strong>Diễn viên: </strong>{movieDetails.cast.map(actor => actor.name).join(', ')}</p>
                                                    <p><strong>Nhà sản xuất: </strong>Walt Disney Studios Motion Pictures</p>
                                                    <p><strong>Thể loại: </strong>{movieDetails.genre}</p>
                                                    <p><strong>Đạo diễn: </strong>{movieDetails.director}</p>
                                                    <p><strong>Quốc gia: </strong>{movieDetails.country}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="movie-description-theloaiphimDetails">
                                        <h2 className="section-title-theloaiphimDetails">NỘI DUNG PHIM</h2>
                                        <p>{movieDetails.description}</p>
                                    </div>
                                    <div className="movie-cast-theloaiphimDetails">
                                        <h2 className="section-title-theloaiphimDetails">DIỄN VIÊN</h2>
                                        <Row>
                                            {movieDetails.cast.map((actor, index) => (
                                                <Col key={index} md={6}>
                                                    <div className="actor-item-theloaiphimDetails">
                                                        <img src={actor.image} alt={actor.name} className="actor-image-theloaiphimDetails" />
                                                        <p className="actor-name-theloaiphimDetails">{actor.name}</p>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                    <div className="movie-trivia-theloaiphimDetails">
                                        <h2 className="section-title-theloaiphimDetails">TÌNH TIẾT BÊN LỀ</h2>
                                        <p>{movieDetails.trivia}</p>
                                        <Link to="#" className="see-more-link-theloaiphimDetails">Xem Thêm</Link>
                                    </div>
                                    <div className="movie-comments-theloaiphimDetails">
                                        <h2 className="section-title-theloaiphimDetails">BÌNH LUẬN PHIM</h2>
                                        <p>{movieDetails.comments}</p>
                                        <Link to="#" className="see-more-link-theloaiphimDetails">Xem Thêm</Link>
                                    </div>
                                    <div className="related-articles-theloaiphimDetails">
                                        <h2 className="section-title-theloaiphimDetails">BÀI VIẾT LIÊN QUAN</h2>
                                        <Row>
                                            {movieDetails.relatedArticles.map((article, index) => (
                                                <Col key={index} md={3}>
                                                    <Link to={article.link} className="related-article-link-theloaiphimDetails">
                                                        <img src={article.image} alt={article.title} className="related-article-image-theloaiphimDetails" />
                                                        <p className="related-article-title-theloaiphimDetails">{article.title}</p>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            {/* Placeholder for RightColumn and MovieIsShowing components */}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    );
};

export default withRouter(MovieDetail);

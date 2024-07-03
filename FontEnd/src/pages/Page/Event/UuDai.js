import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Image } from "antd";
import withRouter from "../../../Components/Common/withRouter";
import RightColumn from "../CinemaCorner/RightColumn";
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import "../CinemaCorner/css/CinemaCorner.css";
import "./css/Event.css";
import { Link } from "react-router-dom";

const UuDai = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const movies = [
        { id: 1, title: "Khởi Động “Giải Đua Mùa Hè” GalaXummer 2024", image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg" },
        { id: 2, title: "Movie 2", image: "https://cdn.galaxycine.vn/media/2024/5/24/500_1716521540457.jpg" },
        { id: 3, title: "Movie 3", image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg" },
        { id: 4, title: "Movie 4", image: "https://cdn.galaxycine.vn/media/2024/5/24/500_1716521540457.jpg" },
        { id: 5, title: "Movie 5", image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg" },
        { id: 6, title: "Movie 6", image: "https://cdn.galaxycine.vn/media/2024/5/24/500_1716521540457.jpg" },
        { id: 7, title: "Movie 7", image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg" },
        { id: 8, title: "Movie 8", image: "https://cdn.galaxycine.vn/media/2024/5/24/500_1716521540457.jpg  " },
        { id: 9, title: "Movie 9", image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg" },
    ];

    document.title = "Actor";

    return (
        <React.Fragment>
            <Container style={{ paddingTop: 100,paddingBottom:50 }}>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            <Col lg={8}>
                                <div className="director-header-container-cinemaCorner">
                                    <Row className="align-items-center">
                                        <Col md="3" className="d-flex align-items-center">
                                            <div className="title-icon-cinemaCorner"></div>
                                            <h2 className="title-cinemaCorner">Ưu Đãi</h2>
                                        </Col>
                                    </Row>
                                    <div className="bottom-border"></div>
                                </div>

                                <Row>
                                    {movies.map((movie, index) => (
                                        <Col md="4" key={movie.id} className="movie-col gx-3 gy-3 cursor-pointer">
                                            <Link to={'/uu-dai/details'}>
                                                <div
                                                    className="movie-card"
                                                    onMouseEnter={() => setHoveredIndex(index)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                >
                                                    <Image src={movie.image} alt={movie.title} className="movie-image" />
                                                    {hoveredIndex === index && (
                                                        <div className="movie-title-overlay">
                                                            <h3 className="title-h3">{movie.title}</h3>
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                            <Col lg={4}>
                                <RightColumn />
                                {/* <MovieIsShowing MovieIntroduce={{ content: movies }} /> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default withRouter(UuDai);

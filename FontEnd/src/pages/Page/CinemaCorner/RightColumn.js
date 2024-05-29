
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./css/CinemaCorner.css"


const DirectorInfor = () => {

    const [selectedMulti, setSelectedMulti] = useState(null);

    const handleMulti = (selectedMulti) => {
        setSelectedMulti(selectedMulti);
    };

    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedTheater, setSelectedTheater] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    };

    const handleTheaterChange = (event) => {
        setSelectedTheater(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    document.title = "Đạo Diễn";

    return (
        <React.Fragment>

            {/* Mua vé Nhanh */}
            <Card className="quick-ticket-card">
                <CardHeader className="quick-ticket-header">Mua Vé Nhanh</CardHeader>
                <CardBody>
                    <FormGroup>

                        <Input
                            type="select"
                            id="movieSelect"
                            value={selectedMovie}
                            onChange={handleMovieChange}
                        >
                            <option value="">Chọn phim</option>
                            <option value="movie1">Phim 1</option>
                            <option value="movie2">Phim 2</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>

                        <Input
                            type="select"
                            id="theaterSelect"
                            value={selectedTheater}
                            onChange={handleTheaterChange}
                            disabled={!selectedMovie}
                        >
                            <option value="">Chọn rạp</option>
                            <option value="theater1">Rạp 1</option>
                            <option value="theater2">Rạp 2</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>

                        <Input
                            type="select"
                            id="dateSelect"
                            value={selectedDate}
                            onChange={handleDateChange}
                            disabled={!selectedTheater}
                        >
                            <option value="">Chọn ngày</option>
                            <option value="date1">Ngày 1</option>
                            <option value="date2">Ngày 2</option>
                        </Input>
                    </FormGroup>
                </CardBody>
            </Card>

            {/* PHIM ĐANG CHIẾU */}
            <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                <div className="d-flex align-items-center pb-3">
                    <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>PHIM ĐANG CHIẾU</div>
                </div>
                <Link to="/ticket-booking/phim" style={{ textDecoration: "none", color: "inherit" }}>
                    <CardBody className="position-relative p-0 hover-container">
                        <img
                            style={{ height: "280px", width: "380px", objectFit: "inherit" }}
                            className="img-fluid hover-image"
                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                            alt="Movie"
                        />
                        <div className="ticket-overlay">
                            <img
                                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
                                alt="Ticket"
                                className="ticket-image"
                            />
                        </div>
                        <div style={{ paddingTop: 5 }}>
                            <span style={{ fontSize: 18, fontWeight: "bold" }}>Thor RagnaRock</span>
                        </div>
                    </CardBody>
                </Link>
            </Card>
            <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                <Link to="/ticket-booking/phim" style={{ textDecoration: "none", color: "inherit" }}>
                    <CardBody className="position-relative p-0 hover-container">
                        <img
                            style={{ height: "280px", width: "380px", objectFit: "inherit" }}
                            className="img-fluid hover-image"
                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                            alt="Movie"
                        />
                        <div className="ticket-overlay">
                            <img
                                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
                                alt="Ticket"
                                className="ticket-image"
                            />
                        </div>
                        <div style={{ paddingTop: 5 }}>
                            <span style={{ fontSize: 18, fontWeight: "bold" }}>Thor RagnaRock</span>
                        </div>
                    </CardBody>
                </Link>
            </Card>
            <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                <Link to="/ticket-booking/phim" style={{ textDecoration: "none", color: "inherit" }}>
                    <CardBody className="position-relative p-0 hover-container">
                        <img
                            style={{ height: "280px", width: "380px", objectFit: "inherit" }}
                            className="img-fluid hover-image"
                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                            alt="Movie"
                        />
                        <div className="ticket-overlay">
                            <img
                                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
                                alt="Ticket"
                                className="ticket-image"
                            />
                        </div>
                        <div style={{ paddingTop: 5 }}>
                            <span style={{ fontSize: 18, fontWeight: "bold" }}>Thor RagnaRock</span>
                        </div>
                    </CardBody>
                </Link>
            </Card>
        </React.Fragment>
    );
};

export default DirectorInfor;
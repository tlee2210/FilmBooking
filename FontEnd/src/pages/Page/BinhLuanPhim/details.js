
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, FormGroup, Button } from 'reactstrap';
import "../CinemaCorner/css/CinemaCorner.css";

import RightColumn from "../CinemaCorner/RightColumn";

// Import Images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const BinhLuanPhimDetails = () => {

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

    document.title = "Diễn Viên";


    return (
        <React.Fragment>
            <Container style={{ paddingTop: 100 }}>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col lg={8}>
                                <Row>
                                    <Col md={12}>
                                        <h2 className="mb-4">Furiosa Câu Chuyện Từ Max Điên: Bom Tấn Đỉnh Cao Từ Thương Hiệu Hơn 40 Năm</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <img
                                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                            alt="Movie Poster"
                                            className="img-fluid"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <p>
                                            [Nội dung review của bạn ở đây]
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className="mt-4">
                                            <strong>Thích 0</strong>
                                        </div>
                                        <div>
                                            <strong>Chia sẻ 16</strong>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>


                            {/* Bên Phải */}
                            <Col lg={4}>
                                <RightColumn />
                                <div className='button-dien-vien'>
                                    <Button color="secondary" outline className="waves-effect waves-light material-shadow-none" > Xem Thêm <i className="bx bx-right-arrow-alt"></i>  </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default BinhLuanPhimDetails;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, FormGroup, Button } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import "./css/CinemaCorner.css"
import Select from "react-select";

// Import Images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const Director = () => {

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
      <Container style={{ paddingTop: 100 }}>
        <div className="page-content">
          <Container fluid>

            <Row>
              <Col lg={8}>
                <div fluid className="director-header-container-cinemaCorner">
                  <Row className="align-items-center">
                    <Col md="3" className="d-flex align-items-center">
                      <div className="title-icon-cinemaCorner"></div>
                      <h2 className="title-cinemaCorner">ĐẠO DIỄN</h2>
                    </Col>
                    <Col md="9" className="d-flex justify-content-end">
                      <Input type="select" className="custom-select-cinemaCorner mx-2">
                        <option>Quốc Gia</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </Input>
                      <Input type="select" className="custom-select-cinemaCorner mx-2">
                        <option>Xem Nhiều Nhất</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </Input>
                    </Col>

                  </Row>
                  <div className="bottom-border"></div>
                </div>
                {['Thor RagnaRock 2', 'Thor Ragnarock', 'Thor Ragnarock 3', 'Thor Ragnarock 4'].map((title, index) => (
                  <Col key={index} className="mb-4 mt-4">
                    <Card className="h-100">
                      <Row className="g-0">
                        <Col md={4}>
                          <a href='/dao-dien/dao-dien-details'>
                            <img
                              style={{ height: "250px", width: "250px", objectFit: "cover" }}
                              className="rounded-start img-fluid"
                              src="https://cdn.galaxycine.vn/media/j/a/james-wan-premiere-death-sentence-01.jpg"
                              alt="Card"
                            />
                          </a>
                        </Col>
                        <Col md={8}>
                          <CardHeader>
                            <h1 className="title-cinemaCorner-name mb-0">{title}</h1>

                          </CardHeader>
                          <CardBody>
                            <p className="card-text mb-2">
                              For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                            </p>
                            <p className="card-text">
                              <small className="text-muted">Last updated 3 mins ago</small>
                            </p>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Col>


              {/* Bên Phải */}
              <Col lg={4}>
                <Card className="quick-ticket-card">
                  <CardHeader className="quick-ticket-header">Mua Vé Nhanh</CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label for="movieSelect">Chọn phim</Label>
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
                      <Label for="theaterSelect">Chọn rạp</Label>
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
                      <Label for="dateSelect">Chọn ngày</Label>
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

                 {/* PHIM ĐANG CHIÊU */}
                <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                <div className="d-flex align-items-center pb-3">
                    <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>PHIM ĐANG CHIẾU</div>
                  </div>
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
                      <a style={{ fontSize: 18, fontWeight: "bold" }} href='/#'>Thor RagnaRock</a>
                    </div>
                  </CardBody>
                </Card>
                <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                  <CardBody className="position-relative p-0 hover-container">
                    <img
                      style={{ height: "280px", width: "380px", objectFit: "inherit" }}
                      className="img-fluid hover-image"
                      src="https://m.media-amazon.com/images/M/MV5BMTcyNDAwNDc2OF5BMl5BanBnXkFtZTcwOTc4MjIwNQ@@._V1_.jpg"
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
                      <a style={{ fontSize: 18, fontWeight: "bold" }} href='/#'>Thor RagnaRock</a>
                    </div>
                  </CardBody>
                </Card>
                <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                  <CardBody className="position-relative p-0 hover-container">
                    <img
                      style={{ height: "280px", width: "380px", objectFit: "inherit" }}
                      className="img-fluid hover-image"
                      src="https://m.media-amazon.com/images/M/MV5BMTcyNDAwNDc2OF5BMl5BanBnXkFtZTcwOTc4MjIwNQ@@._V1_.jpg"
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
                      <a style={{ fontSize: 18, fontWeight: "bold" }} href='/#'>Thor RagnaRock</a>
                    </div>
                  </CardBody>
                </Card>
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

export default Director;
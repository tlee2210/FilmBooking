import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, ButtonGroup, Modal, Row, ModalBody, Button, TabContent, TabPane, Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/BuyTicket.css';
import '../CinemaCorner/css/CinemaCorner.css';
import classnames from "classnames";
import { StrippedRow } from '../../../Components/Common/BasicTablesCode';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/bundle";
import "swiper/css";

const TicketBooking = () => {

    // Animation Nav

    const [animationNavTab, setanimationNavTab] = useState("1");
    const animationNavToggle = (tab) => {
        if (animationNavTab !== tab) {
            setanimationNavTab(tab);
        }
    };

    const theaters = [
        { id: 1, name: "Galaxy Nguyễn Du", showtimes: ["09:00", "12:00", "15:00", "15:00"] },
        { id: 2, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 3, name: "Start", showtimes: ["11:00", "14:00", "17:00"] },
        { id: 4, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 5, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 6, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 7, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 8, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 9, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },
        { id: 10, name: "CGV", showtimes: ["10:00", "13:00", "16:00"] },

    ];

    // State lưu giữ thời gian được chọn
    const [selectedShowtime, setSelectedShowtime] = useState(null);

    // Hàm xử lý sự kiện khi chọn thời gian
    const handleShowtimeSelection = (showtime) => {
        setSelectedShowtime(showtime);
    };

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };



    return (
        <Container style={{ paddingTop: 80 }} fluid>
            {/* Banner */}
            <div className="banner-container">
                <div className="overlay-side overlay-left"></div>
                <div className="banner-wrapper-buy-ticket">
                    <div className="banner-overlay"></div>
                    <img
                        src="https://i.ytimg.com/vi_webp/49xWJJvpjzI/maxresdefault.webp"
                        alt="Movie Banner"
                        className="img-fluid banner-thumbnail w-[860]"
                        onClick={toggleModal}
                    />
                    <button className="play-button" onClick={toggleModal}>
                        ▶️
                    </button>
                    <Modal isOpen={modal} toggle={toggleModal} size="lg">
                        <ModalBody>
                            <div className="video-container-buy-ticket">
                                <iframe
                                    width="100%"
                                    height="400px"
                                    src="https://www.youtube.com/embed/49xWJJvpjzI"
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
                <div className="overlay-side overlay-right"></div>
            </div>

            <Container>
                {/* Content */}
                <Row className="mt-4">
                    <Row>
                        <Col lg={8}>
                            <Col className="mb-4 mt-4">
                                <Card className="h-100">
                                    <Row className="mt-4">
                                        <Col md={4} className="position-relative">
                                            <img
                                                style={{ height: "400px", width: "300px", objectFit: "cover", border: "3px white solid", marginTop: -120 }}
                                                className="rounded img-fluid position-absolute"
                                                src="https://i.ytimg.com/vi_webp/49xWJJvpjzI/maxresdefault.webp"
                                                alt="Movie Poster"
                                            />
                                        </Col>
                                        <Col md={8} className="offset-md-4">
                                            <Card className="h-100" style={{ paddingLeft: 20 }}>

                                                <h1 className="title-ticketFilm mb-1">Furiosa: Câu Chuyện Từ Max Điên</h1>
                                                <p className=" mb-2">
                                                    <span><i style={{ color: 'orange' }} className="ri-time-line"></i> 148 Phút</span>
                                                    <span style={{ paddingLeft: 20 }}><i style={{ color: 'orange' }} className="bx bx-calendar"></i> 22/05/2024</span>
                                                </p>
                                                <p className="card-text mb-2">
                                                    <span>
                                                        <i className='bx bxs-star' style={{ fontSize: 25, color: 'orange' }}></i>
                                                        <span style={{ fontSize: 19 }}>9.0</span>
                                                        <span className='text-muted' style={{ fontSize: 15 }}>(89 votes)</span>
                                                    </span>
                                                </p>
                                                <p className="card-text mb-2">
                                                    <span className='text-muted'>Quốc gia: Úc</span>
                                                </p>
                                                <p className="card-text mb-2">
                                                    <span className='text-muted' style={{ cursor: 'pointer' }}>Nhà sản xuất: Warner Bros</span>
                                                </p>
                                                <p className="card-text mb-2">
                                                    <span className='text-muted' style={{ marginRight: 20 }}>Thể loại:</span>
                                                    <span className="genre-container-ticketFilm">
                                                        <button className="custom-button-ticketFilm">Giả Tưởng</button>
                                                        <button className="custom-button-ticketFilm">Hành Động</button>
                                                        <button className="custom-button-ticketFilm">Phiêu Lưu</button>
                                                    </span>
                                                </p>
                                                <p className="card-text mb-2">
                                                    <span className='text-muted' style={{ marginRight: 10 }}>Đạo Diễn:</span>
                                                    <span className="genre-container-ticketFilm">

                                                        <button className="custom-button-ticketFilm">George Miler</button>

                                                    </span>
                                                </p>
                                                <p className="card-text mb-2">
                                                    <span className='text-muted' style={{ marginRight: 20 }}>Thể loại:</span>
                                                    <span className="genre-container-ticketFilm">
                                                        <button className="custom-button-ticketFilm">Twicht</button>
                                                        <button className="custom-button-ticketFilm">Chrishame Her</button>
                                                        <button className="custom-button-ticketFilm">David Beckham</button>
                                                    </span>
                                                </p>
                                            </Card>
                                        </Col>
                                    </Row>

                                    {/* Nội dung phim  */}
                                    <div className="mt-5 mb-3">
                                        <div className="d-flex align-items-center pb-3">
                                            <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "16px", fontWeight: "bold", paddingLeft: "0.5rem" }}>Nội Dung Phim</div>
                                        </div>
                                        <Row>
                                            <span style={{ fontSize: "14px", paddingBottom: "10px" }}>
                                                <span style={{ fontWeight: 'bold' }}>Furiosa: A Mad Max Saga</span> xảy ra trước những sự kiện của Mad Max: Fury Road, câu chuyện kể về thời trẻ của nữ chiến binh Furiosa khi cô bị tách ra khỏi nơi ẩn náu ở Green Place of Many Mothers và lần đầu tiên buộc phải đối mặt với sự điên rồ của thế giới bên ngoài. Nhưng cô ấy luôn nuôi trong mình một khát vọng “trở về đất mẹ” mãnh liệt.
                                                <br /><br /> Phần tiền truyện của Mad Max: Fury Road mở ra một thế giới gai góc và tràn đầy khốc liệt. Câu chuyện về nguồn gốc của nhân vật chính Furiosa khi còn ở vùng “Xanh”. Đóa hồng Anya Taylor-Joy hóa thân vào nữ chiến binh Furiosa thời trẻ, kết hợp cùng ‘thần Sấm’ Chris Hemsworth với tạo hình chất nhưng không kém phần điên dại. Được cầm trịch bởi đạo diễn đã tạo nên tên tuổi của các phần phim Mad Max George Miller, bộ phim chiếu rạp chắc hẳn sẽ là bom tấn mùa hè năm nay.
                                                <br /><br /> Phim mới <span style={{ fontWeight: 'bold' }}>Furiosa: A Mad Max Saga</span> có suất chiếu sớm tại rạp chiếu phim toàn quốc từ 22.05.2024 (không áp dụng movie voucher) và khởi chiếu vào 24.05.2024.
                                            </span>
                                        </Row>
                                    </div>



                                    {/* Lịch Chiếu */}
                                    <div className="">
                                        <div className="d-flex align-items-center pb-3">
                                            <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "16px", fontWeight: "bold", paddingLeft: "0.5rem" }}>Lịch Chiếu</div>
                                        </div>
                                        <Row>
                                            <Col>
                                                <Card>
                                                    <CardBody style={{ padding: 0 }}>
                                                        <Nav pills className="nav nav-pills animation-nav nav-justified gap-2 mb-3" style={{ width: "80%" }}>
                                                            <Row style={{ width: "100%" }}>
                                                                <Col md="8">
                                                                    <Swiper
                                                                        spaceBetween={10}
                                                                        slidesPerView={3.5}

                                                                    >
                                                                        <SwiperSlide>
                                                                            <NavLink
                                                                                style={{ cursor: "pointer", fontSize: "14px", padding: "5px", textAlign: "center" }}
                                                                                className={classnames("nav-link-lich-chieu-phim", { active: animationNavTab === "1" })}
                                                                                onClick={() => { animationNavToggle("1"); }}
                                                                            >
                                                                                Hôm Nay <br />
                                                                                Ngày 27/5
                                                                            </NavLink>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide>
                                                                            <NavLink
                                                                                style={{ cursor: "pointer", fontSize: "14px", padding: "5px", textAlign: "center" }}
                                                                                className={classnames("nav-link-lich-chieu-phim", { active: animationNavTab === "2" })}
                                                                                onClick={() => { animationNavToggle("2"); }}
                                                                            >
                                                                                Thứ 3 <br />
                                                                                Ngày 28/5
                                                                            </NavLink>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide>
                                                                            <NavLink
                                                                                style={{ cursor: "pointer", fontSize: "14px", padding: "5px", textAlign: "center" }}
                                                                                className={classnames("nav-link-lich-chieu-phim", { active: animationNavTab === "3" })}
                                                                                onClick={() => { animationNavToggle("3"); }}
                                                                            >
                                                                                Thứ 4 <br />
                                                                                Ngày 29/5
                                                                            </NavLink>
                                                                        </SwiperSlide>
                                                                        <SwiperSlide>
                                                                            <NavLink
                                                                                style={{ cursor: "pointer", fontSize: "14px", padding: "5px", textAlign: "center" }}
                                                                                className={classnames("nav-link-lich-chieu-phim", { active: animationNavTab === "4" })}
                                                                                onClick={() => { animationNavToggle("4"); }}
                                                                            >
                                                                                Thứ 5 <br />
                                                                                Ngày 30/5
                                                                            </NavLink>
                                                                        </SwiperSlide>
                                                                    </Swiper>
                                                                </Col>
                                                                <Col md="4" className="d-flex align-items-center" style={{ paddingLeft: 80 }}>
                                                                    <Input type="select" className="custom-select-cinemaCorner mx-2" style={{ cursor: "pointer", fontSize: "12px", width: "auto" }}>
                                                                        <option>Toàn Quốc</option>
                                                                        <option>Option 1</option>
                                                                        <option>Option 2</option>
                                                                    </Input>
                                                                    <Input type="select" className="custom-select-cinemaCorner mx-2" style={{ cursor: "pointer", fontSize: "12px", width: "auto" }}>
                                                                        <option>Tất Cả Rạp</option>
                                                                        <option>Option 1</option>
                                                                        <option>Option 2</option>
                                                                    </Input>
                                                                </Col>
                                                            </Row>
                                                        </Nav>
                                                        <div style={{ borderBottom: '4px solid #dee2e6' }}>
                                                        </div>
                                                        <TabContent activeTab={animationNavTab} className="text-muted ">

                                                            {/* Tab ID 1 */}
                                                            <TabPane tabId="1" id="animation-home">
                                                                <Row>
                                                                    <Col>
                                                                        <Card>
                                                                            <CardBody style={{ padding: 0 }}>
                                                                                <div className="live-preview">
                                                                                    <div className="table-responsive">
                                                                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                                                                            <tbody>
                                                                                                {theaters.map(theater => (
                                                                                                    <tr key={theater.id} style={{ height: 120 }} className='fw-bolder'>
                                                                                                        <td style={{ fontSize: 17 }}>{theater.name}</td>
                                                                                                        <td>
                                                                                                            <div style={{ display: "flex", gap: "20px", cursor: "pointer", fontSize: "12px", width: "auto" }}>
                                                                                                                {theater.showtimes.map(showtime => (
                                                                                                                    <Button
                                                                                                                        style={{ width: 110, backgroundColor: "white", color: "black", border: "1px solid rgb(189, 192, 194)" }}
                                                                                                                        key={showtime}
                                                                                                                        color="primary"
                                                                                                                        onMouseEnter={(e) => { e.target.style.backgroundColor = "#c0c1df"; }}
                                                                                                                        onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
                                                                                                                        onClick={() => setSelectedShowtime(showtime)}
                                                                                                                    >
                                                                                                                        {showtime}
                                                                                                                    </Button>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-none code-view">
                                                                                    <pre className="language-markup" style={{ "height": "275px" }}>
                                                                                        <code>
                                                                                            <StrippedRow />
                                                                                        </code>
                                                                                    </pre>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </TabPane>


                                                            {/* Tab ID 2 */}
                                                            <TabPane tabId="2" id="animation-profile">
                                                                <Row>
                                                                    <Col>
                                                                        <Card>
                                                                            <CardBody style={{ padding: 0 }}>
                                                                                <div className="live-preview">
                                                                                    <div className="table-responsive">
                                                                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                                                                            <tbody>
                                                                                                {theaters.map(theater => (
                                                                                                    <tr key={theater.id} style={{ height: 120 }} className='fw-bolder'>
                                                                                                        <td style={{ fontSize: 17 }}>{theater.name}</td>
                                                                                                        <td>
                                                                                                            <div style={{ display: "flex", gap: "20px", cursor: "pointer", fontSize: "12px", width: "auto" }}>
                                                                                                                {theater.showtimes.map(showtime => (
                                                                                                                    <Button
                                                                                                                        style={{ width: 110, backgroundColor: "white", color: "black", border: "1px solid rgb(189, 192, 194)" }}
                                                                                                                        key={showtime}
                                                                                                                        color="primary"
                                                                                                                        onMouseEnter={(e) => { e.target.style.backgroundColor = "#c0c1df"; }}
                                                                                                                        onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
                                                                                                                        onClick={() => setSelectedShowtime(showtime)}
                                                                                                                    >
                                                                                                                        {showtime}
                                                                                                                    </Button>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-none code-view">
                                                                                    <pre className="language-markup" style={{ "height": "275px" }}>
                                                                                        <code>
                                                                                            <StrippedRow />
                                                                                        </code>
                                                                                    </pre>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </TabPane>

                                                            <TabPane tabId="3" id="animation-messages" >
                                                                <Row>
                                                                    <Col>
                                                                        <Card>
                                                                            <CardBody style={{ padding: 0 }}>
                                                                                <div className="live-preview">
                                                                                    <div className="table-responsive">
                                                                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                                                                            <tbody>
                                                                                                {theaters.map(theater => (
                                                                                                    <tr key={theater.id} style={{ height: 120 }} className='fw-bolder'>
                                                                                                        <td style={{ fontSize: 17 }}>{theater.name}</td>
                                                                                                        <td>
                                                                                                            <div style={{ display: "flex", gap: "20px", cursor: "pointer", fontSize: "12px", width: "auto" }}>
                                                                                                                {theater.showtimes.map(showtime => (
                                                                                                                    <Button
                                                                                                                        style={{ width: 110, backgroundColor: "white", color: "black", border: "1px solid rgb(189, 192, 194)" }}
                                                                                                                        key={showtime}
                                                                                                                        color="primary"
                                                                                                                        onMouseEnter={(e) => { e.target.style.backgroundColor = "#c0c1df"; }}
                                                                                                                        onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
                                                                                                                        onClick={() => setSelectedShowtime(showtime)}
                                                                                                                    >
                                                                                                                        {showtime}
                                                                                                                    </Button>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-none code-view">
                                                                                    <pre className="language-markup" style={{ "height": "275px" }}>
                                                                                        <code>
                                                                                            <StrippedRow />
                                                                                        </code>
                                                                                    </pre>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </TabPane>

                                                            <TabPane tabId="4" id="animation-settings">
                                                                <Row>
                                                                    <Col>
                                                                        <Card>
                                                                            <CardBody style={{ padding: 0 }}>
                                                                                <div className="live-preview">
                                                                                    <div className="table-responsive">
                                                                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                                                                            <tbody>
                                                                                                {theaters.map(theater => (
                                                                                                    <tr key={theater.id} style={{ height: 120 }} className='fw-bolder'>
                                                                                                        <td style={{ fontSize: 17 }}>{theater.name}</td>
                                                                                                        <td>
                                                                                                            <div style={{ display: "flex", gap: "20px", cursor: "pointer", fontSize: "12px", width: "auto" }}>
                                                                                                                {theater.showtimes.map(showtime => (
                                                                                                                    <Button
                                                                                                                        style={{ width: 110, backgroundColor: "white", color: "black", border: "1px solid rgb(189, 192, 194)" }}
                                                                                                                        key={showtime}
                                                                                                                        color="primary"
                                                                                                                        onMouseEnter={(e) => { e.target.style.backgroundColor = "#c0c1df"; }}
                                                                                                                        onMouseLeave={(e) => { e.target.style.backgroundColor = "white"; }}
                                                                                                                        onClick={() => setSelectedShowtime(showtime)}
                                                                                                                    >
                                                                                                                        {showtime}
                                                                                                                    </Button>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                ))}
                                                                                            </tbody>
                                                                                        </Table>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="d-none code-view">
                                                                                    <pre className="language-markup" style={{ "height": "275px" }}>
                                                                                        <code>
                                                                                            <StrippedRow />
                                                                                        </code>
                                                                                    </pre>
                                                                                </div>
                                                                            </CardBody>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            </TabPane>
                                                        </TabContent>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>

                                </Card>
                            </Col>
                        </Col>


                        {/* Bên Phải */}
                        <Col lg={4}>
                            {/* PHIM ĐANG CHIẾU */}
                            <Card className="quick-ticket-card-phim-dang-chieu">
                                <div className="d-flex align-items-center pb-3">
                                    <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>PHIM ĐANG CHIẾU</div>
                                </div>
                                <Link to="/ticket-booking/phim" style={{ textDecoration: "none", color: "inherit" }}>
                                    <CardBody className="position-relative p-0 hover-container">
                                        <img
                                            style={{ height: "222px", width: "333px", objectFit: "inherit" }}
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
                                        <span style={{ fontSize: 13, fontWeight: "bold" }}>Thor RagnaRock</span>
                                        </div>
                                    </CardBody>
                                </Link>
                            </Card>
                            <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                                <Link to="/ticket-booking/phim" style={{ textDecoration: "none", color: "inherit" }}>
                                    <CardBody className="position-relative p-0 hover-container">
                                        <img
                                           style={{ height: "222px", width: "333px", objectFit: "inherit" }}
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
                                        <span style={{ fontSize: 13, fontWeight: "bold" }}>Thor RagnaRock</span>
                                        </div>
                                    </CardBody>
                                </Link>
                            </Card>
                            <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                                <Link to="/ticket-booking/phim" style={{ textDecoration: "none", color: "inherit" }}>
                                    <CardBody className="position-relative p-0 hover-container">
                                        <img
                                            style={{ height: "222px", width: "333px", objectFit: "inherit" }}
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
                                        <span style={{ fontSize: 13, fontWeight: "bold" }}>Thor RagnaRock</span>
                                        </div>
                                    </CardBody>
                                </Link>
                            </Card>
                            <div className='button-dien-vien'>
                                <Button color="secondary" outline className="waves-effect waves-light material-shadow-none" > Xem Thêm <i className="bx bx-right-arrow-alt"></i>  </Button>
                            </div>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </Container>
    );
};

export default TicketBooking;

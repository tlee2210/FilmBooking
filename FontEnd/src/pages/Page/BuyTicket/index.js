import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, ButtonGroup, Modal, Row, ModalBody, Button, TabContent, TabPane, Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/BuyTicket.css'; // Import your CSS file
import '../CinemaCorner/css/CinemaCorner.css';
import classnames from "classnames";
import { StrippedRow } from '../../../Components/Common/BasicTablesCode';

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
                                    <Row className="g-0 mb-5">
                                        <Col md={4}>
                                            <img
                                                style={{ height: "250px", width: "250px", objectFit: "cover" }}
                                                className="rounded-start img-fluid"
                                                src="https://cdn.galaxycine.vn/media/j/a/james-wan-premiere-death-sentence-01.jpg"
                                                alt="Card"
                                            />
                                        </Col>
                                        <Col md={8}>
                                            <CardHeader>
                                                <h1 className="title-cinemaCorner-name mb-0">Thor RagnaRock 2</h1>

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


                                    {/* Nội dung phim  */}
                                    <div className="movies-section-ActorInfor mt-5 mb-3">
                                        <div className="d-flex align-items-center pb-3">
                                            <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>Nội dung phim</div>
                                        </div>
                                        <Row>
                                            <span style={{ fontSize: "13px", paddingBottom: "10px" }}>
                                                Furiosa: A Mad Max Saga xảy ra trước những sự kiện của Mad Max: Fury Road, câu chuyện kể về thời trẻ của nữ chiến binh Furiosa khi cô bị tách ra khỏi nơi ẩn náu ở Green Place of Many Mothers và lần đầu tiên buộc phải đối mặt với sự điên rồ của thế giới bên ngoài. Nhưng cô ấy luôn nuôi trong mình một khát vọng “trở về đất mẹ” mãnh liệt.
                                                <br /><br /> Phần tiền truyện của Mad Max: Fury Road mở ra một thế giới gai góc và tràn đầy khốc liệt. Câu chuyện về nguồn gốc của nhân vật chính Furiosa khi còn ở vùng “Xanh”. Đóa hồng Anya Taylor-Joy hóa thân vào nữ chiến binh Furiosa thời trẻ, kết hợp cùng ‘thần Sấm’ Chris Hemsworth với tạo hình chất nhưng không kém phần điên dại. Được cầm trịch bởi đạo diễn đã tạo nên tên tuổi của các phần phim Mad Max George Miller, bộ phim chiếu rạp chắc hẳn sẽ là bom tấn mùa hè năm nay.
                                                <br /><br /> Phim mới Furiosa: A Mad Max Saga có suất chiếu sớm tại rạp chiếu phim toàn quốc từ 22.05.2024 (không áp dụng movie voucher) và khởi chiếu vào 24.05.2024.
                                            </span>
                                        </Row>
                                    </div>



                                    {/* Lịch Chiếu */}
                                    <div className="">
                                        <div className="d-flex align-items-center pb-2">
                                            <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>Lịch Chiếu</div>
                                        </div>
                                        <Row>
                                            <Col>
                                                <Card>
                                                    <CardBody style={{ padding: 0 }}>
                                                        <Nav pills className="nav nav-pills animation-nav nav-justified gap-2 mb-3">
                                                            <NavItem>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: animationNavTab === "1", })} onClick={() => { animationNavToggle("1"); }} >
                                                                    Hôm Nay <br />
                                                                    Ngày 27/5
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: animationNavTab === "2", })} onClick={() => { animationNavToggle("2"); }} >
                                                                    Thứ 3 <br />
                                                                    Ngày 28/5
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: animationNavTab === "3", })} onClick={() => { animationNavToggle("3"); }} >
                                                                    Thứ 4 <br />
                                                                    Ngày 29/5
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({ active: animationNavTab === "4", })} onClick={() => { animationNavToggle("4"); }} >
                                                                    Thứ 5 <br />
                                                                    Ngày 30/5
                                                                </NavLink>
                                                            </NavItem>
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
                                                                                                            <div style={{ display: "flex", gap: "20px" }}>
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


                                                            {/* Tab ID 1 */}
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
                                                                                                            <div style={{ display: "flex", gap: "20px" }}>
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
                                                                <div className="d-flex">
                                                                    <div className="flex-shrink-0">
                                                                        <i className="ri-checkbox-circle-fill text-success"></i>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        Each design is a new, unique piece of art birthed into this world, and while you have the opportunity to be creative and make your own style choices.
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex mt-2">
                                                                    <div className="flex-shrink-0">
                                                                        <i className="ri-checkbox-circle-fill text-success"></i>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                                                    </div>
                                                                </div>
                                                            </TabPane>

                                                            <TabPane tabId="4" id="animation-settings">
                                                                <div className="d-flex mt-2">
                                                                    <div className="flex-shrink-0">
                                                                        <i className="ri-checkbox-circle-fill text-success"></i>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        For that very reason, I went on a quest and spoke to many different professional graphic designers and asked them what graphic design tips they live.
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex mt-2">
                                                                    <div className="flex-shrink-0">
                                                                        <i className="ri-checkbox-circle-fill text-success"></i>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-2">
                                                                        After gathering lots of different opinions and graphic design basics, I came up with a list of 30 graphic design tips that you can start implementing.
                                                                    </div>
                                                                </div>
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


import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row, Input, Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import classnames from "classnames";
import Masonry from "react-masonry-component";
import { Link } from 'react-router-dom';

// import img1 from "../../assets/images/galaxy/img-1.png";
import filmtest from "../../../assets/images/filmtest.jpg";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import { Pagination, Navigation, Scrollbar, EffectFade, EffectCreative, Mousewheel, EffectFlip, EffectCoverflow, Autoplay } from "swiper/modules";

import img1 from "../../../assets/images/sliderRapFlim/1.png";
import img2 from "../../../assets/images/sliderRapFlim/2.jpg";
import img3 from "../../../assets/images/sliderRapFlim/3.jpg";
import img4 from "../../../assets/images/sliderRapFlim/4.jpg";
import img5 from "../../../assets/images/sliderRapFlim/5.jpg";
import img6 from "../../../assets/images/sliderRapFlim/6.jpg";

import './css/RapPhim.css'
import GoogleMap from './GoogleMap';

const index = () => {
    document.title = "Rạp Phim";

    const [activeTab, setActiveTab] = useState("1");

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const data = [
        { title: "Garfield: Mèo Béo Siêu Quậy", img: "https://cdn.galaxycine.vn/media/2024/5/28/mv-500_1716879166318.jpg", rating: "9.5", age: "K" },
        { title: "Móng Vuốt", img: "https://cdn.galaxycine.vn/media/2024/5/27/garfield-1_1716798361490.jpg", rating: "8.8", age: "T16" },
        { title: "Ngôi Đền Kỳ Quái 4", img: "https://cdn.galaxycine.vn/media/2024/5/27/pee-nak-4-1_1716796582162.jpg", rating: "6.8", age: "T16" },
        { title: "Phim Điện Ảnh Doraemon: Nobita Và Bản Giao Hưởng Địa Cầu", img: "https://cdn.galaxycine.vn/media/2024/5/21/doraemon-movie-43-nobitas-earth-symphony-1-1_1716273120350.jpg", rating: "9.6", age: "T24.5" },
        { title: "Furiosa: Câu Chuyện Từ Max Điên", img: "https://cdn.galaxycine.vn/media/2024/5/24/furiosa-500_1716547292998.jpg", rating: "8.8", age: "T18" },
        { title: "Lật Mặt 7: Một Điều Ước", img: "https://cdn.galaxycine.vn/media/2024/4/26/lm7-500_1714101585009.jpg", rating: "9.4", age: "K" }
    ];

    return (
        <React.Fragment>
            <div style={{ paddingTop: 80, backgroundColor: "rgb(228 228 228)" }}>
                <Row>
                    <Card>
                        <CardBody>
                            <Swiper effect={"coverflow"} grabCursor={true} centeredSlides={true} slidesPerView={"1.3"} loop={true} autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                pagination={{
                                    el: '.swiper-pagination',
                                    clickable: true,
                                    dynamicBullets: true,
                                }}
                                modules={[EffectCoverflow, Pagination, Autoplay]} className="mySwiper swiper effect-coverflow-swiper rounded pb-5"
                            >
                                <div className="swiper-wrapper">
                                    <SwiperSlide> <img src={img1} alt="" className="img-fluid swiper-rap-phim" /> </SwiperSlide>
                                    <SwiperSlide> <img src={img2} alt="" className="img-fluid swiper-rap-phim" /> </SwiperSlide>
                                    <SwiperSlide> <img src={img3} alt="" className="img-fluid swiper-rap-phim" /> </SwiperSlide>
                                    <SwiperSlide> <img src={img4} alt="" className="img-fluid swiper-rap-phim" /> </SwiperSlide>
                                    <SwiperSlide> <img src={img5} alt="" className="img-fluid swiper-rap-phim" /> </SwiperSlide>
                                    <SwiperSlide> <img src={img6} alt="" className="img-fluid swiper-rap-phim" /> </SwiperSlide>
                                </div>
                                <div className="swiper-pagination swiper-pagination-dark"></div>
                            </Swiper>
                        </CardBody>
                        <Container style={{ paddingTop: 26 }}>
                            <Row>
                                <Col md="9">
                                    <h1 style={{ fontSize: 25, fontWeight: 'bold' }}>Galaxy Tân Bình</h1>
                                    <p>Địa Chỉ: 391 Nam Kỳ Khởi Nghĩa, Quận 3 , Thành Phố Hồ Chí Minh <br /><p>Hotline: 1900123</p></p>
                                </Col>
                                <Col md="3" className="d-flex">
                                    <Input type="select" className="mx-2" style={{ height: 45, cursor: "pointer", fontSize: "15px", width: "auto" }}>
                                        <option>Tất Cả Tỉnh</option>
                                        <option>Tân Bình</option>
                                        <option>Option 2</option>
                                    </Input>
                                    <Input type="select" className="mx-2" style={{ height: 45, cursor: "pointer", fontSize: "15px", width: "auto" }}>
                                        <option>Rạp Phim</option>
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </Input>
                                </Col>
                            </Row>
                        </Container>
                    </Card>

                </Row>
                <Container>
                    <Row>
                        {/* PHIM */}
                        <div className="movies-section-ActorInfor" style={{ paddingTop: 70 }}>
                            <Row>
                                <Card style={{ marginTop: "5px" }} className="bg-light">
                                    <CardHeader>
                                        <div className="d-flex align-items-center pb-3">
                                            <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "23px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>PHIM</div>
                                        </div>
                                        <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active: activeTab === "1",
                                                        "text-secondary-emphasis": activeTab === "1",
                                                        "bg-light": activeTab === "1",
                                                        "bg-opacity-50": activeTab === "1",
                                                    })}
                                                    onClick={() => { tabChange("1"); }}
                                                >
                                                    <i className="fas fa-home"></i>
                                                    Hôm Nay 05/06
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    className={classnames({
                                                        active: activeTab === "2",
                                                        "text-secondary-emphasis": activeTab === "2",
                                                        "bg-light": activeTab === "2",
                                                        "bg-opacity-50": activeTab === "2",
                                                    })}
                                                    onClick={() => { tabChange("2"); }}
                                                    type="button"
                                                >
                                                    <i className="far fa-user"></i>
                                                    Thứ Năm 06/06
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    className={classnames({
                                                        active: activeTab === "3",
                                                        "text-secondary-emphasis": activeTab === "3",
                                                        "bg-light": activeTab === "3",
                                                        "bg-opacity-50": activeTab === "3",
                                                    })}
                                                    onClick={() => { tabChange("3"); }}
                                                    type="button"
                                                >
                                                    <i className="far fa-user"></i>
                                                    Thứ Sáu 07/06
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    className={classnames({
                                                        active: activeTab === "4",
                                                        "text-secondary-emphasis": activeTab === "4",
                                                        "bg-light": activeTab === "4",
                                                        "bg-opacity-50": activeTab === "4",
                                                    })}
                                                    onClick={() => { tabChange("4"); }}
                                                    type="button"
                                                >
                                                    <i className="far fa-user"></i>
                                                    Thứ Bảy 08/06
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    to="#"
                                                    className={classnames({
                                                        active: activeTab === "5",
                                                        "text-secondary-emphasis": activeTab === "5",
                                                        "bg-light": activeTab === "5",
                                                        "bg-opacity-50": activeTab === "5",
                                                    })}
                                                    onClick={() => { tabChange("5"); }}
                                                    type="button"
                                                >
                                                    <i className="far fa-user"></i>
                                                    Chủ Nhật 09/06
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </CardHeader>

                                    <CardBody className="p-4">
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId="1">
                                                <Masonry className="row gallery-wrapper">
                                                    {data.map((item, index) => (
                                                        <Col xxl={2} xl={2} sm={4} className="element-item project designing development" key={index}>
                                                            <Card className="gallery-box">
                                                                <div className="gallery-container">
                                                                    <img className="gallery-img img-fluid mx-auto" src={item.img} alt="" />
                                                                    <div className="gallery-overlay">
                                                                        <h5 className="overlay-caption">
                                                                            <div className="mb-3" style={{ fontSize: 14 }}>
                                                                                <Button color="warning" className="custom-toggle active" style={{ width: "134px" }}>
                                                                                    <span className="icon-off">
                                                                                        <i className="ri-ticket-2-line align-bottom me-1"></i> Buy Tickets
                                                                                    </span>
                                                                                </Button>
                                                                            </div>
                                                                            <Button color="warning" outline className="waves-effect waves-light material-shadow-none text-light align-items-center" style={{ width: "134px", fontSize: '14px' }}>
                                                                                <span className="icon-off">
                                                                                    <i className="ri-play-circle-line align-bottom me-1"></i> <span>Trailer</span>
                                                                                </span>
                                                                            </Button>
                                                                        </h5>
                                                                    </div>
                                                                </div>

                                                                <div className="box-content">
                                                                    <div className="d-flex align-items-center mt-1">
                                                                        <div className="flex-grow-1 text-muted">
                                                                            <div className="d-flex justify-content-between">
                                                                                <span style={{ fontSize: 17 }}>{item.title}</span>
                                                                                <span className="badge bg-warning text-dark" style={{ height: 23 }}></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </Col>
                                                    ))}
                                                </Masonry>
                                            </TabPane>
                                            {/* Repeat TabPane for other tabs if needed */}
                                        </TabContent>
                                    </CardBody>
                                </Card>
                            </Row>
                        </div>
                    </Row>
                    <Row>
                        {/* Thông tin chi tiết */}
                        <div className="movies-section-ActorInfor" style={{ paddingTop: 50 }}>
                            {/* Google Map */}
                            <Row className="mb-4">
                                <Col>
                                    <GoogleMap />
                                </Col>
                            </Row>
                            {/* Description */}
                        </div>
                    </Row>
                </Container>
            </div>

        </React.Fragment>
    );
};

export default index;
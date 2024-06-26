import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Button,
    Modal
} from "reactstrap";
import filmtest from "../../../assets/images/filmtest.jpg";
import classnames from "classnames";
import Masonry from "react-masonry-component";

const phimsapchieu = () => {
    document.title = "home";

    const [activeTab, setActiveTab] = useState("2");

    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };


    const data = ["item1", "item1"];
    const data2 = [
        { title: 'TitleTitleTitleTitleTitleTitleTitleTitleTitle1', items: ["item1", "item1", "item1"] },
        { title: 'Title 2', items: ["item2", "item2", "item2"] },
        { title: 'Title 3', items: ["item3", "item3", "item3"] }
    ];

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <React.Fragment>
            <section className="section job-hero-section pb-0" id="hero">
                <Container className="mt-5 pb-5">
                    {/* Phim Đang Chiếu */}
                    <Card style={{ marginTop: "50px" }} className="bg-light">
                        <CardHeader style={{ paddingBottom: 30 }}>
                            <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0 d-flex align-items-center" role="tablist">
                                <div className="text-xl inline-block font-bold uppercase d-flex align-items-center" style={{ borderLeft: "4px solid #007bff", fontSize: "23px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem", marginRight: "1rem" }}>
                                    PHIM
                                </div>
                                <NavItem>
                                <NavLink
                                        tag={Link}
                                        to="/phim-dang-chieu"
                                        className={classnames({
                                            active: activeTab === "1",
                                            "text-secondary-emphasis": activeTab === "1",
                                        })}
                                        onClick={() => {
                                            tabChange("1");
                                        }}
                                        type="button"
                                    >
                                        <i className="far fa-user"></i>
                                        Phim Đang Chiếu
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to="/phim-sap-chieu"
                                        className={classnames({
                                            active: activeTab === "2",
                                            "text-secondary-emphasis": activeTab === "2",
                                        })}
                                        onClick={() => {
                                            tabChange("2");
                                        }}
                                        type="button"
                                    >
                                        <i className="far fa-user"></i>
                                        Phim Sắp Chiếu
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </CardHeader>

                        <CardBody className="p-4">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Masonry className="row gallery-wrapper">
                                        {data.map((item, index) => (
                                            <Col
                                                xxl={3}
                                                xl={4}
                                                sm={6}
                                                className="element-item project designing development"
                                                key={index}
                                            >
                                                <Card className="gallery-box">
                                                    <div className="gallery-container">
                                                        <Link
                                                            className="image-popup"
                                                            to="#"
                                                            title="test"
                                                        >
                                                            <img
                                                                className="gallery-img img-fluid mx-auto"
                                                                src={filmtest}
                                                                alt=""
                                                            />
                                                            <div className="gallery-overlay">
                                                                <h5 className="overlay-caption">
                                                                    <div className="mb-3">
                                                                        <Button
                                                                            color="warning"
                                                                            className="custom-toggle active"
                                                                            style={{ width: "134px" }}
                                                                        >
                                                                            <span className="icon-off">
                                                                                <i className="ri-ticket-2-line align-bottom me-1"></i>
                                                                                Buy Tickets
                                                                            </span>
                                                                        </Button>
                                                                    </div>
                                                                    <Button
                                                                        color="warning"
                                                                        outline
                                                                        className="waves-effect waves-light material-shadow-none text-light align-items-center"
                                                                        style={{ width: "134px" }}
                                                                        onClick={toggleModal}
                                                                    >
                                                                        <span className="icon-off" >
                                                                            <i className="ri-play-circle-line align-bottom me-1"></i>
                                                                            <span>Trailer</span>
                                                                        </span>
                                                                    </Button>
                                                                    <Modal isOpen={modal} toggle={toggleModal} size="lg">
                                                                        <iframe
                                                                            width="100%"
                                                                            height="500px"
                                                                            src="https://www.youtube.com/embed/49xWJJvpjzI"
                                                                            title="YouTube video"
                                                                            frameBorder="0"
                                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                            allowFullScreen
                                                                            style={{ padding: 2 }}
                                                                        ></iframe>
                                                                    </Modal>
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="box-content">
                                                        <div className="d-flex align-items-center mt-1">
                                                            <div className="flex-grow-1 text-muted">
                                                                <Link
                                                                    to="#"
                                                                    className="text-body text-truncate"
                                                                >
                                                                    Lật Mặt 7: Một Điều Ước
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Masonry>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Masonry className="row gallery-wrapper">
                                        {data2.map((item, index) => (
                                            <Col
                                                xxl={3}
                                                xl={4}
                                                sm={6}
                                                className="element-item project designing development"
                                                key={index}
                                            >
                                                <Card className="gallery-box">
                                                    <div className="gallery-container">
                                                        <Link
                                                            className="image-popup"
                                                            to="#"
                                                            title="test"
                                                        >
                                                            <img
                                                                className="gallery-img img-fluid mx-auto"
                                                                src={filmtest}
                                                                alt=""
                                                            />
                                                            <div className="gallery-overlay">
                                                                <h5 className="overlay-caption">
                                                                    <div className="mb-3">
                                                                        <Button
                                                                            color="warning"
                                                                            className="custom-toggle active"
                                                                            style={{ width: "134px" }}
                                                                        >
                                                                            <span className="icon-off">
                                                                                <i className="ri-ticket-2-line align-bottom me-1"></i>
                                                                                Buy Tickets
                                                                            </span>
                                                                        </Button>
                                                                    </div>
                                                                    <Button
                                                                        color="warning"
                                                                        outline
                                                                        className="waves-effect waves-light material-shadow-none text-light align-items-center"
                                                                        style={{ width: "134px" }}
                                                                    >
                                                                        <span className="icon-off">
                                                                            <i className="ri-play-circle-line align-bottom me-1"></i>
                                                                            <span>Trailer</span>
                                                                        </span>
                                                                    </Button>
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="box-content">
                                                        <div className="d-flex align-items-center mt-1">
                                                            <div className="flex-grow-1 text-muted">
                                                                <Link
                                                                    to="#"
                                                                    className="text-body text-truncate"
                                                                >
                                                                    Lật Mặt 7: Một Điều Ước
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Masonry>
                                </TabPane>
                            </TabContent>
                        </CardBody>
                    </Card>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default phimsapchieu;

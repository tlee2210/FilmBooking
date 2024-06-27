import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
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
  Modal,
} from "reactstrap";
import classnames from "classnames";

const MovieList = ({ HomeData }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState("");

  const toggleModal = (trailerUrl = "") => {
    setModal(!modal);
    setUrl(trailerUrl);
  };

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getEmbedUrl = (url) => {
    if (typeof url !== "string") {
      return "";
    }

    const videoId = url?.split("v=")[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf("&");
      const cleanVideoId =
        ampersandPosition !== -1
          ? videoId.substring(0, ampersandPosition)
          : videoId;
      return `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1`;
    }
  };

  return (
    <React.Fragment>
      <Container className="mt-5 pb-5">
        <Card style={{ marginTop: "80px" }} className="bg-light">
          <CardHeader style={{ paddingBottom: 30 }}>
            <Nav
              className="nav-tabs-custom rounded card-header-tabs border-bottom-0 d-flex align-items-center"
              role="tablist"
            >
              <div
                className="text-xl inline-block font-bold uppercase d-flex align-items-center"
                style={{
                  borderLeft: "4px solid #007bff",
                  fontSize: "23px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  paddingLeft: "0.5rem",
                  marginRight: "1rem",
                }}
              >
                Movie
              </div>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "1",
                    "text-secondary-emphasis": activeTab === "1",
                  })}
                  onClick={() => tabChange("1")}
                  type="button"
                >
                  <i className="fas fa-home"></i>
                  Movies Showing Now
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === "2",
                    "text-secondary-emphasis": activeTab === "2",
                  })}
                  onClick={() => tabChange("2")}
                  type="button"
                >
                  <i className="far fa-user"></i>
                  Movies Coming Soon
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>

          <CardBody className="p-4">
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Masonry className="row gallery-wrapper">
                  {HomeData && HomeData.movieShowingList
                    ? HomeData.movieShowingList.map((item, index) => (
                        <Col
                          xxl={3}
                          xl={4}
                          sm={6}
                          className="element-item project designing development"
                          key={index}
                        >
                          <Card className="gallery-box">
                            <div className="gallery-container">
                              <img
                                className="gallery-img img-fluid mx-auto rounded-3"
                                src={item.imagePortrait}
                                alt={item.name}
                              />
                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  <Link
                                    className="image-popup"
                                    to={`/book-tickets/${item.slug}`}
                                    title={item.name}
                                  >
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
                                  </Link>
                                  <Button
                                    color="warning"
                                    outline
                                    className="waves-effect waves-light material-shadow-none text-light align-items-center"
                                    style={{ width: "134px" }}
                                    onClick={() => toggleModal(item.trailer)}
                                  >
                                    <span className="icon-off">
                                      <i className="ri-play-circle-line align-bottom me-1"></i>
                                      <span>Trailer</span>
                                    </span>
                                  </Button>
                                </h5>
                              </div>
                            </div>
                            <Link
                              className="image-popup"
                              to={`/book-tickets/${item.slug}`}
                              title={item.name}
                            >
                              <div className="box-content">
                                <div className="d-flex align-items-center mt-1">
                                  <div className="text-body text-truncat">
                                    <p>{item.name}</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </Card>
                        </Col>
                      ))
                    : null}
                </Masonry>
              </TabPane>
              <TabPane tabId="2">
                <Masonry className="row gallery-wrapper">
                  {HomeData && HomeData.movieSoonList
                    ? HomeData.movieSoonList.map((item, index) => (
                        <Col
                          xxl={3}
                          xl={4}
                          sm={6}
                          className="element-item project designing development"
                          key={index}
                        >
                          <Card className="gallery-box">
                            <div className="gallery-container">
                              <img
                                className="gallery-img img-fluid mx-auto"
                                src={item.imagePortrait}
                                alt={item.name}
                              />

                              <div className="gallery-overlay">
                                <h5 className="overlay-caption">
                                  <Link
                                    className="image-popup"
                                    to={`/book-tickets/${item.slug}`}
                                    title={item.name}
                                  >
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
                                  </Link>
                                  <Button
                                    color="warning"
                                    outline
                                    className="waves-effect waves-light material-shadow-none text-light align-items-center"
                                    style={{ width: "134px" }}
                                    onClick={() => toggleModal(item.trailer)}
                                  >
                                    <span className="icon-off">
                                      <i className="ri-play-circle-line align-bottom me-1"></i>
                                      <span>Trailer</span>
                                    </span>
                                  </Button>
                                </h5>
                              </div>
                            </div>
                            <Link
                              className="image-popup"
                              to={`/book-tickets/${item.slug}`}
                              title={item.name}
                            >
                              <div className="box-content">
                                <div className="d-flex align-items-center mt-1">
                                  <div className="text-body text-truncat">
                                    <p>{item.name}</p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </Card>
                        </Col>
                      ))
                    : null}
                </Masonry>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Container>
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        <div className="ratio ratio-16x9">
          <iframe
            width="942"
            height="750"
            src={getEmbedUrl(url)}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          ></iframe>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MovieList;

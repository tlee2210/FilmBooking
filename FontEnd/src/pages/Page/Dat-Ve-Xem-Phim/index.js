import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Booking/css/order.css";
// import "../Dat-Ve-Xem-Phim/css/Dat-Ve-Xem-Phim.css";
import {
  Form,
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Button,
  Badge,
  Accordion,
  AccordionItem,
  Collapse,
  Container,
} from "reactstrap";
import classnames from "classnames";
import SimpleBar from "simplebar-react";

import { message } from "antd";
import withRouter from "../../../Components/Common/withRouter";

const Booking = (props) => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieListVisible, setIsMovieListVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const [borderCol1, setborderCol1] = useState(true);
  const [borderCol2, setborderCol2] = useState(false);
  const [borderCol3, setborderCol3] = useState(false);

  const t_borderCol1 = () => {
    setborderCol1(!borderCol1);
    setborderCol2(false);
    setborderCol3(false);
  };

  const t_borderCol2 = () => {
    setborderCol2(!borderCol2);
    setborderCol1(false);
    setborderCol3(false);
  };

  const t_borderCol3 = () => {
    setborderCol3(!borderCol3);
    setborderCol1(false);
    setborderCol2(false);
  };

  const data = {
    movieName: "Movie Title",
    price: 10,
    room: {
      seatRows: 5,
      seatColumns: 10,
      doubleSeatRows: 3,
      doubleSeatColumns: 4,
      totalColumn: 2,
    },
    movieformats: [
      {
        name: "Format 1",
        times: [
          { idRoom: 1, time: "12:00" },
          { idRoom: 1, time: "13:00" },
          { idRoom: 1, time: "14:00" },
          { idRoom: 1, time: "12:00" },
          { idRoom: 1, time: "16:00" },
        ],
      },
    ],
    image:
      "https://www.galaxycine.vn/_next/static/media/img-blank.bb695736.svg",
    cinemaName: "Cinema Name",
    roomName: "Room Name",
    time: "12:00",
    date: "2024-07-07",
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, []);

  function handlePrevTab() {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  }

  document.title = `Booking ${data.movieName}` || "Booking";

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#e9e9e9" }}>
        <div style={{ paddingTop: 100 }}>
          <Container>
            <Col xl="12">
              <Card>
                <CardBody className="checkout-tab">
                  <Form action="#">
                    <div className="step-arrow-nav">
                      <div
                        className="nav-pills nav-justified custom-nav"
                        role="tablist"
                      >
                        <div className={`step-item -order-1 active done`}>
                          <span>Cinema interest</span>
                        </div>
                        {/* tablist here */}
                        <div className={`step-item -order-2 `}>
                          <span>Choose a food</span>
                        </div>
                        <div className={`step-item -order-3 `}>
                          <span>Payment</span>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Container>
        </div>
        <Container>
          <div
            style={{ paddingTop: 30, paddingBottom: 50 }}
            className="page-content"
          >
            <Container fluid>
              <Row>
                <Row className="gx-3">
                  <Col md={8}>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId={1}>
                        <Row>
                          <Accordion
                            className="custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success"
                            id="accordionBordered"
                          >
                            <AccordionItem className="material-shadow shadow-lg bg-white rounded">
                              <h1
                                className="accordion-header "
                                id="accordionborderedExample1"
                                style={{ fontSize: "20px", fontWeight: "Bold" }}
                              >
                                <button
                                  className={classnames(
                                    "accordion-button fs-2",
                                    {
                                      collapsed: !borderCol1,
                                    }
                                  )}
                                  type="button"
                                  onClick={t_borderCol1}
                                  style={{ cursor: "pointer" }}
                                >
                                  choose place
                                </button>
                              </h1>
                              <Collapse
                                isOpen={borderCol1}
                                className="accordion-collapse"
                                id="accor_borderedExamplecollapse1"
                              >
                                <div className="accordion-body">
                                  <Row className="ms-4 mb-4">
                                    <Col className="d-flex flex-wrap">
                                      <button
                                        className="btn btn-primary me-2 mb-2"
                                        //   className={classnames({
                                        //     "btn btn-primary me-2 mb-2":
                                        //       timeItem.idRoom == data.id,
                                        //     "btn btn-outline-primary me-2 mb-2":
                                        //       timeItem.idRoom != data.id,
                                        //   })}
                                      >
                                        Hồ chí Minh
                                      </button>
                                      <button
                                        className="btn btn-outline-primary me-2 mb-2"
                                        //   className={classnames({
                                        //     "btn btn-primary me-2 mb-2":
                                        //       timeItem.idRoom == data.id,
                                        //     "btn btn-outline-primary me-2 mb-2":
                                        //       timeItem.idRoom != data.id,
                                        //   })}
                                      >
                                        Da lat
                                      </button>
                                      <button
                                        className="btn btn-outline-primary me-2 mb-2"
                                        //   className={classnames({
                                        //     "btn btn-primary me-2 mb-2":
                                        //       timeItem.idRoom == data.id,
                                        //     "btn btn-outline-primary me-2 mb-2":
                                        //       timeItem.idRoom != data.id,
                                        //   })}
                                      >
                                        Da lat
                                      </button>
                                    </Col>{" "}
                                  </Row>
                                </div>
                              </Collapse>
                            </AccordionItem>
                            <AccordionItem className="material-shadow">
                              <h2
                                className="accordion-header"
                                id="accordionborderedExample2"
                                style={{ fontSize: "20px", fontWeight: "Bold" }}
                              >
                                <button
                                  className={classnames("accordion-button", {
                                    collapsed: !borderCol2,
                                  })}
                                  type="button"
                                  onClick={t_borderCol2}
                                  style={{ cursor: "pointer" }}
                                >
                                  Choose Movie
                                </button>
                              </h2>
                              <Collapse
                                isOpen={borderCol2}
                                className="accordion-collapse"
                                id="accor_borderedExamplecollapse2"
                              >
                                <div className="accordion-body">
                                  <div className="selection-section">
                                    <SimpleBar
                                      // forceVisible = "y"
                                      style={{ maxHeight: "500px" }}
                                      //   style={{ maxWidth: "2500px" }}
                                      className="px-3"
                                    >
                                      <Row className="movie-options">
                                        {[
                                          "Kẻ Trộm Mặt Trăng 4",
                                          "Cửu Long Thành Trại: Vây Thành",
                                          "Mùa Hè Đẹp Nhất",
                                          "Những Đường Cho Các Cảm Xúc Hội Nào",
                                          "Vùng Đất Cầm Lặng Ngày Một",
                                          "Gia Tài Của Ngoại",
                                        ].map((movie) => (
                                          <Col
                                            xxl={3}
                                            xl={4}
                                            sm={6}
                                            key={movie}
                                            onClick={() => {
                                              setSelectedMovie(movie);
                                              setIsMovieListVisible(false);
                                            }}
                                            className={classnames(
                                              "movie-option element-item project designing development me-2",
                                              {
                                                "selected-movie":
                                                  selectedMovie === movie,
                                              }
                                            )}
                                          >
                                            <img
                                              className="gallery-img img-fluid mx-auto rounded-3"
                                              src="https://cdn.galaxycine.vn/media/2024/6/3/cuu-long-thanh-trai-vay-thanh-1_1717402596500.jpg"
                                              alt={movie}
                                            />
                                            <p>{movie}</p>
                                            {selectedMovie === movie && (
                                              <div className="selected-overlay">
                                                <i
                                                  className="ri-checkbox-circle-line"
                                                  style={{ fontSize: 62 }}
                                                ></i>
                                              </div>
                                            )}
                                          </Col>
                                        ))}
                                      </Row>
                                    </SimpleBar>
                                  </div>
                                </div>
                              </Collapse>
                            </AccordionItem>
                            <AccordionItem className="material-shadow">
                              <h2
                                className="accordion-header"
                                id="accordionborderedExample3"
                                style={{ fontSize: "20px", fontWeight: "Bold" }}
                              >
                                <button
                                  className={classnames("accordion-button", {
                                    collapsed: !borderCol3,
                                  })}
                                  type="button"
                                  onClick={t_borderCol3}
                                  style={{ cursor: "pointer" }}
                                >
                                  Choose movie show time
                                </button>
                              </h2>
                              <Collapse
                                isOpen={borderCol3}
                                className="accordion-collapse"
                                id="accor_borderedExamplecollapse3"
                              >
                                <div className="accordion-body">Để im</div>
                              </Collapse>
                            </AccordionItem>
                          </Accordion>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </Col>
                  <Col md={4}>
                    <Card className="shadow-lg bg-white rounded">
                      <CardBody className="card-body-order">
                        <div className="image-description">
                          <div className="image-info">
                            <img src={data.image} alt={data.movieName} />
                          </div>
                          <div>
                            <div className="movie-title">{data.movieName}</div>
                            <div className="movie-info">
                              <p>{data.movieFormat}</p>
                            </div>
                          </div>
                        </div>
                        <div className="detailed-info">
                          <div className="movie-info">
                            <p>
                              <strong>Cinema: </strong>
                              {data.cinemaName} - {data.roomName}
                            </p>
                            <p>
                              <strong>Show Time:</strong> {data.time} - Day:{" "}
                              {data.date}
                            </p>
                          </div>
                          <hr style={{ border: "1px dashed black" }} />
                        </div>
                      </CardBody>
                    </Card>
                    <Row className="align-items-center mt-4">
                      <Col md={5} className="me-4">
                        <Row>
                          <Button
                            onClick={handlePrevTab}
                            disabled={activeTab === 1}
                            color="light"
                            className="bg-gradient"
                          >
                            Back
                          </Button>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="shadow bg-white rounded">
                          <Button
                            // onClick={handleNextTab}
                            color="warning"
                            className="bg-gradient"
                          >
                            Continue
                          </Button>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Booking);

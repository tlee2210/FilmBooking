import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Booking/css/order.css";
import {
  Container,
  Form,
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
} from "reactstrap";

import classnames from "classnames";
import { shoppingCart } from "../../../Components/Common/ecommerce";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { message } from "antd";
import { getBookingTime } from "../../../slices/home/booking/thunk";

const Booking = (props) => {
  const dispatch = useDispatch();
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [modal, setModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [productList, setproductList] = useState(shoppingCart);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const BookingState = (state) => state;
  const BookingStateData = createSelector(BookingState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    data: state.HomeBooking.bookingitem,
  }));
  const { error, messageError, data } = useSelector(BookingStateData);
  // price
  const handleChooseSeat = (seat, isDouble) => {
    const price = isDouble ? data?.price * 2 * 1.05 : data?.price;
    console.log(price);

    setSelectedSeats((prevSeats) => {
      if (prevSeats?.includes(seat)) {
        setTotalPrice(totalPrice - price);
        return prevSeats?.filter((s) => s !== seat);
      } else if (prevSeats.length < 8) {
        setTotalPrice(totalPrice + price);
        return [...prevSeats, seat];
      } else {
        message.error("Maximum number of 8 seats exceeded!");
        return prevSeats;
      }
    });
  };
  const handleChangeShowtime = (id) => {
    dispatch(getBookingTime(id));
  };

  const renderSeats = (numRows, numCols, totalColumns, isDouble = false) => {
    const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .slice(0, numRows + (isDouble ? data?.room.seatRows : 0))
      .reverse();
    const seatsPerPart = Math.ceil(numCols / totalColumns);
    // console.log(seatsPerPart);
    return (
      <div className="seating-grid">
        {rows.slice(0, numRows).map((row) => (
          <div className="seat-row" key={row}>
            {[...Array(numCols).keys()].map((i) => {
              const seatNumber = isDouble
                ? `${row}${i * 2 + 1}-${i * 2 + 2}`
                : `${row}${i + 1}`;
              const applyMargin =
                totalColumns !== 1 && i !== 0 && (i + 1) % seatsPerPart === 0;
              const isSelected = selectedSeats?.includes(seatNumber);
              return (
                <div
                  key={seatNumber}
                  onClick={() => {
                    handleChooseSeat(seatNumber, isDouble);
                  }}
                  // className={
                  //   isDouble ? "" : applyMargin ? "margin-right-seat" : null
                  // }
                  className={classnames({
                    "double-seat": isDouble,
                    seat: !isDouble,
                    "margin-right-seat": applyMargin,
                    "selected-seat": isSelected,
                  })}
                >
                  <div>{seatNumber}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  // const renderSeats = (numRows, numCols, totalColumns, isDouble = false) => {
  //   const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  //     .split("")
  //     .slice(0, numRows + (isDouble ? data?.room.seatRows : 0))
  //     .reverse();
  //   const seatsPerPart = Math.ceil(numCols / totalColumns);

  //   return (
  //     <div className="seating-grid">
  //       {rows.slice(0, numRows).map((row) => (
  //         <div className="seat-row" key={row}>
  //           {[...Array(numCols).keys()].map((i) => {
  //             const seatNumber = isDouble
  //               ? `${row}${i * 2 + 1}-${row}${i * 2 + 2}` // Adjust seat numbering for double seats
  //               : `${row}${i + 1}`;
  //             const applyMargin =
  //               totalColumns !== 1 && i !== 0 && (i + 1) % seatsPerPart === 0;
  //             const isSelected = selectedSeats?.includes(seatNumber);

  //             return (
  //               <div
  //                 key={seatNumber}
  //                 onClick={() => {
  //                   handleChooseSeat(seatNumber);
  //                 }}
  //                 className={classnames({
  //                   "double-seat": isDouble,
  //                   seat: !isDouble,
  //                   "margin-right-seat": applyMargin,
  //                   "selected-seat": isSelected,
  //                 })}
  //               >
  //                 <div>{seatNumber}</div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  function toggleTab(tab) {
    if (tab >= 1 && tab <= 4) {
      setactiveTab(tab);
    }
  }

  function handlePrevTab() {
    if (activeTab > 1) {
      setactiveTab(activeTab - 1);
    }
  }

  function handleNextTab() {
    if (activeTab === 3) {
      setModal(true); // Hiển thị modal khi ở Tab 3
    } else {
      setactiveTab(activeTab + 1);
      setPassedSteps([...passedSteps, activeTab + 1]);
    }
  }

  const handleConfirmation = () => {
    setModal(false);

    setactiveTab(4);
  };

  function countUP(id, prev_data_attr, itemPrice) {
    setproductList(
      productList.map((p) =>
        p.id === id
          ? {
              ...p,
              data_attr: prev_data_attr + 1,
              total: (prev_data_attr + 1) * itemPrice,
            }
          : p
      )
    );
  }

  function countDown(id, prev_data_attr, itemPrice) {
    setproductList(
      productList.map((p) =>
        p.id === id && p.data_attr > 0
          ? {
              ...p,
              data_attr: prev_data_attr - 1,
              total: (prev_data_attr - 1) * itemPrice,
            }
          : p
      )
    );
  }
  const [promoCode, setPromoCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("payoo");

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const applyPromoCode = () => {
    // Xử lý logic áp dụng mã khuyến mãi ở đây
    alert(`Mã khuyến mãi ${promoCode} đã được áp dụng!`);
  };

  document.title = `booking ${data?.movieName}` || "Booking";

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#e9e9e9" }}>
        <div style={{ paddingTop: 100 }}>
          <Col xl="12">
            <Card>
              <CardBody className="checkout-tab">
                <Form action="#">
                  <div className="step-arrow-nav">
                    <div
                      className="nav-pills nav-justified custom-nav"
                      role="tablist"
                    >
                      <div
                        className={`step-item -order-1 ${
                          activeTab >= 1 ? "done" : ""
                        } ${activeTab === 1 ? "active" : ""}`}
                      >
                        <span>Cinema interest</span>
                      </div>
                      {/* tablist here */}
                    </div>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </div>
        <Container>
          <div
            style={{ paddingTop: 30, paddingBottom: 50 }}
            className="page-content"
          >
            <Container fluid>
              <Row>
                <Row className="gx-3">
                  <Col xl={8}>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId={1}>
                        <div>
                          {/* Seat Selection Content */}
                          <div
                            className="btn-group-order"
                            style={{ backgroundColor: "white", padding: 20 }}
                          >
                            <span className="showtime-title-order">
                              Change show time
                            </span>
                            <div className="btn-group-order" role="group">
                              {data && data?.showtimes
                                ? data?.showtimes?.map((item, index) => (
                                    <button
                                      key={index}
                                      // className="btn btn-outline-primary"
                                      className={classnames({
                                        "btn btn-primary":
                                          item?.idRoom == data.id,
                                        "btn btn-outline-primary":
                                          item?.idRoom != data.id,
                                      })}
                                      onClick={() => {
                                        handleChangeShowtime(item?.idRoom);
                                      }}
                                    >
                                      {item.time}
                                    </button>
                                  ))
                                : null}
                            </div>
                          </div>
                          <div
                            className=""
                            style={{ backgroundColor: "white", padding: 20 }}
                          >
                            <div>
                              {data?.room?.doubleSeatColumns > 0 &&
                                data?.room?.doubleSeatRows > 0 &&
                                renderSeats(
                                  parseInt(data?.room?.doubleSeatColumns, 10),
                                  parseInt(data?.room?.doubleSeatRows, 10),
                                  parseInt(data?.room?.totalColumn, 10),
                                  true
                                )}
                              {data?.room?.seatRows > 0 &&
                                data?.room?.seatColumns > 0 &&
                                renderSeats(
                                  parseInt(data?.room?.seatRows, 10),
                                  parseInt(data?.room?.seatColumns, 10),
                                  parseInt(data?.room?.totalColumn, 10)
                                )}
                            </div>
                            <div className="screen-title-order">
                              <strong className="span-order">Screen</strong>
                              <hr className="hr-order" />
                            </div>
                            {/* <div className="seat-legend">
                              <div className="left-seats">
                                <div className="seat-status">
                                  <div className="seat ghe-da-ban"></div>
                                  <span>ghế đã bán</span>
                                </div>
                                <div className="seat-status">
                                  <div className="seat ghe-dang-chon"></div>
                                  <span>ghế đang chọn</span>
                                </div>
                              </div>
                              <div className="right-seats">
                                <div className="seat-status">
                                  <div className="seat ghe-vip"></div>
                                  <span>ghế vip</span>
                                </div>
                                <div className="seat-status">
                                  <div className="seat ghe-don"></div>
                                  <span>ghế đơn</span>
                                </div>
                                <div className="seat-status">
                                  <div className="seat ghe-doi"></div>
                                  <span>ghế đôi</span>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </TabPane>

                      {/* TabPane here */}
                    </TabContent>
                  </Col>
                  <Col xl={4}>
                    <Card>
                      <CardBody className="card-body-order">
                        <div className="image-description">
                          <div className="image-info">
                            <img src={data?.image} alt={data?.movieName} />
                          </div>
                          <div>
                            <div className="movie-title">{data?.movieName}</div>
                            {/* <div className="movie-info">
                              <p>2D Lồng Tiếng </p>
                            </div> */}
                          </div>
                        </div>
                        <div className="detailed-info">
                          <div className="movie-info">
                            <p>
                              <strong>Cinema: </strong>
                              {data?.cinemaName} - {data?.roomName}
                            </p>
                            <p>
                              <strong>Show Time:</strong> {data?.time} -{" "}
                              {data?.date}
                            </p>
                          </div>
                          <hr style={{ border: "1px dashed black" }} />
                          {/* <div className="price-info">
                            <p>1x Người Lớn - Member</p>
                            <p>60.000 đ</p>
                          </div> */}
                          <div className="price-info">
                            <Row>
                              <p>Selected seats:</p>
                              {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat, index) => (
                                  // <p key={index}>{seat}</p>
                                  <Col key={index} md={3}>
                                    <Badge color="success">{seat} </Badge>
                                  </Col>
                                ))
                              ) : (
                                <p>No seats have been selected yet.</p>
                              )}
                            </Row>
                          </div>
                          <div className="price-info">
                            <p>1x iCombo 1 Big Extra STD</p>
                            <p>99.000 đ</p>
                          </div>
                          <hr style={{ border: "1px dashed black" }} />
                          <p className="total">Total: {totalPrice}</p>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="align-items-center mt-4">
                      <button
                        type="button"
                        style={{
                          fontWeight: "100",
                          color: "orange",
                          fontSize: 17,
                          paddingLeft: 100,
                          backgroundColor: "#e9e9e9",
                        }}
                        className="btn-container-order btn-label center me-auto prevtab"
                        onClick={handlePrevTab}
                        disabled={activeTab === 1}
                      >
                        <span
                          style={{
                            fontWeight: "100",
                            color: "orange",
                            fontSize: 17,
                            marginLeft: -51,
                            marginRight: "28px",
                          }}
                        >
                          Quay Lại
                        </span>
                      </button>
                      <button
                        type="button"
                        style={{
                          fontWeight: "100",
                          color: "white",
                          fontSize: 17,
                          border: "2px solid orange",
                          backgroundColor: "orange",
                          width: "55%",
                          height: "45px",
                        }}
                        className="btn-container-order btn-label right ms-auto nexttab"
                        onClick={handleNextTab}
                      >
                        <span
                          style={{
                            fontWeight: "100",
                            color: "white",
                            fontSize: 17,
                            paddingLeft: 29,
                          }}
                        >
                          Tiếp Tục
                        </span>
                      </button>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
      {/* Modal */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader
          className="modal-header-order"
          toggle={() => setModal(!modal)}
        >
          XÁC NHẬN ĐẶT VÉ
        </ModalHeader>
        <ModalBody className="modal-body-order">
          <div className="ticket-info-order">
            <div className="ticket-section-order">
              <strong>PHIM</strong>
              <br />
              Tên phim đã chọn
            </div>
            <div className="ticket-section-order">
              <strong>RẠP</strong>
              <br />
              Tên rạp đã chọn
            </div>
            <div className="ticket-section-order">
              <strong>SUẤT CHIẾU</strong>
              <br />
              Thời gian suất chiếu
            </div>
            <div>
              <strong>TỔNG</strong>
              <br />
            </div>
            <div className="ticket-section-order">
              <div className="price-tag-order"></div>
              75.000
            </div>
          </div>
          <div className="confirmation-checkbox-order">
            <input type="checkbox" /> TÔI XÁC NHẬN CÁC THÔNG TIN ĐẶT VÉ ĐÃ CHÍNH
            XÁC
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer-order">
          <Button color="danger" onClick={handleConfirmation}>
            Thanh Toán
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Booking;

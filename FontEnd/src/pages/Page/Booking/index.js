import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

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
import { getHomeWaterCorn } from "../../../slices/home/Watercorn/thunk";
import withRouter from "../../../Components/Common/withRouter";

const Booking = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [activeTab, setactiveTab] = useState(1);
  const [modal, setModal] = useState(false);

  const [addedItemIds, setAddedItemIds] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [singleSeats, setSingleSeats] = useState([]);
  const [doubleSeats, setDoubleSeats] = useState([]);

  const BookingState = (state) => state;
  const BookingStateData = createSelector(BookingState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    data: state.HomeBooking.bookingitem,
    WaterCornData: state.HomeWaterCorn.WaterCorn,
  }));
  const { error, messageError, data, WaterCornData } =
    useSelector(BookingStateData);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    dispatch(getHomeWaterCorn());
  }, [dispatch]);

  useEffect(() => {
    if (!data) {
      props.router.navigate("/");
    }
  }, [data]);
  // price
  const handleChooseSeat = (seat, isDouble) => {
    const price = isDouble ? data?.price * 2 * 1.05 : data?.price;

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

    if (isDouble) {
      setDoubleSeats((prevSeats) => {
        if (prevSeats?.includes(seat)) {
          return prevSeats?.filter((s) => s !== seat);
        } else if (prevSeats.length + singleSeats.length < 8) {
          return [...prevSeats, seat];
        } else {
          return prevSeats;
        }
      });
    } else {
      setSingleSeats((prevSeats) => {
        if (prevSeats?.includes(seat)) {
          return prevSeats?.filter((s) => s !== seat);
        } else if (prevSeats.length + doubleSeats.length < 8) {
          return [...prevSeats, seat];
        } else {
          return prevSeats;
        }
      });
    }
  };
  const handleChangeShowtime = (id) => {
    setSelectedSeats([]);
    setDoubleSeats([]);
    setSingleSeats([]);
    dispatch(getBookingTime(id, props.router.navigate));
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
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
    // if (activeTab === 3) {
    //   setModal(true); // Hiển thị modal khi ở Tab 3
    // } else {
    //   setactiveTab(activeTab + 1);
    //   // setPassedSteps([...passedSteps, activeTab + 1]);
    // }
    if (activeTab === 1) {
      selectedSeats.length > 0
        ? setactiveTab(activeTab + 1)
        : message.error("Please select at least one seat!");
    }
    if (activeTab === 2) {
      setactiveTab(activeTab + 1);
    }
  }

  const handleConfirmation = () => {
    setModal(false);

    setactiveTab(4);
  };

  const countUP = (id, itemName, itemPrice) => {
    setAddedItemIds((prevAddedItemIds) => {
      const updatedAddedItemIds = { ...prevAddedItemIds };

      if (updatedAddedItemIds[id]) {
        updatedAddedItemIds[id].quantity += 1;
      } else {
        updatedAddedItemIds[id] = {
          name: itemName,
          price: itemPrice,
          quantity: 1,
        };
      }
      setTotalPrice(totalPrice + itemPrice);

      return updatedAddedItemIds;
    });
  };

  const countDown = (id, itemPrice) => {
    setAddedItemIds((prevAddedItemIds) => {
      const updatedAddedItemIds = { ...prevAddedItemIds };

      if (updatedAddedItemIds[id]) {
        if (updatedAddedItemIds[id] > 1) {
          updatedAddedItemIds[id] -= 1;

          setTotalPrice(totalPrice - itemPrice);
        } else {
          delete updatedAddedItemIds[id];
          setTotalPrice(totalPrice - itemPrice);
        }
      }

      return updatedAddedItemIds;
    });
  };
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
                      <div
                        className={`step-item -order-2 ${
                          activeTab >= 2 ? "done" : ""
                        } ${activeTab === 2 ? "active" : ""}`}
                      >
                        <span>Choose a food</span>
                      </div>
                      <div
                        className={`step-item -order-3 ${
                          activeTab >= 3 ? "done" : ""
                        } ${activeTab === 3 ? "active" : ""}`}
                      >
                        <span>Payment</span>
                      </div>
                      {/* <div
                        className={`step-item -order-4 ${
                          activeTab >= 4 ? "done" : ""
                        } ${activeTab === 4 ? "active" : ""}`}
                      >
                        <span>Thanh toán</span>
                      </div> */}
                      {/* <div
                        className={`step-item -order-5 ${
                          activeTab >= 5 ? "done" : ""
                        } ${activeTab === 5 ? "active" : ""}`}
                      >
                        <span>Xác nhận</span>
                      </div> */}
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
                        <Row>
                          {/* Seat Selection Content */}
                          <Row
                            className="btn-group-order rounded-3 shadow-lg p-3 bg-white rounded"
                            style={{ backgroundColor: "white", padding: 20 }}
                          >
                            <Col md={3} className="showtime-title-order">
                              Change show time
                            </Col>
                            <Col
                              md={12}
                              className="btn-group-order"
                              role="group"
                            >
                              <Row>
                                {data && data.movieformats
                                  ? data.movieformats.map((item, index) => (
                                      <Row className="ms-4 mb-4" key={index}>
                                        <Col md={2}>{item.name}</Col>
                                        <Col md={10}>
                                          <Row>
                                            {item.times
                                              ? item.times.map(
                                                  (timeItem, timeIndex) => (
                                                    <Col
                                                      key={timeIndex}
                                                      md={2}
                                                      onClick={() => {
                                                        handleChangeShowtime(
                                                          timeItem.idRoom
                                                        );
                                                      }}
                                                    >
                                                      <button
                                                        className={classnames({
                                                          "btn btn-primary me-3 mb-3":
                                                            timeItem.idRoom ==
                                                            data.id,
                                                          "btn btn-outline-primary me-3 mb-3":
                                                            timeItem.idRoom !=
                                                            data.id,
                                                        })}
                                                      >
                                                        {formatTime(
                                                          timeItem.time
                                                        )}
                                                      </button>
                                                    </Col>
                                                  )
                                                )
                                              : null}
                                          </Row>
                                        </Col>
                                      </Row>
                                    ))
                                  : null}
                              </Row>
                            </Col>
                          </Row>
                          <div
                            className="mt-4 rounded-3 shadow-lg p-3 mb-5 bg-white rounded"
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
                        </Row>
                      </TabPane>
                      <TabPane tabId={2}>
                        {WaterCornData
                          ? WaterCornData.map((item, index) => (
                              <React.Fragment key={item.id}>
                                <Card className="product mb-3 shadow bg-white rounded">
                                  <CardBody>
                                    <Row>
                                      <div className="col-sm-auto">
                                        <div className="image-watercorn bg-light rounded p-1 ">
                                          <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid d-block"
                                            style={{ borderRadius: "7px" }}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-sm">
                                        <h5 className="fs-14 text-truncate">
                                          {item.name}
                                        </h5>
                                        <ul className="list-inline text-muted">
                                          <li className="list-inline-item">
                                            <span className="fw-medium">
                                              <div
                                                id="renderHtml"
                                                dangerouslySetInnerHTML={{
                                                  __html: item?.description,
                                                }}
                                              />
                                            </span>
                                          </li>
                                        </ul>
                                        <h5
                                          className="fs-14 text-truncate"
                                          style={{
                                            fontWeight: 800,
                                          }}
                                        >
                                          {item.price} USD
                                        </h5>
                                      </div>
                                      <div
                                        className="col-sm-auto d-flex"
                                        style={{
                                          alignItems: "center",
                                        }}
                                      >
                                        <div className="text-lg-end">
                                          <div className="input-step">
                                            <button
                                              type="button"
                                              className="minus material-shadow"
                                              onClick={() => {
                                                countDown(item.id, item.price);
                                              }}
                                            >
                                              –
                                            </button>
                                            <Input
                                              type="text"
                                              className="product-quantity"
                                              value={
                                                addedItemIds[item.id]
                                                  ? addedItemIds[item.id]
                                                      .quantity
                                                  : 0
                                              }
                                              name="demo_vertical"
                                              readOnly
                                            />
                                            <button
                                              type="button"
                                              className="plus material-shadow"
                                              onClick={() => {
                                                countUP(
                                                  item?.id,
                                                  item?.name,
                                                  item?.price
                                                );
                                              }}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </Row>
                                  </CardBody>
                                </Card>
                              </React.Fragment>
                            ))
                          : null}
                      </TabPane>
                      <TabPane tabId={3}>
                        <Row className="gy-3">
                          <div className="container-order">
                            <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
                              Khuyến mãi
                            </h2>
                            <div
                              className="promo-code-order"
                              style={{ width: 400 }}
                            >
                              <input
                                type="text"
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                                placeholder="Mã khuyến mãi"
                              />
                              <button
                                className="button-order"
                                onClick={applyPromoCode}
                              >
                                Áp Dụng
                              </button>
                            </div>
                          </div>
                          <div className="container-order">
                            <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
                              Phương thức thanh toán
                            </h2>
                            <div className="payment-methods-order">
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="payoo"
                                  checked={selectedPayment === "payoo"}
                                  onChange={handlePaymentChange}
                                />
                                <img
                                  src="payoo-logo.png"
                                  alt="Payoo"
                                  width="20"
                                />{" "}
                                HSBC/Payoo - ATM/VISA/MASTER/JCB/QRCode
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="shopeepay"
                                  checked={selectedPayment === "shopeepay"}
                                  onChange={handlePaymentChange}
                                />
                                <img
                                  src="shopeepay-logo.png"
                                  alt="ShopeePay"
                                  width="20"
                                />{" "}
                                Ví ShopeePay - Nhập mã: SPPCINE06 Giảm 20K cho
                                đơn từ 100K
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="momo"
                                  checked={selectedPayment === "momo"}
                                  onChange={handlePaymentChange}
                                />
                                <img
                                  src="momo-logo.png"
                                  alt="MoMo"
                                  width="20"
                                />{" "}
                                Ví Điện Tử MoMo
                              </label>
                              <label>
                                <input
                                  type="radio"
                                  name="payment"
                                  value="zalopay"
                                  checked={selectedPayment === "zalopay"}
                                  onChange={handlePaymentChange}
                                />
                                <img
                                  src="zalopay-logo.png"
                                  alt="ZaloPay"
                                  width="20"
                                />{" "}
                                ZaloPay - Bạn mới Zalopay nhập mã GLX50 - Giảm
                                50k cho đơn từ 200k
                              </label>
                            </div>
                          </div>
                        </Row>
                      </TabPane>

                      {/* TabPane here */}
                    </TabContent>
                  </Col>
                  <Col xl={4}>
                    <Card className="shadow-lg bg-white rounded">
                      <CardBody className="card-body-order">
                        <div className="image-description">
                          <div className="image-info">
                            <img src={data?.image} alt={data?.movieName} />
                          </div>
                          <div>
                            <div className="movie-title">{data?.movieName}</div>
                            <div className="movie-info">
                              <p>{data?.movieFormat}</p>
                            </div>
                          </div>
                        </div>
                        <div className="detailed-info">
                          <div className="movie-info">
                            <p>
                              <strong>Cinema: </strong>
                              {data?.cinemaName} - {data?.roomName}
                            </p>
                            <p>
                              <strong>Show Time:</strong> {data?.time} - Day:{" "}
                              {data?.date}
                            </p>
                          </div>
                          <hr style={{ border: "1px dashed black" }} />
                          {/* <div className="price-info">
                            <p>1x Người Lớn - Member</p>
                            <p>60.000 đ</p>
                          </div> */}
                          <Row>
                            {doubleSeats.length > 0 && (
                              <Row>
                                <Col md={9}>
                                  {doubleSeats.length}x Double Seats:
                                </Col>
                                <Col md={3}>
                                  <p className="total">
                                    {doubleSeats.length *
                                      (data.price * 2 * 1.05)}{" "}
                                    USD
                                  </p>
                                </Col>
                                <Col md={9}>
                                  {doubleSeats.map((i) => (
                                    <Badge
                                      key={i}
                                      color="success"
                                      className="me-2"
                                    >
                                      {i}
                                    </Badge>
                                  ))}
                                </Col>
                              </Row>
                            )}
                            {singleSeats.length > 0 && (
                              <Row>
                                <Col md={9}>
                                  {singleSeats.length}x Single Seats:
                                </Col>
                                <Col md={3}>
                                  <p className="total">
                                    {singleSeats.length * data.price} USD
                                  </p>
                                </Col>
                                <Col md={9}>
                                  {singleSeats.map((i) => (
                                    <Badge
                                      key={i}
                                      color="success"
                                      className="me-2"
                                    >
                                      {i}
                                    </Badge>
                                  ))}
                                </Col>
                              </Row>
                            )}
                          </Row>
                          {singleSeats.length > 0 || doubleSeats.length > 0 ? (
                            <hr style={{ border: "1px dashed black" }} />
                          ) : null}
                          {/* <div className="price-info"> */}
                          {Object.keys(addedItemIds).length > 0
                            ? Object.keys(addedItemIds).map((itemId, index) => (
                                <Row key={index}>
                                  <Col md={9}>
                                    <p>
                                      {addedItemIds[itemId].quantity}x{"  "}
                                      {addedItemIds[itemId].name}
                                    </p>
                                  </Col>
                                  <Col md={3}>
                                    <p className="total">
                                      {addedItemIds[itemId].price *
                                        addedItemIds[itemId].quantity}{" "}
                                      USD
                                    </p>
                                  </Col>
                                </Row>
                              ))
                            : null}
                          {Object.keys(addedItemIds).length > 0 ? (
                            <hr style={{ border: "1px dashed black" }} />
                          ) : null}

                          {/* </div> */}
                          <p className="total">Total: {totalPrice}</p>
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
                            {" "}
                            Back{" "}
                          </Button>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <Row className="shadow bg-white rounded">
                          <Button
                            onClick={handleNextTab}
                            color="warning"
                            className="bg-gradient"
                          >
                            {" "}
                            Continue{" "}
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

export default withRouter(Booking);

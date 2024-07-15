import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import classnames from "classnames";
import { shoppingCart } from "../../../Components/Common/ecommerce";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { message } from "antd";
import {
  getBookingTime,
  ApplyVoucher,
  getPaymentVnpayMethods,
  getPaymentResult,
} from "../../../slices/home/bookingHome/thunk";
import { getHomeWaterCorn } from "../../../slices/home/Watercorn/thunk";
import withRouter from "../../../Components/Common/withRouter";
import { clearNotification } from "../../../slices/message/reducer";

const Booking = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const BookingState = (state) => state;
  const BookingStateData = createSelector(BookingState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    data: state.HomeBooking.bookingitem,
    voucher: state.HomeBooking.voucher,
    WaterCornData: state.HomeWaterCorn.WaterCorn,
  }));
  const { error, messageError, data, WaterCornData, voucher } =
    useSelector(BookingStateData);

  const calculateDiscount = (price) => {
    if (voucher && voucher.discountType === "PERCENTAGE") {
      let discount = (price * voucher.discountValue) / 100;

      if (discount > voucher.maxDiscount) {
        discount = voucher.maxDiscount;
      }

      return discount;
    } else if (voucher && voucher.discountType === "FIXED") {
      return voucher.discountValue;
    } else {
      return 0;
    }
  };

  const [activeTab, setactiveTab] = useState(1);

  const [addedItemIds, setAddedItemIds] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [singleSeats, setSingleSeats] = useState([]);
  const [doubleSeats, setDoubleSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  const totalPriceRef = useRef(
    voucher ? totalPrice - calculateDiscount(totalPrice) : totalPrice
  );

  useEffect(() => {
    totalPriceRef.current = voucher
      ? totalPrice - calculateDiscount(totalPrice)
      : totalPrice;
  }, [totalPrice, voucher]);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

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

  const handleChooseSeat = (seat, isDouble) => {
    const price = isDouble ? data?.price * 2 * 1.05 : data?.price;

    setSelectedSeats((prevSeats) => {
      let newTotalPrice = totalPrice;
      let newSelectedSeats;

      if (prevSeats.includes(seat)) {
        newTotalPrice -= price;
        newSelectedSeats = prevSeats.filter((s) => s !== seat);
      } else if (prevSeats.length < 8) {
        newTotalPrice += price;
        newSelectedSeats = [...prevSeats, seat];
      } else {
        message.error("Maximum number of 8 seats exceeded!");
        return prevSeats;
      }

      setTotalPrice(newTotalPrice);
      return newSelectedSeats;
    });

    if (isDouble) {
      setDoubleSeats((prevSeats) => {
        let newDoubleSeats;
        if (prevSeats.includes(seat)) {
          newDoubleSeats = prevSeats.filter((s) => s !== seat);
        } else if (prevSeats.length + singleSeats.length < 8) {
          newDoubleSeats = [...prevSeats, seat];
        } else {
          return prevSeats;
        }

        return newDoubleSeats;
      });
    } else {
      setSingleSeats((prevSeats) => {
        let newSingleSeats;
        if (prevSeats.includes(seat)) {
          newSingleSeats = prevSeats.filter((s) => s !== seat);
        } else if (prevSeats.length + doubleSeats.length < 8) {
          newSingleSeats = [...prevSeats, seat];
        } else {
          return prevSeats;
        }

        return newSingleSeats;
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

  function handlePrevTab() {
    if (activeTab > 1) {
      setactiveTab(activeTab - 1);
    }
  }

  function handleNextTab() {
    if (activeTab === 1) {
      selectedSeats.length > 0
        ? setactiveTab(activeTab + 1)
        : message.warning("Please select at least one seat!");
    }
    if (activeTab === 2) {
      setactiveTab(activeTab + 1);
    }

    if (activeTab === 3) {
      message.warning("Please select payment method!");
    }
  }

  const countUP = (id, itemName, itemPrice) => {
    setAddedItemIds((prevAddedItemIds) => {
      const updatedAddedItemIds = { ...prevAddedItemIds };

      if (updatedAddedItemIds[id]) {
        updatedAddedItemIds[id].quantity += 1;
      } else {
        updatedAddedItemIds[id] = {
          id: id,
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

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const applyPromoCode = () => {
    const formData = new FormData();
    formData.append("code", promoCode);

    dispatch(ApplyVoucher(formData, props.router.navigate));
  };

  const initialOptions = {
    clientId:
      "AdjeY1YkcgIWMTbos5WNR6jUkJvsq-u-noGd5XkxcfOihm7HtY9CeV4usR3jTXFPaaCFr180mKmn79G_",
    currency: "USD",
    intent: "capture",
  };

  const conversionRate = 23000;
  const onCreateOrder = (data, actions) => {
    // const totalPriceInUSD = (totalPrice / conversionRate).toFixed(2);
    // if (totalPriceInUSD <= 0) {
    //   console.error("Total price must be greater than zero");
    //   return;
    // }
    const currentTotalPrice = totalPriceRef.current;
    const totalPriceInUSD = (currentTotalPrice / conversionRate).toFixed(2);
    // console.log("Current total price ", totalPriceInUSD);

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPriceInUSD,
            currency_code: "USD",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const transaction = details.purchase_units[0].payments.captures[0];
      postTransactionToBackend(transaction, data);
    });
  };

  const singleSeatsRef = useRef([]);
  const doubleSeatsRef = useRef([]);
  const showtimeIdRef = useRef("");
  const promoCodeRef = useRef("");
  const addedItemIdsRef = useRef("");
  useEffect(() => {
    if (data) {
      showtimeIdRef.current = data.id;
    }
    if (singleSeats) {
      singleSeatsRef.current = singleSeats;
    }
    if (doubleSeats) {
      doubleSeatsRef.current = doubleSeats;
    }
    if (promoCode) {
      promoCodeRef.current = voucher.id;
    }
    if (addedItemIds) {
      addedItemIdsRef.current = addedItemIds;
    }
  }, [data, singleSeats, doubleSeats, promoCode, addedItemIds, voucher]);

  const handleSubmitVnpay = () => {
    const currentTotalPrice = totalPriceRef.current;
    const currentSingleSeats = singleSeatsRef.current;
    const currentDoubleSeats = doubleSeatsRef.current;
    const currentPromoCode = promoCodeRef.current;
    const showtimeId = showtimeIdRef.current;

    const formData = new FormData();
    formData.append("orderId", data.orderID);
    formData.append("paymentId", data.paymentID);
    formData.append("totalPrice", currentTotalPrice);
    if (currentDoubleSeats) {
      currentDoubleSeats.forEach((item, index) => {
        formData.append(`quantityDoubleSeat[${index}]`, item);
      });
    }
    if (currentSingleSeats) {
      currentSingleSeats.forEach((item, index) => {
        formData.append(`quantitySeat[${index}]`, item);
      });
    }
    formData.append("showtimeId", showtimeId);

    if (
      addedItemIdsRef.current &&
      typeof addedItemIdsRef.current === "object"
    ) {
      Object.values(addedItemIdsRef.current).forEach((item, index) => {
        formData.append(`quantityWater[${index}].id`, item.id);
        formData.append(`quantityWater[${index}].quantity`, item.quantity);
      });
    }

    if (currentPromoCode) {
      formData.append("voucherId", currentPromoCode);
    }

    dispatch(getPaymentVnpayMethods(formData));
  };

  const postTransactionToBackend = (transaction, data) => {
    const currentTotalPrice = totalPriceRef.current;
    const currentSingleSeats = singleSeatsRef.current;
    const currentDoubleSeats = doubleSeatsRef.current;
    const currentPromoCode = promoCodeRef.current;
    const showtimeId = showtimeIdRef.current;

    const formData = new FormData();
    formData.append("orderId", data.orderID);
    formData.append("paymentId", data.paymentID);
    formData.append("totalPrice", currentTotalPrice);
    if (currentDoubleSeats) {
      currentDoubleSeats.forEach((item) => {
        formData.append("quantityDoubleSeat", item);
      });
    }
    if (currentSingleSeats) {
      currentSingleSeats.forEach((item) => {
        formData.append("quantitySeat", item);
      });
    }
    formData.append("showtimeId", showtimeId);

    if (
      addedItemIdsRef.current &&
      typeof addedItemIdsRef.current === "object"
    ) {
      Object.values(addedItemIdsRef.current).forEach((item, index) => {
        formData.append(`quantityWater[${index}].id`, item.id);
        formData.append(`quantityWater[${index}].quantity`, item.quantity);
      });
    }

    if (currentPromoCode) {
      formData.append("voucherId", currentPromoCode);
    }

    dispatch(getPaymentResult(formData, props.router.navigate));
  };

  const onError = (err) => {
    console.error("PayPal error:", err);
    // Handle the error
  };

  document.title = `booking ${data?.movieName}` || "Booking";

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
                                        <Col
                                          md={10}
                                          className="d-flex flex-wrap"
                                        >
                                          {item.times
                                            ? item.times.map(
                                                (timeItem, timeIndex) => (
                                                  <div
                                                    key={timeIndex}
                                                    onClick={() => {
                                                      handleChangeShowtime(
                                                        timeItem.idRoom
                                                      );
                                                    }}
                                                  >
                                                    <button
                                                      className={classnames({
                                                        "btn btn-primary me-2 mb-2":
                                                          timeItem.idRoom ==
                                                          data.id,
                                                        "btn btn-outline-primary me-2 mb-2":
                                                          timeItem.idRoom !=
                                                          data.id,
                                                      })}
                                                    >
                                                      {formatTime(
                                                        timeItem.time
                                                      )}
                                                    </button>
                                                  </div>
                                                )
                                              )
                                            : null}
                                        </Col>
                                      </Row>
                                    ))
                                  : null}
                              </Row>
                            </Col>
                          </Row>
                          <Row
                            className="mt-4 rounded-3 shadow-lg p-3 mb-5 bg-white rounded"
                            style={{ backgroundColor: "white", padding: 20 }}
                          >
                            <Row>
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
                            </Row>
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
                          </Row>
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
                              Promotion
                            </h2>
                            <div
                              className="promo-code-order"
                              style={{ width: 400 }}
                            >
                              <input
                                type="text"
                                value={promoCode}
                                onChange={handlePromoCodeChange}
                                placeholder="Promotional code"
                              />
                              <button
                                className="button-order"
                                onClick={applyPromoCode}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                          <div className="container-order">
                            <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
                              Payment methods
                            </h2>
                            <Row className="payment-methods-order">
                              <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                  style={{ layout: "horizontal" }}
                                  createOrder={(data, actions) =>
                                    onCreateOrder(data, actions)
                                  }
                                  onApprove={(data, actions) =>
                                    onApprove(data, actions)
                                  }
                                  onError={(err) => onError(err)}
                                />
                              </PayPalScriptProvider>
                              <button
                                style={{
                                  backgroundColor: "#ff5a00",
                                  color: "white",
                                  padding: "15px 20px",
                                  border: "none",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  fontSize: "16px",
                                }}
                                onClick={handleSubmitVnpay}
                              >
                                Pay with VNPay
                              </button>
                            </Row>
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
                              <Row className="mb-3">
                                <Col md={6}>
                                  {doubleSeats.length}x Double Seats:
                                </Col>
                                <Col md={6}>
                                  <p className="total">
                                    {doubleSeats.length *
                                      (data.price * 2 * 1.05)}{" "}
                                    USD
                                  </p>
                                </Col>
                                <Col md={12}>
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
                                <Col md={6}>
                                  {singleSeats.length}x Single Seats:
                                </Col>
                                <Col md={6}>
                                  <p className="total">
                                    {singleSeats.length * data.price} USD
                                  </p>
                                </Col>
                                <Col md={12}>
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
                          {voucher && voucher.discountType ? (
                            <Row>
                              <Col md={6}>
                                <p>Voucher Discount:</p>
                              </Col>
                              <Col md={6}>
                                <p className="total">
                                  -{" "}
                                  {voucher.discountType === "PERCENTAGE"
                                    ? `(${
                                        voucher.discountValue
                                      }%) ${calculateDiscount(totalPrice)} USD`
                                    : `${calculateDiscount(totalPrice)} USD`}
                                </p>
                              </Col>
                            </Row>
                          ) : null}

                          {voucher && voucher.discountType ? (
                            <hr style={{ border: "1px dashed black" }} />
                          ) : null}
                          {/* </div> */}
                          {/* <p className="total">Total: {" "}{totalPrice}</p> */}
                          <p className="total">
                            Total:{" "}
                            {voucher
                              ? `${totalPrice - calculateDiscount(totalPrice)}`
                              : { totalPrice }}
                          </p>
                        </div>
                      </CardBody>
                    </Card>
                    <Row className="align-items-center mt-4 mb-2">
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
    </React.Fragment>
  );
};

export default withRouter(Booking);

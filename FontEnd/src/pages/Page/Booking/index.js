import React, { useState } from "react";
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
} from "reactstrap";

import classnames from "classnames";
import { shoppingCart } from "../../../Components/Common/ecommerce";

const checkOut = () => {
  const [activeTab, setactiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [modal, setModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [productList, setproductList] = useState(shoppingCart);
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

  document.title = "Order";

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
                        <span>Chọn phim / Rạp / Suất</span>
                      </div>
                      <div
                        className={`step-item -order-2 ${
                          activeTab >= 2 ? "done" : ""
                        } ${activeTab === 2 ? "active" : ""}`}
                      >
                        <span>Chọn ghế</span>
                      </div>
                      <div
                        className={`step-item -order-3 ${
                          activeTab >= 3 ? "done" : ""
                        } ${activeTab === 3 ? "active" : ""}`}
                      >
                        <span>Chọn thức ăn</span>
                      </div>
                      <div
                        className={`step-item -order-4 ${
                          activeTab >= 4 ? "done" : ""
                        } ${activeTab === 4 ? "active" : ""}`}
                      >
                        <span>Thanh toán</span>
                      </div>
                      <div
                        className={`step-item -order-5 ${
                          activeTab >= 5 ? "done" : ""
                        } ${activeTab === 5 ? "active" : ""}`}
                      >
                        <span>Xác nhận</span>
                      </div>
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
                              Đổi Suất Chiếu
                            </span>
                            <div className="btn-group-order" role="group">
                              <button className="btn btn-outline-primary">
                                13:15
                              </button>
                              <button className="btn btn-primary">15:15</button>
                              <button className="btn btn-outline-primary">
                                17:15
                              </button>
                              <button className="btn btn-outline-primary">
                                18:30
                              </button>
                            </div>
                          </div>
                          <div
                            className=""
                            style={{ backgroundColor: "white", padding: 20 }}
                          >
                            <div>
                              <table>
                                <tbody>ghế</tbody>
                              </table>
                            </div>
                            <div className="screen-title-order">
                              <span className="span-order">màn hình</span>
                              <hr className="hr-order" />
                            </div>
                            <div className="seat-legend">
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
                            </div>
                          </div>
                        </div>
                      </TabPane>

                      <TabPane tabId={2}>
                        {productList.map((cartItem, key) => (
                          <React.Fragment key={cartItem.id}>
                            <Card className="product mb-3">
                              <CardBody>
                                <Row className="gy-3">
                                  <div className="col-sm-auto">
                                    <div className="avatar-lg bg-light rounded p-1">
                                      <img
                                        src={cartItem.img}
                                        alt=""
                                        className="img-fluid d-block"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm">
                                    <h5 className="fs-14 text-truncate">
                                      <Link
                                        to="/ecommerce-product-detail"
                                        className="text-body"
                                      >
                                        {cartItem.name}
                                      </Link>
                                    </h5>
                                    <ul className="list-inline text-muted">
                                      <li className="list-inline-item">
                                        Color :{" "}
                                        <span className="fw-medium">
                                          {cartItem.color}
                                        </span>
                                      </li>
                                      <li className="list-inline-item">
                                        Size :{" "}
                                        <span className="fw-medium">
                                          {cartItem.size}
                                        </span>
                                      </li>
                                    </ul>

                                    <div className="input-step">
                                      <button
                                        type="button"
                                        className="minus material-shadow"
                                        onClick={() => {
                                          countDown(
                                            cartItem.id,
                                            cartItem.data_attr,
                                            cartItem.price
                                          );
                                        }}
                                      >
                                        –
                                      </button>
                                      <Input
                                        type="text"
                                        className="product-quantity"
                                        value={cartItem.data_attr}
                                        name="demo_vertical"
                                        readOnly
                                      />
                                      <button
                                        type="button"
                                        className="plus material-shadow"
                                        onClick={() => {
                                          countUP(
                                            cartItem.id,
                                            cartItem.data_attr,
                                            cartItem.price
                                          );
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-sm-auto">
                                    <div className="text-lg-end">
                                      <p className="text-muted mb-1">
                                        Item Price:
                                      </p>
                                      <h5 className="fs-14">
                                        $
                                        <span
                                          id="ticket_price"
                                          className="product-price"
                                        >
                                          {cartItem.price}
                                        </span>
                                      </h5>
                                    </div>
                                  </div>
                                </Row>
                              </CardBody>
                            </Card>
                          </React.Fragment>
                        ))}
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

                      <TabPane tabId={4} id="pills-finish">
                        <div
                          className="text-center py-5"
                          style={{ backgroundColor: "white" }}
                        >
                          <div className="mb-4">
                            <i
                              className="bx bxs-check-circle"
                              style={{ fontSize: "120px", color: "green" }}
                            ></i>
                          </div>
                          <h5>Thank you ! Your Order is Completed !</h5>
                          <p className="text-muted">
                            You will receive an order confirmation email with
                            details of your order.
                          </p>

                          <h3 className="fw-semibold">
                            Order ID:{" "}
                            <a
                              href="apps-ecommerce-order-details"
                              className="text-decoration-underline"
                            >
                              VZ2451
                            </a>
                          </h3>
                        </div>
                      </TabPane>
                    </TabContent>
                  </Col>
                  <Col xl={4}>
                    <Card>
                      <CardBody className="card-body-order">
                        <div className="image-description">
                          <div className="image-info">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkk96j-MG-Z72sqHopPg92OTAVspYk5VwJQ&s"
                              alt="Rạp"
                            />
                          </div>
                          <div>
                            <div className="movie-title">
                              Những Mảnh Ghép Cảm Xúc 2
                            </div>
                            <div className="movie-info">
                              <p>2D Lồng Tiếng </p>
                            </div>
                          </div>
                        </div>
                        <div className="detailed-info">
                          <div className="movie-info">
                            <p>
                              <strong>Rạp:</strong> Galaxy Nha Trang Center -
                              RAP 1
                            </p>
                            <p>
                              <strong>Suất chiếu:</strong> 12:00 - Thứ Tư,
                              26/06/2024
                            </p>
                          </div>
                          <hr style={{ border: "1px dashed black" }} />
                          <div className="price-info">
                            <p>1x Người Lớn - Member</p>
                            <p>60.000 đ</p>
                          </div>
                          <div className="price-info">
                            <p>Ghế: J8</p>
                          </div>
                          <div className="price-info">
                            <p>1x iCombo 1 Big Extra STD</p>
                            <p>99.000 đ</p>
                          </div>
                          <hr style={{ border: "1px dashed black" }} />
                          <p className="total">Tổng Cộng: 159.000 đ</p>
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

export default checkOut;

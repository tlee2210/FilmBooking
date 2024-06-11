import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Order/css/order.css';
import {
    Container,
    Form,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Input,
} from 'reactstrap';


import classnames from "classnames";
import { shoppingCart } from '../../../Components/Common/ecommerce';

const checkOut = () => {
    const [selectedCountry, setselectedCountry] = useState(null);
    const [selectedState, setselectedState] = useState(null);
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
        if (passedSteps.includes(activeTab)) {
            setactiveTab(activeTab + 1);
            setPassedSteps([...passedSteps, activeTab + 1]);
        }
    }

    function countUP(id, prev_data_attr, itemPrice) {
        setproductList(
            productList.map((p) =>
                p.id === id ? { ...p, data_attr: prev_data_attr + 1, total: (prev_data_attr + 1) * itemPrice } : p
            )
        );
    }

    function countDown(id, prev_data_attr, itemPrice) {
        setproductList(
            productList.map((p) =>
                (p.id === id && p.data_attr > 0) ? { ...p, data_attr: prev_data_attr - 1, total: (prev_data_attr - 1) * itemPrice } : p
            )
        );
    }

    document.title = "Order";

    return (
        <React.Fragment>
            <div style={{ backgroundColor: '#e9e9e9' }}>
                <div style={{ paddingTop: 100 }}>
                    <Col xl="12">
                        <Card>
                            <CardBody className="checkout-tab">
                                <Form action="#">
                                    <div className="step-arrow-nav">
                                        <Nav
                                            className="nav-pills nav-justified custom-nav"
                                            role="tablist"
                                        >
                                            <NavItem role="presentation">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: activeTab === 1, done: activeTab >= 1 }, "p-3 fs-15")}
                                                    onClick={() => { passedSteps.includes(1) && toggleTab(1); }}
                                                >
                                                    <i className="ri-user-2-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                                                    Chọn Phim / Rạp / Suất / Ghế
                                                </NavLink>
                                            </NavItem>
                                            <NavItem role="presentation">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: activeTab === 2, done: activeTab >= 2 }, "p-3 fs-15")}
                                                    onClick={() => { passedSteps.includes(2) && toggleTab(2); }}
                                                >
                                                    <i className="ri-truck-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"> </i>
                                                    Chọn Thức Ăn
                                                </NavLink>
                                            </NavItem>
                                            <NavItem role="presentation">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: activeTab === 3, done: activeTab >= 3 }, "p-3 fs-15")}
                                                    onClick={() => { passedSteps.includes(3) && toggleTab(3); }}
                                                >
                                                    <i className="ri-bank-card-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"> </i>
                                                    Thanh Toán
                                                </NavLink>
                                            </NavItem>
                                            <NavItem role="presentation">
                                                <NavLink
                                                    href="#"
                                                    className={classnames({ active: activeTab === 4, done: activeTab >= 4 }, "p-3 fs-15")}
                                                    onClick={() => { passedSteps.includes(4) && toggleTab(4); }}
                                                >
                                                    <i className="ri-checkbox-circle-line fs-16 p-2 bg-primary-subtle text-primary rounded-circle align-middle me-2"></i>
                                                    Xác Nhận
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
                <Container >
                    <div style={{ paddingTop: 30, paddingBottom: 50 }} className="page-content">
                        <Container fluid>
                            <Row>
                                <Row className='gx-3'>
                                    <Col xl={8}>
                                        <TabContent activeTab={activeTab}>
                                            <TabPane tabId={1}>
                                                <div>
                                                    {/* Seat Selection Content */}
                                                    <div className="btn-group-order" style={{ backgroundColor: 'white', padding: 20 }}>
                                                        <span className="showtime-title-order">Đổi Suất Chiếu</span>
                                                        <div className="btn-group-order" role="group">
                                                            <button className="btn btn-outline-primary">13:15</button>
                                                            <button className="btn btn-primary">15:15</button>
                                                            <button className="btn btn-outline-primary">17:15</button>
                                                            <button className="btn btn-outline-primary">18:30</button>
                                                        </div>
                                                    </div>
                                                    <div className="" style={{ backgroundColor: 'white', padding: 20 }}>
                                                        <div>
                                                            <table>
                                                                <tbody>
                                                                    <tr><td>I</td>{[...Array(8)].map((_, i) => <td key={i} className="sold-seat">{i + 1}</td>)}</tr>
                                                                    <tr><td>H</td>{[...Array(8)].map((_, i) => <td key={i} className="sold-seat">{i + 1}</td>)}</tr>
                                                                    <tr><td>G</td>{[...Array(8)].map((_, i) => <td key={i} className="sold-seat">{i + 1}</td>)}</tr>
                                                                    <tr><td>F</td>{[...Array(8)].map((_, i) => <td key={i} className="sold-seat">{i + 1}</td>)}</tr>
                                                                    <tr><td>E</td>{[...Array(8)].map((_, i) => <td key={i} className="sold-seat">{i + 1}</td>)}</tr>
                                                                    <tr><td>D</td>{[...Array(9)].map((_, i) => <td key={i} className={i === 2 ? 'selected-seat' : 'sold-seat'}>{i + 1}</td>)}</tr>
                                                                    <tr><td>C</td>{[...Array(9)].map((_, i) => <td key={i} className={i === 2 ? 'selected-seat' : 'sold-seat'}>{i + 1}</td>)}</tr>
                                                                    <tr><td>B</td>{[...Array(9)].map((_, i) => <td key={i} className={i === 2 ? 'selected-seat' : 'sold-seat'}>{i + 1}</td>)}</tr>
                                                                    <tr><td>A</td>{[...Array(9)].map((_, i) => <td key={i} className={i === 2 ? 'selected-seat' : 'sold-seat'}>{i + 1}</td>)}</tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="screen-title-order">
                                                            <span className='span-order'>màn hình</span>
                                                            <hr className='hr-order' />
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
                                                                                <span className="fw-medium">{cartItem.size}</span>
                                                                            </li>
                                                                        </ul>

                                                                        <div className="input-step">
                                                                            <button
                                                                                type="button"
                                                                                className="minus material-shadow"
                                                                                onClick={() => {
                                                                                    countDown(cartItem.id, cartItem.data_attr, cartItem.price);
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
                                                                                    countUP(cartItem.id, cartItem.data_attr, cartItem.price);
                                                                                }}
                                                                            >
                                                                                +
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-auto">
                                                                        <div className="text-lg-end">
                                                                            <p className="text-muted mb-1">Item Price:</p>
                                                                            <h5 className="fs-14">
                                                                                $
                                                                                <span id="ticket_price" className="product-price">
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
                                                Tab 3
                                            </TabPane>

                                            <TabPane tabId={4} id="pills-finish">
                                                Tab4
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                    <Col xl={4}>
                                        <Card>
                                            <CardBody>
                                                <div className="image-description">
                                                    <div className="image-info">
                                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkk96j-MG-Z72sqHopPg92OTAVspYk5VwJQ&s" alt="Rạp" width="120" height="180" />
                                                    </div>
                                                    <div className="movie-title">
                                                        <p><strong>Tên Phim:</strong> <span>Tên phim đã chọn</span> </p>
                                                    </div>
                                                    <div className="movie-info">
                                                        <p><strong>Rạp đã chọn:</strong> Tên rạp</p>
                                                        <p><strong>Suất chiếu đã chọn:</strong> Thời gian suất chiếu</p>
                                                        <hr />
                                                        <p className="total">Tổng Cộng</p>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <div className="d-flex align-items-start gap-3 mt-3">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-label left me-auto prevtab"
                                                onClick={handlePrevTab}
                                                disabled={activeTab === 1}
                                            >
                                                <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>
                                                Quay Lại
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-label right ms-auto nexttab"
                                                onClick={handleNextTab}
                                            >
                                                <i className="ri-truck-line label-icon align-middle fs-16 ms-2"></i>
                                                Tiếp Tục
                                            </button>
                                        </div>
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

export default checkOut;


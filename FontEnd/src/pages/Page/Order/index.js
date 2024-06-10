import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../../Components/Common/BreadCrumb';
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
    Modal,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Label,
    Input,
} from 'reactstrap';

import Select from "react-select";
import classnames from "classnames";
import { orderSummary } from "../../../Components/Common/ecommerce";

const checkOut = () => {
    const [selectedCountry, setselectedCountry] = useState(null);
    const [selectedState, setselectedState] = useState(null);
    const [activeTab, setactiveTab] = useState(1);
    const [passedSteps, setPassedSteps] = useState([1]);
    const [modal, setModal] = useState(false);
    const [deletemodal, setDeleteModal] = useState(false);

    function toggleTab(tab) {
        if (tab >= 1 && tab <= 4) {
            setactiveTab(tab);
        }
    }

    // Hàm xử lý nút quay lại
    function handlePrevTab() {
        if (activeTab > 1) {
            setactiveTab(activeTab - 1);
        }
    }

    // Hàm xử lý nút tiếp tục
    function handleNextTab() {
        if (passedSteps.includes(activeTab)) {
            setactiveTab(activeTab + 1);
            setPassedSteps([...passedSteps, activeTab + 1]);
        }
    }


    document.title = "Order";

    return (
        <React.Fragment>
            <Container>
                <div style={{ paddingTop: 100, paddingBottom: 50 }} className="page-content">
                    <Container fluid>
                        <Row>
                            <Col xl="12">
                                <Card>
                                    <CardBody className="checkout-tab">
                                        <Form action="#">
                                            <div className="step-arrow-nav mt-n3 mx-n3 mb-3">
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
                            <Row>
                                <Col xl={8}>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId={1} id="pills-bill-info">
                                            Tab 1
                                        </TabPane>

                                        <TabPane tabId={2}>
                                            Tab 2
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
                                        <CardHeader>
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <h5 className="card-title mb-0">Chi Tiết Vé</h5>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <div className="table-responsive table-card">
                                                <table className="table table-borderless align-middle mb-0">
                                                    {/* Bảng chi tiết */}
                                                </table>
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
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Row>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default checkOut;


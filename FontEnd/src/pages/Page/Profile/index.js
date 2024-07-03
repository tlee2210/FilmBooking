import React, { useState } from 'react';
import './css/Profile.css';
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
const Tabs = ({ selectedTab, onTabChange }) => {
    const tabs = ["Lịch Sử Giao Dịch", "Thông Tin Cá Nhân", "Thông Báo", "Quà Tặng", "Chính Sách"];

    return (
        <ul className="tabs-tai-khoan">
            {tabs.map((tab, index) => (
                <li key={index} className={`tab-item-tai-khoan ${selectedTab === tab ? 'active-tai-khoan' : ''}`} onClick={() => onTabChange(tab)}>
                    {tab}
                </li>
            ))}
        </ul>
    );
};

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState('Thông Tin Cá Nhân');

    return (
        <div className="container-tai-khoan" style={{ paddingTop: 120 }}>
            <div className="profile-wrapper-tai-khoan">
                <div className="profile-card-tai-khoan">
                    <div className="profile-header-tai-khoan">
                        <img src="/path/to/avatar.png" alt="Avatar" className="avatar-tai-khoan" />
                        <div className="profile-info-tai-khoan">
                            <h5 className="profile-name-tai-khoan">quang dai vi</h5>
                            <p className="profile-stars-tai-khoan">0 Stars</p>
                        </div>
                    </div>
                    <div className="spending-info-tai-khoan">
                        <h6 className="spending-title-tai-khoan">Tổng chi tiêu 2024</h6>
                        <p className="spending-amount-tai-khoan">0 đ</p>
                        <div className="spending-scale-tai-khoan">
                            <span>0 đ</span>
                            <span>2.000.000 đ</span>
                            <span>4.000.000 đ</span>
                        </div>
                        <div className="progress-bar-tai-khoan">
                            <div className="progress-fill-tai-khoan" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                    <div className="contact-info-tai-khoan">
                        <p>HOTLINE hỗ trợ: 19002224 (9:00 - 22:00)</p>
                        <p>Email: hotro@galaxystudio.vn</p>
                        <p>Câu hỏi thường gặp</p>
                    </div>
                </div>
                <div className="tabs-container-tai-khoan">
                    <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
                    <div className="tab-content-tai-khoan">
                        {selectedTab === 'Thông Tin Cá Nhân' && (
                            <Form className="form-tai-khoan">
                                <Row form>
                                    <Col md={6} style={{ paddingRight: 12 }}>
                                        <FormGroup>
                                            <Label for="name" className="form-label-tai-khoan">Họ và tên</Label>
                                            <Input type="text" id="name" className="form-control-tai-khoan form-control-disabled" value="quang dai vi" readOnly style={{ cursor: 'not-allowed' }} />
                                        </FormGroup>
                                            <FormGroup>
                                                <Label for="email" className="form-label-tai-khoan">Email</Label>
                                                <Input type="email" id="email" className="form-control-tai-khoan form-control-disabled" value="hayla201567890@gmail.com" readOnly />
                                            </FormGroup>
                                        <FormGroup>
                                            <div className="form-radio-group-tai-khoan" style={{ paddingTop: 20, cursor: 'not-allowed' }}>
                                                <Label className="form-radio-tai-khoan" style={{ cursor: 'not-allowed' }}>
                                                    <Input type="radio" name="gender" value="Nam" disabled checked /> Nam
                                                </Label>
                                                <Label className="form-radio-tai-khoan" style={{ cursor: 'not-allowed' }}>
                                                    <Input type="radio" name="gender" value="Nữ" disabled /> Nữ
                                                </Label>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="dob" className="form-label-tai-khoan">Ngày sinh</Label>
                                            <Input type="text" id="dob" className="form-control-tai-khoan form-control-disabled" value="23/03/2000" readOnly style={{ cursor: 'not-allowed' }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="phone" className="form-label-tai-khoan">Số điện thoại</Label>
                                            <Input type="text" id="phone" className="form-control-tai-khoan form-control-disabled" value="0563828768" readOnly style={{ cursor: 'not-allowed' }} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password" className="form-label-tai-khoan">Mật khẩu</Label>
                                            <Input type="password" id="password" className="form-control-tai-khoan form-control-disabled" value="password" readOnly />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button type="submit" className="form-button-tai-khoan">Cập nhật</Button>
                            </Form>
                        )}

                        {selectedTab === 'Lịch Sử Giao Dịch' && (
                            <div>Lịch Sử Giao Dịch</div>
                        )}

                        {selectedTab === 'Thông Báo' && (
                            <div>Thông Báo</div>
                        )}

                        {selectedTab === 'Quà Tặng' && (
                            <div>Quà Tặng</div>
                        )}

                        {selectedTab === 'Chính Sách' && (
                            <div>Chính Sách</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

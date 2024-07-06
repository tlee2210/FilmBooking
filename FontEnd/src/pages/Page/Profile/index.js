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

const PolicyTabs = ({ selectedPolicyTab, onPolicyTabChange }) => {
    const policyTabs = ["Thể Lệ", "Quyền Lợi", "Hướng Dẫn"];

    return (
        <ul className="policy-tabs">
            {policyTabs.map((tab, index) => (
                <li key={index} className={`policy-tab-item ${selectedPolicyTab === tab ? 'active-policy-tab' : ''}`} onClick={() => onPolicyTabChange(tab)}>
                    {tab}
                </li>
            ))}
        </ul>
    );
};

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState('Thông Tin Cá Nhân');
    const [selectedPolicyTab, setSelectedPolicyTab] = useState('Thể Lệ');

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
                            <div className="transaction-history">
                                <h5>Lịch Sử Giao Dịch</h5>
                                <p>Lưu ý: chỉ hiển thị 20 giao dịch gần nhất</p>
                                <div className="transaction-month">Tháng 05/2022</div>
                                <div className="transaction">
                                    <div className="transaction-image">
                                        <img src="https://www.galaxycine.vn/media/2019/4/10/640wx396h_1554864314405.jpg" alt="Movie" />
                                    </div>
                                    <div className="transaction-details">
                                        <div className="transaction-info-left">
                                            <p style={{ fontWeight: 'bold' }}>Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn</p>
                                            <p>2D Phụ Đề <span className="age-restriction">T13</span></p>
                                        </div>
                                        <div className="transaction-info-right">
                                            <p>Galaxy Kinh Dương Vương</p>
                                            <p><span style={{ fontWeight: 'bold' }}>21:15</span> - Thứ Hai,<span style={{ fontWeight: 'bold' }}>09/05/2022</span> </p>
                                        </div>
                                    </div>
                                    <div className="transaction-action">
                                        <a href="#">Chi tiết</a>
                                    </div>
                                </div>
                                <div className="transaction-month">Tháng 01/2021</div>
                                <div className="transaction">
                                    <div className="transaction-image">
                                        <img src="https://www.galaxycine.vn/media/2019/4/10/640wx396h_1554864314405.jpg" alt="Movie" />
                                    </div>
                                    <div className="transaction-details">
                                        <div className="transaction-info-left">
                                            <p style={{ fontWeight: 'bold' }}>Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn</p>
                                            <p>2D Phụ Đề <span className="age-restriction">T13</span></p>
                                        </div>
                                        <div className="transaction-info-right">
                                            <p>Galaxy Kinh Dương Vương</p>
                                            <p><span style={{ fontWeight: 'bold' }}>21:15</span> - Thứ Hai,<span style={{ fontWeight: 'bold' }}>09/05/2022</span> </p>
                                        </div>
                                    </div>
                                    <div className="transaction-action">
                                        <a href="#">Chi tiết</a>
                                    </div>
                                </div>

                            </div>
                        )}

                        {selectedTab === 'Thông Báo' && (
                            <div>Thông Báo</div>
                        )}

                        {selectedTab === 'Quà Tặng' && (
                            <div>Quà Tặng</div>
                        )}

                        {selectedTab === 'Chính Sách' && (
                            <div>
                                <PolicyTabs selectedPolicyTab={selectedPolicyTab} onPolicyTabChange={setSelectedPolicyTab} />
                                <div className="policy-tab-content">
                                    {selectedPolicyTab === 'Thể Lệ' && (
                                        <div>
                                            <h5>Thể Lệ</h5>
                                            <p>
                                                Chương trình khách hàng thân thiết Galaxy là chương trình ưu đãi dựa trên điểm tích lũy của các thành viên gồm Star, G-star, X-star. Với mỗi giao dịch tại hệ thống rạp Galaxy, bạn sẽ nhận được điểm thưởng tương ứng. Hình thức tích lũy như sau:
                                            </p>
                                            <ul>
                                                <li><b>Star:</b> Tích lũy ở mức 3% trên tổng giá trị/số tiền giao dịch</li>
                                                <li><b>G-Star:</b> Tích lũy ở mức 5% trên tổng giá trị/số tiền giao dịch</li>
                                                <li><b>X-Star:</b> Tích lũy ở mức 10% trên tổng giá trị/số tiền giao dịch</li>
                                            </ul>
                                            <p>
                                                Điểm tích lũy được gọi là Stars
                                            </p>
                                            <p>
                                                Ví dụ: Khách hàng là thành viên hạng Star, khi phát sinh giao dịch 200.000 đồng, được tích điểm ở mức 3% tương đương 6 Stars (6 Điểm)
                                            </p>
                                            <h6>Cách làm tròn điểm thưởng như sau:</h6>
                                            <ul>
                                                <li>Từ 0.1 đến 0.4: làm tròn xuống (Ví dụ: 3.2 điểm sẽ được tích vào tài khoản 3 điểm)</li>
                                                <li>Từ 0.5 đến 0.9: làm tròn lên (Ví dụ: 3.5 điểm sẽ được tích vào tài khoản 4 điểm)</li>
                                            </ul>
                                            <p>1 điểm tích lũy sẽ được quy đổi thành 1.000 đồng để sử dụng cho việc thanh toán vé/bắp nước tại hệ thống Galaxy Cinema. Điểm tích lũy không có giá trị quy đổi thành tiền mặt hoặc hoàn lại khi giao dịch đã được ghi nhận thành công.</p>
                                            <h6>Cấp độ thành viên:</h6>
                                            <ul>
                                                <li>Star: Tổng chi tiêu từ 0 - 2.000.000 đồng</li>
                                                <li>G-Star: Tổng chi tiêu từ 2.000.000 đồng - 4.000.000 đồng</li>
                                                <li>X-Star: Tổng chi tiêu từ 4.000.000 đồng trở lên</li>
                                            </ul>
                                        </div>
                                    )}

                                    {selectedPolicyTab === 'Quyền Lợi' && (
                                        <div>
                                            <h5>Quyền Lợi</h5>
                                            <p>
                                                Quyền lợi chính:
                                            </p>
                                            <img src="/path/to/quyenloi_image.png" alt="Quyền Lợi Thành Viên Galaxy Cinema 2023" />
                                            <ul>
                                                <li>Combo U22 sẽ được tích lũy điểm ở mức 3% cho mọi hạng thành viên.</li>
                                                <li>Quà tặng sinh nhật (combo 2, vé xem phim 2D dành cho thành viên hạng G-Star, X-Star) được thả vào tài khoản thành viên & có giá trị sử dụng hiệu lực trong tháng sinh nhật thành viên. Thành viên phải có ít nhất 1 giao dịch (vé/bắp nước) với chi tiêu 0 trong vòng 12 tháng trở lại.</li>
                                                <li>Vé 2D tặng tháng sinh nhật cho thành viên VIP (G-Star, X-Star) có hiệu lực sử dụng trong tháng sinh nhật thành viên hợp lệ.</li>
                                                <li>Vé 2D tặng nâng hạng thành viên có hiệu lực 04 tháng kể từ khi thành viên được nâng hạng.</li>
                                                <li>Trường hợp hạng thẻ thành viên hạng từ G-Star lên X-Star trong cùng năm 2023, số vé 2D được tặng tối đa là 04 vé.</li>
                                            </ul>
                                        </div>
                                    )}

                                    {selectedPolicyTab === 'Hướng Dẫn' && (
                                        <div>
                                            <h5>Hướng Dẫn</h5>
                                            <h6>Tải mobile app:</h6>
                                            <ul>
                                                <li><a href="https://bit.ly/2N6LjJx" target="_blank" rel="noopener noreferrer">App Android</a></li>
                                                <li><a href="https://apple.co/2JA4sDl" target="_blank" rel="noopener noreferrer">App iOS</a></li>
                                                <li>Scan QR để tải app:</li>
                                            </ul>
                                            <img src="/path/to/qr_code.png" alt="QR Code" />
                                            <h6>Hướng dẫn tích lũy điểm:</h6>
                                            <p>
                                                Thành viên mua bất kỳ sản phẩm đang được bán tại các rạp Galaxy Cinema trên toàn quốc hoặc thanh toán trực tuyến sẽ được tích lũy điểm thưởng tương ứng vào tài khoản.
                                            </p>
                                            <p>
                                                Áp dụng với tất cả sản phẩm: vé xem phim, nước uống, thức ăn, combo ...
                                            </p>
                                            <p>
                                                <b>Lưu ý:</b> Đối với những giao dịch trực tuyến, thành viên phải đăng nhập vào tài khoản mới được quyền tích điểm hợp lệ.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

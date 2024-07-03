import React from 'react';
import './css/Event.css';
import { Col, Container, Row } from 'reactstrap';
import RightColumn from "../CinemaCorner/RightColumn";
import "../CinemaCorner/css/CinemaCorner.css";

const MovieClassification = () => {

    const relatedNews = [
        {
            id: 1,
            title: "Khởi Động “Giải Đua Mùa Hè” GalaXummer 2024",
            image: "https://cdn.galaxycine.vn/media/2024/6/27/500_1719459554323.jpg",
        },
        {
            id: 2,
            title: "Cine Với Cạ Cứng - Tụ Tập Vui “Cóa Chời”",
            image: "https://cdn.galaxycine.vn/media/2024/5/24/500_1716521540457.jpg",
        },
        {
            id: 3,
            title: "Xem Phim Hay - Ngất Ngây Cùng Bánh Phồng Đề Rec Rec",
            image: "https://cdn.galaxycine.vn/media/2024/4/2/500_1712051408911.jpg",
        },
        {
            id: 4,
            title: "Happy Day - Vé Chỉ Từ 50K",
            image: "https://cdn.galaxycine.vn/media/2024/4/16/500_1713257519345.jpg",
        },
    ];

    return (
        <Container style={{ paddingTop: 100, paddingBottom: 50 }}>
            <Row>
                <Col lg={8}>
                    <div className="container-eventDetails">
                        <h1 className="title-eventDetails">Tiêu Chí Phân Loại Phim Theo Lứa Tuổi</h1>
                        <div className="social-eventDetails">
                            <button className="button-eventDetails">Thích</button>
                            <button className="button-eventDetails">Chia sẻ</button>
                        </div>
                        <p className="paragraph-eventDetails">
                            Theo thông tư số 05/2022/QH15, áp dụng từ: 01/01/2023, Bảng tiêu chí phân loại phổ biến phim theo độ tuổi của Cục Điện Ảnh như sau:
                        </p>
                        <ul className="list-eventDetails">
                            <li className="list-item-eventDetails"><b>P:</b> Phim phổ biến đến người xem ở mọi độ tuổi</li>
                            <li className="list-item-eventDetails"><b>K:</b> Phim phổ biến đến người xem dưới 13 tuổi với điều kiện xem cùng cha, mẹ hoặc người giám hộ</li>
                            <li className="list-item-eventDetails"><b>T13:</b> Cấm khán giả dưới 13 tuổi</li>
                            <li className="list-item-eventDetails"><b>T16:</b> Cấm khán giả dưới 16 tuổi</li>
                            <li className="list-item-eventDetails"><b>T18:</b> Cấm khán giả dưới 18 tuổi</li>
                        </ul>
                        <div className="image-container-eventDetails">
                            <img src="https://www.galaxycine.vn/media/2023/5/23/quy-dinh-do-tuoi-digital-1135x660_1684835353460.jpg" alt="Phân loại phim theo độ tuổi" className="image-eventDetails" />
                        </div>
                        <div className="notes-eventDetails">
                            <p><b>Lưu ý:</b></p>
                            <ul className="notes-list-eventDetails">
                                <li>Với các khách hàng mua vé online qua app Galaxy Cinema, vui lòng update app mới của Galaxy Cinema tại <a href="#">ĐÂY</a></li>
                                <li>Đối với các phim T13, T16, T18, khách hàng vui lòng xuất trình giấy tờ tuỳ thân có dán ảnh (thẻ học sinh, CMND,...) trước khi mua vé.</li>
                                <li>Đối với phim K, khách hàng dưới 13 tuổi vui lòng có cha, mẹ, người giám hộ đi kèm.</li>
                                <li>Khách hàng vui lòng chứng thực được độ tuổi phù hợp với phim được phân loại như trên.</li>
                                <li>Galaxy Cinema có quyền từ chối việc bán vé hoặc vào phòng chiếu nếu khách hàng không tuân thủ đúng theo quy định.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="related-news-eventDetails">
                        <Col md="3" className="d-flex align-items-center" style={{width:250}}>
                            <div className="title-icon-cinemaCorner"></div>
                            <h2 className="title-cinemaCorner">TIN LIÊN QUAN</h2>
                        </Col>
                        <Row style={{paddingTop:10}}>
                            {relatedNews.map((news) => (
                                <Col md={3} key={news.id} className="related-news-item-eventDetails gx-2 gy-2">
                                    <img src={news.image} alt={news.title} className="related-news-image-eventDetails" />
                                    <p className="related-news-title-eventDetails">{news.title}</p>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                <Col lg={4}>
                    <RightColumn />
                </Col>
            </Row>
        </Container>

    );
};

export default MovieClassification;

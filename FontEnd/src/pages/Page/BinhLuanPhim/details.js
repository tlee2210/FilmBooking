
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, FormGroup, Button } from 'reactstrap';
import "../CinemaCorner/css/CinemaCorner.css";

import RightColumn from "../CinemaCorner/RightColumn";

// Import Images
// import avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import avatar4 from "../../../assets/images/users/avatar-4.jpg";

const BinhLuanPhimDetails = () => {

    const [selectedMulti, setSelectedMulti] = useState(null);

    const handleMulti = (selectedMulti) => {
        setSelectedMulti(selectedMulti);
    };

    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedTheater, setSelectedTheater] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleMovieChange = (event) => {
        setSelectedMovie(event.target.value);
    };

    const handleTheaterChange = (event) => {
        setSelectedTheater(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const movies = [
        {
            url: '/#',
            alt: 'preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa',
            imageUrl: 'https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg',
            title: '[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa'
        },
        {
            url: '/#',
            alt: 'preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa',
            imageUrl: 'https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg',
            title: '[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa'
        },
        {
            url: '/#',
            alt: 'preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa',
            imageUrl: 'https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg',
            title: '[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa'
        },
        {
            url: '/binh-luan-phim/phim1/',
            alt: 'preview-furiosa-a-mad-max-saga-loi-tu-su-dien-loan-cua-thong-soai-furiosa',
            imageUrl: 'https://cdn.galaxycine.vn/media/2024/5/19/750_1716053499918.jpg',
            title: '[Preview] Furiosa A Mad Max Saga: Lời Tự Sự Điên Loạn Của Thống Soái Furiosa'
        },
    ];

    document.title = "Diễn Viên";


    return (
        <React.Fragment>
            <Container style={{ paddingTop: 100 }}>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col lg={8}>
                                <Row>
                                    <Col md={12}>
                                        <p style={{ fontSize: 26, fontWeight: 'bold' }}>[Review] Furiosa Câu Chuyện Từ Max Điên: Bom Tấn Đỉnh Cao Từ Thương Hiệu Hơn 40 Năm</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <p>Nhắc đến Mad Max, ấn tượng đầu tiên cũng chính là điều đã được nhắc đến ở tựa phim: Max “Điên”.</p>

                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                                alt="Movie Poster"
                                                className="img-fluid"
                                                style={{ width: 600, height: 349, objectFit: 'cover' }}
                                            />
                                        </div>
                                        <p>Nhắc đến Mad Max, ấn tượng đầu tiên cũng chính là điều đã được nhắc đến ở tựa phim: Max “Điên”.</p>

                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                                alt="Movie Poster"
                                                className="img-fluid"
                                                style={{ width: 600, height: 349, objectFit: 'cover' }}
                                            />
                                        </div>
                                        <br />
                                        <p>Nhắc đến Mad Max, ấn tượng đầu tiên cũng chính là điều đã được nhắc đến ở tựa phim: Max “Điên”.</p>

                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                                alt="Movie Poster"
                                                className="img-fluid"
                                                style={{ width: 600, height: 349, objectFit: 'cover' }}
                                            />
                                        </div>
                                        <p>Nhắc đến Mad Max, ấn tượng đầu tiên cũng chính là điều đã được nhắc đến ở tựa phim: Max “Điên”.</p>

                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                                alt="Movie Poster"
                                                className="img-fluid"
                                                style={{ width: 600, height: 349, objectFit: 'cover' }}
                                            />
                                        </div>
                                        <br />
                                        <p>Nhắc đến Mad Max, ấn tượng đầu tiên cũng chính là điều đã được nhắc đến ở tựa phim: Max “Điên”.</p>

                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                                alt="Movie Poster"
                                                className="img-fluid"
                                                style={{ width: 600, height: 349, objectFit: 'cover' }}
                                            />
                                        </div>
                                        <p>Nhắc đến Mad Max, ấn tượng đầu tiên cũng chính là điều đã được nhắc đến ở tựa phim: Max “Điên”.</p>

                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <img
                                                src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                                alt="Movie Poster"
                                                className="img-fluid"
                                                style={{ width: 600, height: 349, objectFit: 'cover' }}
                                            />
                                        </div>
                                        <br />
                                        <p>“Điên” là vì thế giới của Max thật sự không bình thường, rất bất ổn, tâm thần, hỗn loạn… Thật khó tin là trong giai đoạn cuối thập niên 70, khi Hollywood đang ngập tràn các bom tấn đa dạng các thể loại như kinh dị, quái vật không gian, khoa học giả tưởng… Thì ở nước Úc xa xôi lại có một đạo diễn với ý tưởng độc đáo đã cho ra đời chuỗi phim phẩm lấy bối cảnh hậu tận thế đầy mê hoặc.</p>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="d-flex align-items-center pb-3" style={{ paddingTop: 100 }}>
                                            <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "17px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>Bình Luận Phim Khác</div>
                                        </div>
                                        <div className='d-flex gap-3 pb-5'>
                                            {movies.map((movie, index) => (
                                                <div key={index} className="inline-block" style={{ width: '193px' }}>
                                                    <a href={movie.url}>
                                                        <img
                                                            alt={movie.alt}
                                                            loading="lazy"
                                                            width="193"
                                                            height="128"
                                                            decoding="async"

                                                            src={movie.imageUrl}
                                                            style={{ color: 'transparent' }}
                                                        />
                                                    </a>
                                                    <div className="text-base mt-3">
                                                        <a href={movie.url}>{movie.title}</a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>


                            {/* Bên Phải */}
                            <Col lg={4}>
                                <RightColumn />
                                <div className='button-dien-vien'>
                                    <Button color="secondary" outline className="waves-effect waves-light material-shadow-none" > Xem Thêm <i className="bx bx-right-arrow-alt"></i>  </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default BinhLuanPhimDetails;
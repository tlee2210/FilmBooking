import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Row, FormGroup, Button } from 'reactstrap';
import "../css/CinemaCorner.css"

const actorImage = "https://images2.thanhnien.vn/528068263637045248/2024/5/24/chris-hemsworth-1716539281941143214485.png";
const movieImages = [
    "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQul9f8AXvrrs1EXi1wEA_zsa_f200m5RDGPOhKCPrk9q17SvS15ShBND91nXvW9ctIuoDJeY_S&s=19",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdHOhzaWVYrlcagwFp709SD6dYE9VuJzEFO_hAW_hZaJvCPsDF4ebaW9rH&s=10",
    "https://www.example.com/chris-evans3.jpg",
    "https://www.example.com/chris-evans4.jpg",
];

const movies = [
    { title: "CAPTAIN AMERICA: CHIẾN BINH MÙA ĐÔNG", role: "Steve Rogers / Captain America", status: "Đang cập nhật" },
    { title: "CAPTAIN AMERICA: NỘI CHIẾN SIÊU ANH HÙNG", role: "Steve Rogers / Captain America", status: "Đang cập nhật" },
    { title: "Lightyear", role: "Đang cập nhật", status: "Đang cập nhật" },
    { title: "Knives Out", role: "Đang cập nhật", status: "Đang cập nhật" },
    { title: "Avengers: Endgame", role: "Captain America", status: "Đang cập nhật" },
    { title: "AVENGERS: INFINITY WAR", role: "Captain America", status: "Đang cập nhật" },
];


const ActorInfor = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
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

    document.title = "Dien Vien";

    return (
        <React.Fragment>
            <Container style={{ paddingTop: 100 }}>
                <div className="page-content">
                    <Container fluid>
                        <Row>
                            {/* Bên Trái */}
                            <Col lg={8}>
                                <Card>
                                    <CardBody>
                                        <div className="actor-info-ActorInfor">
                                            <div>
                                                <img
                                                    src={actorImage}
                                                    alt="Chris Hemsworth"
                                                />
                                            </div>
                                            <div className="actor-info-text-ActorInfor">
                                                <h2>Chris Hemsworth</h2>
                                                <p>Khác với Chris Hemsworth vẫn đang loay hoay trong hình tượng vị thần sấm sét, đa số người hâm mộ vẫn nhìn nhận rõ ràng, Chris Evans và Captain America là hai con người hoàn toàn khác nhau.</p>
                                                <p><strong>Ngày sinh:</strong> 13/06/1981</p>
                                                <p><strong>Chiều cao:</strong> 183 cm</p>
                                                <p><strong>Quốc tịch:</strong> Mỹ</p>
                                            </div>
                                        </div>

                                        {/* Swiper hinh anh */}
                                        {/* <div className="images-section-ActorInfor">
                                            <h3>HÌNH ẢNH</h3>
                                            <Row>
                                                {movieImages.map((img, index) => (
                                                    <Col key={index} md={3}>
                                                        <img src={img} alt={`Chris Evans ${index + 1}`} className="img-fluid" />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div> */}

                                        {/* PHIM ĐÃ THAM GIA */}
                                        <div className="movies-section-ActorInfor">
                                            <div className="d-flex align-items-center pb-3">
                                                <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>PHIM ĐÃ THAM GIA</div>
                                            </div>
                                            <Row>
                                                {movies.map((movie, index) => (
                                                    <Col key={index} md={6} className="mb-3">
                                                        <div className="movie-item-ActorInfor">
                                                            <img src={movieImages} alt={movie.title} className="img-fluid" />
                                                            <div>
                                                                <h5>{movie.title}</h5>
                                                                <p>{movie.role}</p>
                                                                <p className="text-muted">{movie.status}</p>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>

                                        {/* TIỂU SỬ */}
                                        <div className="movies-section-ActorInfor">
                                            <div className="d-flex align-items-center pb-3">
                                                <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>TIỂU SỬ</div>
                                            </div>
                                            <Row>
                                                <span style={{ fontSize: "14px", fontWeight: "bold", paddingBottom: "10px" }}>
                                                    <strong>
                                                        <em>
                                                            Khác với Chris Hemsworth vẫn đang loay hoay trong hình tượng vị thần sấm sét, đa số người hâm mộ vẫn nhìn nhận rõ ràng, Chris Evans và Captain America là hai con người hoàn toàn khác nhau.
                                                        </em>
                                                    </strong>
                                                </span>
                                                <span style={{ fontSize: "14px", paddingBottom: "10px" }}>
                                                    Sinh ngày 13 tháng 6 năm 1981 tại Boston, bang Massachusetts, con đường diễn xuất của cậu bé Chris Evans bắt đầu từ nhỏ với những vở kịch trong trường học. Tình yêu diễn xuất lớn dần theo năm tháng, khi trưởng thành, Evans lắng nghe tiếng gọi con tim, tới New York và thi vào trường nghệ thuật Lee Strasberg.
                                                </span>
                                                <span style={{ fontSize: "14px", paddingBottom: "10px" }}>
                                                    Theo lời khuyên của bạn bè, anh bắt đầu tham gia thử vai một vài phim rồi dần nhận ra đam mê của bản thân là phim trường chứ không phải sân khấu kịch nghệ. Ban đầu con đường sự nghiệp của Chris khá bằng phẳng. Năm 2000, anh xuất hiện lần đầu tiên trên một phim truyền hình của đài CBS. Sau vài vai diễn nhỏ trên các phim kinh phí thấp, Evans bắt đầu xuất hiện trong các dự án lớn hơn.
                                                </span>
                                                <span style={{ fontSize: "14px", paddingBottom: "10px" }}>
                                                    Khác với Chris Hemsworth vẫn đang loay hoay trong hình tượng vị thần sấm sét, đa số người hâm mộ vẫn nhìn nhận rõ ràng, Chris Evans và Captain America là hai con người hoàn toàn khác nhau.
                                                </span>
                                                <span style={{ fontSize: "14px", paddingBottom: "10px" }}>
                                                    Khác với Chris Hemsworth vẫn đang loay hoay trong hình tượng vị thần sấm sét, đa số người hâm mộ vẫn nhìn nhận rõ ràng, Chris Evans và Captain America là hai con người hoàn toàn khác nhau.
                                                </span>
                                                <span style={{ fontSize: "14px", paddingBottom: "10px" }}>
                                                    Khác với Chris Hemsworth vẫn đang loay hoay trong hình tượng vị thần sấm sét, đa số người hâm mộ vẫn nhìn nhận rõ ràng, Chris Evans và Captain America là hai con người hoàn toàn khác nhau.
                                                </span>
                                            </Row>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            {/* Bên Phải */}
                            <Col lg={4}>
                                <Card className="quick-ticket-card">
                                    <CardHeader className="quick-ticket-header">Mua Vé Nhanh</CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <Label for="movieSelect">Chọn phim</Label>
                                            <Input
                                                type="select"
                                                id="movieSelect"
                                                value={selectedMovie}
                                                onChange={handleMovieChange}
                                            >
                                                <option value="">Chọn phim</option>
                                                <option value="movie1">Phim 1</option>
                                                <option value="movie2">Phim 2</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="theaterSelect">Chọn rạp</Label>
                                            <Input
                                                type="select"
                                                id="theaterSelect"
                                                value={selectedTheater}
                                                onChange={handleTheaterChange}
                                                disabled={!selectedMovie}
                                            >
                                                <option value="">Chọn rạp</option>
                                                <option value="theater1">Rạp 1</option>
                                                <option value="theater2">Rạp 2</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="dateSelect">Chọn ngày</Label>
                                            <Input
                                                type="select"
                                                id="dateSelect"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                disabled={!selectedTheater}
                                            >
                                                <option value="">Chọn ngày</option>
                                                <option value="date1">Ngày 1</option>
                                                <option value="date2">Ngày 2</option>
                                            </Input>
                                        </FormGroup>
                                    </CardBody>
                                </Card>


                                 {/* PHIM ĐANG CHIẾU */}
                                <Card className="quick-ticket-card-phim-dang-chieu mt-5">
                                    <div className="d-flex align-items-center pb-3">
                                        <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "0.5rem" }}>PHIM ĐANG CHIẾU</div>
                                    </div>
                                    <CardBody className="position-relative p-0 hover-container">
                                        <img
                                            style={{ height: "280px", width: "380px", objectFit: "inherit" }}
                                            className="img-fluid hover-image"
                                            src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTtz0oynJ2nY-2wHZXerfJbJoGZpLIPrUSWdLfQbcWOuymbu2uWLbSyonfEeoUHbcnS1FE5k6ZfxkQe8YQ"
                                            alt="Movie"
                                        />
                                        <div className="ticket-overlay">
                                            <img
                                                src="https://www.galaxycine.vn/_next/static/media/btn-ticket.42d72c96.webp"
                                                alt="Ticket"
                                                className="ticket-image"
                                            />
                                        </div>
                                        <div style={{ paddingTop: 5 }}>
                                            <a style={{ fontSize: 18, fontWeight: "bold" }} href='/#'>Thor RagnaRock</a>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className='button-dien-vien'>
                                    <Button color="secondary" outline className="waves-effect waves-light material-shadow-none">Xem Thêm <i className="bx bx-right-arrow-alt"></i></Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default ActorInfor;

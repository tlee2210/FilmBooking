import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import "../CinemaCorner/css/CinemaCorner.css";
import MovieIsShowing from "../BuyTicket/MovieIsShowing";
import RightColumn from "../CinemaCorner/RightColumn";

const PhimHayThang = () => {
  document.title = "Blog Movie";

  const data = [
    {
      name: "Phim Hay Tháng 7: Siêu Anh Hùng Trỗi Dậy",
      thumbnail: "https://www.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg",
      view: 8,
      description: "Khán giả còn được chào đón màn trở lại của những cái tên được yêu thích trên rạp chiếu phim như bề lũ lòi nhói Minions trong Despicable Me 4, 'tứ thần' Conan trong Thám Tử Lừng Danh Conan Movie 27."
    },
    {
      name: "Phim Hay Tháng 06.2024: Hè Vui 'Cóa Chời'",
      thumbnail: "https://www.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg",
      view: 396,
      description: "Sự nóng nực của mùa hè là mang đến không ít sự khó chịu cho mọi người, nhằm góp phần giải nhiệt sự nóng nực, Galaxy Cinema mang đến những thước phim còn nóng hơn cả mùa hè để các mọt phim cùng thưởng thức."
    },
    {
      name: "Phim Hay Tháng 05.2024: Tháng Của Người Hùng",
      thumbnail: "https://www.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg",
      view: 547,
      description: "Các phim mà Galaxy Cinema mang tới trong tháng 5 này cũng rất đa dạng từ kinh dị đến hành động, hoạt hình và hài hước... đều có đủ để phục hồi sự mệt mỏi của mọi người, mọi lứa tuổi khán giả."
    },
    {
      name: "Phim Hay Tháng 04.2024: 'Lật Mặt' Hạnh Phúc",
      thumbnail: "https://www.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg",
      view: 449,
      description: "Để tháng 4 này không bị những lời nói dối làm con tim trở nên xao xuyên, thì hãy cùng với Galaxy Cinema thưởng thức những bộ phim mới ngoài rạp để tránh xa khỏi những lời nói dối gây bão của những con người ngoài kia."
    },
    {
      name: "Phim Hay Tháng 03.2024: Đại Chiến Không Hồi Kết",
      thumbnail: "https://www.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg",
      view: 24,
      description: "Kết thúc mùa Tết ăn chơi thỏa thích và khó khăn khi bắt đầu chuỗi ngày công việc buồn chán, thì hãy ra rạp chiếu phim để nạp lại năng lượng với những tác phẩm xin xò sẽ được bổ trong tháng 3 này."
    },
    {
      name: "Phim Hay Mùa Tết: Mai Sáng Đèn",
      thumbnail: "https://www.galaxycine.vn/media/2024/6/27/pht-750_1719479164095.jpg",
      view: 35,
      description: "Mừng Tết Giáp Thìn, Galaxy Cinema gửi hàng nghìn lời chúc để các Stars kèm theo những món ăn tinh thần chất lượng đặc biệt nhất trong dịp Tết nguyên đán sắp tới."
    }
  ];

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <Container fluid>
          <Row>
            <Col lg={8} className="shadow-lg p-3 bg-white rounded">
              <div className="director-header-container-cinemaCorner">
                <Row className="align-items-center">
                  <Col md="3" className="d-flex align-items-center" style={{ width: 250 }}>
                    <div className="title-icon-cinemaCorner"></div>
                    <h2 className="title-cinemaCorner">Phim Hay Tháng</h2>
                  </Col>
                </Row>
                <div className="bottom-border"></div>
              </div>
              {data.map((item, index) => (
                <Link
                  key={index}
                  to="/phim-hay-thang/details"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Col key={index} className="mb-4 mt-4">
                    <Card className="h-100">
                      <Row className="g-0">
                        <Col
                          md={4}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <img
                            style={{
                              height: "250px",
                              width: "250px",
                              objectFit: "cover",
                            }}
                            className="rounded w-100 h-auto"
                            src={item.thumbnail}
                            alt={item.name}
                          />
                        </Col>
                        <Col md={8}>
                          <CardHeader style={{marginTop:-16}}>
                            <h1 className="title-cinemaCorner-name mb-0">
                              {item.name}
                            </h1>
                            <span className="badge bg-primary-subtle text-primary">
                              View: {item.view}
                            </span>
                          </CardHeader>
                          <CardBody>
                            <p
                              className="card-text mb-2 text-muted"
                              style={{
                                fontFamily: "Arial",
                                fontSize: "12px",
                                marginTop:-15
                              }}
                            >
                              {item.description}
                            </p>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Link>
              ))}
            </Col>

            {/* Bên Phải */}
            <Col lg={4}>
              <RightColumn />
              <MovieIsShowing />
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default PhimHayThang;

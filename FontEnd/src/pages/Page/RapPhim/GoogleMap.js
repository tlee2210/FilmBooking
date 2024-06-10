import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
//Import Breadcrumb
import BreadCrumb from '../../../Components/Common/BreadCrumb';


const mapStyles = {
    width: '100%',
    height: '100%',
};

const LoadingContainer = () => <div>Loading...</div>


const GoogleMaps = (props) => {
    document.title = "Google Maps | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="d-flex align-items-center pb-3">
                                                <div className="text-xl inline-block font-bold uppercase" style={{ borderLeft: "4px solid #007bff", fontSize: "23px", paddingLeft: "0.5rem" }}>
                                                    THÔNG TIN CHI TIẾT
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Address and Phone */}
                                    <Row className="mb-3">
                                        <Col>
                                            <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                                                <strong>Địa Chỉ:</strong> 116 Nguyễn Du, Quận 1, Tp.HCM
                                                <br />
                                                <strong>Số Điện Thoại:</strong> 19002024
                                            </div>
                                        </Col>
                                    </Row>
                                    <div id="gmaps-markers" className="gmaps" style={{ position: "relative" }}>
                                        <Map
                                            google={props.google}
                                            zoom={8}
                                            style={mapStyles}
                                            initialCenter={{ lat: 34.134117, lng: -118.321495 }}
                                        >
                                            <Marker position={{ lat: 48.00, lng: -122.00 }} />
                                            <Marker position={{ lat: 34.134117, lng: -118.321495 }} />
                                            <Marker position={{ lat: 32.995049, lng: -111.536324 }} />
                                            <Marker position={{ lat: 37.383064, lng: -109.071236 }} />
                                            <Marker position={{ lat: 39.877586, lng: -79.640617 }} />
                                        </Map>
                                    </div>
                                    <Row>
                                        <Col>
                                            <p style={{ textAlign: 'justify', lineHeight: '1.6', fontSize: '16px',paddingTop:15 }}>
                                                Là rạp chiếu đầu tiên và đông khách nhất trong hệ thống, Galaxy Nguyễn Du chính thức đi vào hoạt động từ ngày 20/5/2005 và được xem là một trong những cụm rạp mang tiêu chuẩn quốc tế hiện đại bậc nhất đầu tiên xuất hiện tại Việt Nam. Galaxy Nguyễn Du là một trong những rạp chiếu phim tiên phong mang đến cho khán giả những trải nghiệm phim chiếu rạp tốt nhất.
                                                <br /><br />
                                                Galaxy Nguyễn Du gồm 5 phòng chiếu với hơn 1000 chỗ ngồi, trong đó có 1 phòng chiếu phim 3D và 4 phòng chiếu phim 2D. Các phòng chiếu được thiết kế tinh tế giúp khách hàng có thể xem những bộ phim hay một cách thoải mái và thuận tiện nhất. Chất lượng hình ảnh rõ nét, âm thanh Dolby 7.1 cùng màn hình chiếu kỹ thuật 3D và Digital vô cùng sắc mịn, mang đến một không gian giải trí vô cùng sống động.
                                                <br /><br />
                                                Bên cạnh đó, với lợi thế gần khu vực sầm uất bậc nhất ở trung tâm thành phố, bãi để xe rộng rãi, có tiệm cafe ngoài trời – đây là nơi cực thu hút bạn trẻ đến xem phim và check-in.
                                            </p>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default (
    GoogleApiWrapper({
        apiKey: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
        LoadingContainer: LoadingContainer,
        v: "3",
    })(GoogleMaps)
)





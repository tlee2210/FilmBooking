import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Booking/css/order.css";
import "../Dat-Ve-Xem-Phim/css/Dat-Ve-Xem-Phim.css";
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
    Badge,
} from "reactstrap";
import classnames from "classnames";
import { message } from "antd";
import withRouter from "../../../Components/Common/withRouter";

const Booking = (props) => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(1);
    const [modal, setModal] = useState(false);
    const [addedItemIds, setAddedItemIds] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [singleSeats, setSingleSeats] = useState([]);
    const [doubleSeats, setDoubleSeats] = useState([]);


    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLocationVisible, setIsLocationVisible] = useState(true);
    const [isMovieListVisible, setIsMovieListVisible] = useState(false);
    const [isShowtimeListVisible, setIsShowtimeListVisible] = useState(false);


    const data = {
        movieName: "Movie Title",
        price: 10,
        room: {
            seatRows: 5,
            seatColumns: 10,
            doubleSeatRows: 3,
            doubleSeatColumns: 4,
            totalColumn: 2,
        },
        movieformats: [
            {
                name: "Format 1",
                times: [
                    { idRoom: 1, time: "12:00" },
                    { idRoom: 1, time: "13:00" },
                    { idRoom: 1, time: "14:00" },
                    { idRoom: 1, time: "12:00" },
                    { idRoom: 1, time: "16:00" },
                ],
            },
        ],
        image: "path/to/image.jpg",
        cinemaName: "Cinema Name",
        roomName: "Room Name",
        time: "12:00",
        date: "2024-07-07",
    };

    const WaterCornData = [
        {
            id: 1,
            name: "Popcorn",
            price: 5,
            image: "path/to/popcorn.jpg",
            description: "Delicious popcorn",
        },
        {
            id: 2,
            name: "Soda",
            price: 3,
            image: "path/to/soda.jpg",
            description: "Refreshing soda",
        },
    ];

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    const handleChooseSeat = (seat, isDouble) => {
        const price = isDouble ? data.price * 2 * 1.05 : data.price;

        setSelectedSeats((prevSeats) => {
            if (prevSeats.includes(seat)) {
                setTotalPrice(totalPrice - price);
                return prevSeats.filter((s) => s !== seat);
            } else if (prevSeats.length < 8) {
                setTotalPrice(totalPrice + price);
                return [...prevSeats, seat];
            } else {
                message.error("Maximum number of 8 seats exceeded!");
                return prevSeats;
            }
        });

        if (isDouble) {
            setDoubleSeats((prevSeats) => {
                if (prevSeats.includes(seat)) {
                    return prevSeats.filter((s) => s !== seat);
                } else if (prevSeats.length + singleSeats.length < 8) {
                    return [...prevSeats, seat];
                } else {
                    return prevSeats;
                }
            });
        } else {
            setSingleSeats((prevSeats) => {
                if (prevSeats.includes(seat)) {
                    return prevSeats.filter((s) => s !== seat);
                } else if (prevSeats.length + doubleSeats.length < 8) {
                    return [...prevSeats, seat];
                } else {
                    return prevSeats;
                }
            });
        }
    };

    const handleChangeShowtime = (id) => {
        setSelectedSeats([]);
        setDoubleSeats([]);
        setSingleSeats([]);
        console.log(`Showtime changed to room ${id}`);
    };

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        return `${hours}:${minutes}`;
    };

    const renderSeats = (numRows, numCols, totalColumns, isDouble = false) => {
        const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            .split("")
            .slice(0, numRows + (isDouble ? data.room.seatRows : 0))
            .reverse();
        const seatsPerPart = Math.ceil(numCols / totalColumns);

        return (
            <div className="seating-grid">
                {rows.slice(0, numRows).map((row) => (
                    <div className="seat-row" key={row}>
                        {[...Array(numCols).keys()].map((i) => {
                            const seatNumber = isDouble
                                ? `${row}${i * 2 + 1}-${i * 2 + 2}`
                                : `${row}${i + 1}`;
                            const applyMargin =
                                totalColumns !== 1 && i !== 0 && (i + 1) % seatsPerPart === 0;
                            const isSelected = selectedSeats.includes(seatNumber);
                            return (
                                <div
                                    key={seatNumber}
                                    onClick={() => {
                                        handleChooseSeat(seatNumber, isDouble);
                                    }}
                                    className={classnames({
                                        "double-seat": isDouble,
                                        seat: !isDouble,
                                        "margin-right-seat": applyMargin,
                                        "selected-seat": isSelected,
                                    })}
                                >
                                    <div>{seatNumber}</div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    function toggleTab(tab) {
        if (tab >= 1 && tab <= 3) {
            setActiveTab(tab);
        }
    }

    function handlePrevTab() {
        if (activeTab > 1) {
            setActiveTab(activeTab - 1);
        }
    }

    function handleNextTab() {
        if (activeTab === 1) {
            setActiveTab(2);
        } else if (activeTab === 2) {
            selectedSeats.length > 0
                ? setActiveTab(3)
                : message.error("Please select at least one seat!");
        } else if (activeTab === 3) {
            setActiveTab(4);
        }
    }
    const handleConfirmation = () => {
        setModal(false);
        setActiveTab(3);
    };

    const countUP = (id, itemName, itemPrice) => {
        setAddedItemIds((prevAddedItemIds) => {
            const updatedAddedItemIds = { ...prevAddedItemIds };

            if (updatedAddedItemIds[id]) {
                updatedAddedItemIds[id].quantity += 1;
            } else {
                updatedAddedItemIds[id] = {
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                };
            }
            setTotalPrice(totalPrice + itemPrice);

            return updatedAddedItemIds;
        });
    };

    const countDown = (id, itemPrice) => {
        setAddedItemIds((prevAddedItemIds) => {
            const updatedAddedItemIds = { ...prevAddedItemIds };

            if (updatedAddedItemIds[id]) {
                if (updatedAddedItemIds[id].quantity > 1) {
                    updatedAddedItemIds[id].quantity -= 1;
                    setTotalPrice(totalPrice - itemPrice);
                } else {
                    delete updatedAddedItemIds[id];
                    setTotalPrice(totalPrice - itemPrice);
                }
            }

            return updatedAddedItemIds;
        });
    };

    const [promoCode, setPromoCode] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("payoo");

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const applyPromoCode = () => {
        alert(`Promo code ${promoCode} has been applied!`);
    };


    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [dates] = useState([
        { day: 'Hôm Nay', date: '08/07' },
        { day: 'Thứ Ba', date: '09/07' },
        { day: 'Thứ Tư', date: '10/07' },
        { day: 'Thứ Năm', date: '11/07' },
        { day: 'Thứ Sáu', date: '12/07' },
        { day: 'Thứ Bảy', date: '13/07' },
        { day: 'Chủ Nhật', date: '14/07' }
    ]);
    const [filter, setFilter] = useState('Galaxy Hải Phòng');
    const dateSliderRef = useRef(null);
    const [arrowDisable, setArrowDisable] = useState(true);

    const handleHorizontalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    document.title = `Booking ${data.movieName}` || "Booking";

    return (
        <React.Fragment>
            <div style={{ backgroundColor: "#e9e9e9" }}>
                <div style={{ paddingTop: 100 }}>
                    <Container>
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
                                                    className={`step-item -order-1 ${activeTab >= 1 ? "done" : ""
                                                        } ${activeTab === 1 ? "active" : ""}`}
                                                >
                                                    <span>Chọn Phim/Rạp/Suất</span>
                                                </div>

                                                <div
                                                    className={`step-item -order-1 ${activeTab >= 2 ? "done" : ""
                                                        } ${activeTab === 2 ? "active" : ""}`}
                                                >
                                                    <span>Cinema interest</span>
                                                </div>
                                                <div
                                                    className={`step-item -order-2 ${activeTab >= 3 ? "done" : ""
                                                        } ${activeTab === 3 ? "active" : ""}`}
                                                >
                                                    <span>Choose a food</span>
                                                </div>
                                                <div
                                                    className={`step-item -order-3 ${activeTab >= 4 ? "done" : ""
                                                        } ${activeTab === 4 ? "active" : ""}`}
                                                >
                                                    <span>Payment</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Container>
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
                                                <Row>
                                                    {/* Chọn Khu Vực */}
                                                    <div className="selection-section">
                                                        <div className="selection-header" onClick={() => setIsLocationVisible(!isLocationVisible)}>
                                                            <h1 style={{ fontSize: 21 }}>Chọn vị trí {selectedLocation && `- ${selectedLocation}`}</h1>
                                                            <button>{isLocationVisible ? '▲' : '▼'}</button>
                                                        </div>
                                                        <div className={classnames("location-selection", { show: isLocationVisible })}>
                                                            <div className="location-options">
                                                                {['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'An Giang', 'Bà Rịa - Vũng Tàu', 'Bến Tre', 'Cà Mau', 'Đắk Lắk', 'Hải Phòng', 'Khánh Hòa', 'Nghệ An'].map(location => (
                                                                    <button
                                                                        key={location}
                                                                        onClick={() => {
                                                                            setSelectedLocation(location);
                                                                            setIsMovieListVisible(true);
                                                                            setIsLocationVisible(false);
                                                                        }}
                                                                        className={classnames({
                                                                            "selected-location": selectedLocation === location
                                                                        })}
                                                                    >
                                                                        {location}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {/* Chọn Phim */}
                                                    <div className="selection-section">
                                                        <div className="selection-header" onClick={() => setIsMovieListVisible(!isMovieListVisible)}>
                                                            <h1 style={{ fontSize: 21 }}>Chọn phim {selectedMovie && `- ${selectedMovie}`}</h1>
                                                            <button>{isMovieListVisible ? '▲' : '▼'}</button>
                                                        </div>
                                                        <div className={classnames("movie-selection", { show: isMovieListVisible })}>
                                                            <div className="movie-options">
                                                                {['Kẻ Trộm Mặt Trăng 4', 'Cửu Long Thành Trại: Vây Thành', 'Mùa Hè Đẹp Nhất', 'Những Đường Cho Các Cảm Xúc Hội Nào', 'Vùng Đất Cầm Lặng Ngày Một', 'Gia Tài Của Ngoại'].map(movie => (
                                                                    <div
                                                                        key={movie}
                                                                        onClick={() => {
                                                                            setSelectedMovie(movie);
                                                                            setIsShowtimeListVisible(true);
                                                                            setIsMovieListVisible(false);
                                                                        }}
                                                                        className={classnames("movie-option", {
                                                                            "selected-movie": selectedMovie === movie
                                                                        })}
                                                                    >
                                                                        <img src="https://cdn.galaxycine.vn/media/2024/6/3/cuu-long-thanh-trai-vay-thanh-1_1717402596500.jpg" alt={movie} />
                                                                        <p>{movie}</p>
                                                                        {selectedMovie === movie && (
                                                                            <div className="selected-overlay">
                                                                                <i className="ri-checkbox-circle-line" style={{ fontSize: 62 }}></i>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    {/* Chọn suất */}
                                                    <div className="selection-section">
                                                        <div className="selection-header" onClick={() => setIsShowtimeListVisible(!isShowtimeListVisible)}>
                                                            <h1 style={{ fontSize: 21 }}>Chọn suất - {filter}</h1>
                                                            <button>{isShowtimeListVisible ? '▲' : '▼'}</button>
                                                        </div>
                                                        {isShowtimeListVisible && (
                                                            <div className="showtime-selection show">
                                                                <div className="date-slider-container">
                                                                    <span className="date-slider-nav" onClick={() => handleHorizontalScroll(dateSliderRef.current, 25, 100, -10)}>&lt;</span>
                                                                    <div className="date-slider" ref={dateSliderRef}>
                                                                        {dates.map((date, index) => (
                                                                            <button
                                                                                key={index}
                                                                                onClick={() => setSelectedDate(date.date)}
                                                                                className={classnames({ 'selected': selectedDate === date.date })}
                                                                            >
                                                                                <div>{date.day}</div>
                                                                                <div>{date.date}</div>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                    <span className="date-slider-nav" onClick={() => handleHorizontalScroll(dateSliderRef.current, 25, 100, 10)}>&gt;</span>
                                                                    <select className="filter-dropdown" value={filter} onChange={handleFilterChange}>
                                                                        <option value="Galaxy Hải Phòng">Galaxy Hải Phòng</option>
                                                                    </select>
                                                                </div>
                                                                <div className="showtime-options">
                                                                    <Row className="showtime-row">
                                                                        <Col md={2} className="showtime-type">
                                                                            <h4 style={{ paddingLeft: 20, marginTop: -76 }}>2D Lồng Tiếng</h4>
                                                                        </Col>
                                                                        <Col md={8} className="showtime-schedule">
                                                                            {['09:00', '10:15', '11:15', '12:00', '13:45', '15:30', '17:15', '18:00', '19:00', '19:45', '20:45', '21:30'].map(showtime => (
                                                                                <button
                                                                                    key={showtime}
                                                                                    onClick={() => setSelectedShowtime(showtime)}
                                                                                    className={classnames({ 'selected-showtime': selectedShowtime === showtime })}
                                                                                >
                                                                                    {showtime}
                                                                                </button>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="showtime-row">
                                                                        <Col md={2} className="showtime-type">
                                                                            <h4 style={{ paddingLeft: 20, marginTop: -104 }}>2D Phụ Đề</h4>
                                                                        </Col>
                                                                        <Col md={8} className="showtime-schedule">
                                                                            {['09:45', '10:45', '11:30', '12:30', '13:15', '14:15', '15:00', '16:00', '16:45', '17:45', '18:30', '19:30', '20:15', '21:15', '22:00', '22:30'].map(showtime => (
                                                                                <button
                                                                                    key={showtime}
                                                                                    onClick={() => setSelectedShowtime(showtime)}
                                                                                    className={classnames({ 'selected-showtime': selectedShowtime === showtime })}
                                                                                >
                                                                                    {showtime}
                                                                                </button>
                                                                            ))}
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId={2}>
                                                <Row>
                                                    <Row
                                                        className="btn-group-order rounded-3 shadow-lg p-3 bg-white rounded"
                                                        style={{ backgroundColor: "white", padding: 20 }}
                                                    >
                                                        <Col md={3} className="showtime-title-order">
                                                            Change show time
                                                        </Col>
                                                        <Col
                                                            md={12}
                                                            className="btn-group-order"
                                                            role="group"
                                                        >
                                                            <Row>
                                                                {data &&
                                                                    data.movieformats.map((item, index) => (
                                                                        <Row className="ms-4 mb-4" key={index}>
                                                                            <Col md={2}>{item.name}</Col>
                                                                            <Col md={10}>
                                                                                <Row>
                                                                                    {item.times &&
                                                                                        item.times.map(
                                                                                            (timeItem, timeIndex) => (
                                                                                                <Col
                                                                                                    key={timeIndex}
                                                                                                    onClick={() => {
                                                                                                        handleChangeShowtime(
                                                                                                            timeItem.idRoom
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    <button
                                                                                                        className={classnames({
                                                                                                            "btn btn-primary me-3 mb-3":
                                                                                                                timeItem.idRoom ==
                                                                                                                data.id,
                                                                                                            "btn btn-outline-primary me-3 mb-3":
                                                                                                                timeItem.idRoom !=
                                                                                                                data.id,
                                                                                                        })}
                                                                                                    >
                                                                                                        {formatTime(
                                                                                                            timeItem.time
                                                                                                        )}
                                                                                                    </button>
                                                                                                </Col>
                                                                                            )
                                                                                        )}
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    ))}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row
                                                        className="mt-4 rounded-3 shadow-lg p-3 mb-5 bg-white rounded"
                                                        style={{ backgroundColor: "white", padding: 20 }}
                                                    >
                                                        <Row>
                                                            {data.room.doubleSeatColumns > 0 &&
                                                                data.room.doubleSeatRows > 0 &&
                                                                renderSeats(
                                                                    parseInt(data.room.doubleSeatColumns, 10),
                                                                    parseInt(data.room.doubleSeatRows, 10),
                                                                    parseInt(data.room.totalColumn, 10),
                                                                    true
                                                                )}
                                                            {data.room.seatRows > 0 &&
                                                                data.room.seatColumns > 0 &&
                                                                renderSeats(
                                                                    parseInt(data.room.seatRows, 10),
                                                                    parseInt(data.room.seatColumns, 10),
                                                                    parseInt(data.room.totalColumn, 10)
                                                                )}
                                                        </Row>
                                                        <div className="screen-title-order">
                                                            <strong className="span-order">Screen</strong>
                                                            <hr className="hr-order" />
                                                        </div>
                                                    </Row>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId={3}>
                                                {WaterCornData &&
                                                    WaterCornData.map((item, index) => (
                                                        <React.Fragment key={item.id}>
                                                            <Card className="product mb-3 shadow bg-white rounded">
                                                                <CardBody>
                                                                    <Row>
                                                                        <div className="col-sm-auto">
                                                                            <div className="image-watercorn bg-light rounded p-1 ">
                                                                                <img
                                                                                    src={item.image}
                                                                                    alt={item.name}
                                                                                    className="img-fluid d-block"
                                                                                    style={{ borderRadius: "7px" }}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm">
                                                                            <h5 className="fs-14 text-truncate">
                                                                                {item.name}
                                                                            </h5>
                                                                            <ul className="list-inline text-muted">
                                                                                <li className="list-inline-item">
                                                                                    <span className="fw-medium">
                                                                                        <div
                                                                                            dangerouslySetInnerHTML={{
                                                                                                __html: item.description,
                                                                                            }}
                                                                                        />
                                                                                    </span>
                                                                                </li>
                                                                            </ul>
                                                                            <h5
                                                                                className="fs-14 text-truncate"
                                                                                style={{ fontWeight: 800 }}
                                                                            >
                                                                                {item.price} USD
                                                                            </h5>
                                                                        </div>
                                                                        <div
                                                                            className="col-sm-auto d-flex"
                                                                            style={{ alignItems: "center" }}
                                                                        >
                                                                            <div className="text-lg-end">
                                                                                <div className="input-step">
                                                                                    <button
                                                                                        type="button"
                                                                                        className="minus material-shadow"
                                                                                        onClick={() => {
                                                                                            countDown(item.id, item.price);
                                                                                        }}
                                                                                    >
                                                                                        –
                                                                                    </button>
                                                                                    <Input
                                                                                        type="text"
                                                                                        className="product-quantity"
                                                                                        value={
                                                                                            addedItemIds[item.id]
                                                                                                ? addedItemIds[item.id].quantity
                                                                                                : 0
                                                                                        }
                                                                                        name="demo_vertical"
                                                                                        readOnly
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        className="plus material-shadow"
                                                                                        onClick={() => {
                                                                                            countUP(
                                                                                                item.id,
                                                                                                item.name,
                                                                                                item.price
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Row>
                                                                </CardBody>
                                                            </Card>
                                                        </React.Fragment>
                                                    ))}
                                            </TabPane>
                                            <TabPane tabId={4}>
                                                <Row className="gy-3">
                                                    <div className="container-order">
                                                        <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
                                                            Promo Code
                                                        </h2>
                                                        <div
                                                            className="promo-code-order"
                                                            style={{ width: 400 }}
                                                        >
                                                            <input
                                                                type="text"
                                                                value={promoCode}
                                                                onChange={handlePromoCodeChange}
                                                                placeholder="Enter Promo Code"
                                                            />
                                                            <button
                                                                className="button-order"
                                                                onClick={applyPromoCode}
                                                            >
                                                                Apply
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="container-order">
                                                        <h2 style={{ fontSize: 20, fontWeight: "bold" }}>
                                                            Payment Methods
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
                                                                ShopeePay
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
                                                                MoMo
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
                                                                ZaloPay
                                                            </label>
                                                        </div>
                                                    </div>
                                                </Row>
                                            </TabPane>
                                        </TabContent>
                                    </Col>
                                    <Col xl={4}>
                                        <Card className="shadow-lg bg-white rounded">
                                            <CardBody className="card-body-order">
                                                <div className="image-description">
                                                    <div className="image-info">
                                                        <img src={data.image} alt={data.movieName} />
                                                    </div>
                                                    <div>
                                                        <div className="movie-title">{data.movieName}</div>
                                                        <div className="movie-info">
                                                            <p>{data.movieFormat}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="detailed-info">
                                                    <div className="movie-info">
                                                        <p>
                                                            <strong>Cinema: </strong>
                                                            {data.cinemaName} - {data.roomName}
                                                        </p>
                                                        <p>
                                                            <strong>Show Time:</strong> {data.time} - Day:{" "}
                                                            {data.date}
                                                        </p>
                                                    </div>
                                                    <hr style={{ border: "1px dashed black" }} />
                                                    <Row>
                                                        {doubleSeats.length > 0 && (
                                                            <Row>
                                                                <Col md={9}>
                                                                    {doubleSeats.length}x Double Seats:
                                                                </Col>
                                                                <Col md={3}>
                                                                    <p className="total">
                                                                        {doubleSeats.length *
                                                                            (data.price * 2 * 1.05)}{" "}
                                                                        USD
                                                                    </p>
                                                                </Col>
                                                                <Col md={9}>
                                                                    {doubleSeats.map((i) => (
                                                                        <Badge
                                                                            key={i}
                                                                            color="success"
                                                                            className="me-2"
                                                                        >
                                                                            {i}
                                                                        </Badge>
                                                                    ))}
                                                                </Col>
                                                            </Row>
                                                        )}
                                                        {singleSeats.length > 0 && (
                                                            <Row>
                                                                <Col md={9}>
                                                                    {singleSeats.length}x Single Seats:
                                                                </Col>
                                                                <Col md={3}>
                                                                    <p className="total">
                                                                        {singleSeats.length * data.price} USD
                                                                    </p>
                                                                </Col>
                                                                <Col md={9}>
                                                                    {singleSeats.map((i) => (
                                                                        <Badge
                                                                            key={i}
                                                                            color="success"
                                                                            className="me-2"
                                                                        >
                                                                            {i}
                                                                        </Badge>
                                                                    ))}
                                                                </Col>
                                                            </Row>
                                                        )}
                                                    </Row>
                                                    {singleSeats.length > 0 || doubleSeats.length > 0 ? (
                                                        <hr style={{ border: "1px dashed black" }} />
                                                    ) : null}
                                                    {Object.keys(addedItemIds).length > 0 &&
                                                        Object.keys(addedItemIds).map((itemId, index) => (
                                                            <Row key={index}>
                                                                <Col md={9}>
                                                                    <p>
                                                                        {addedItemIds[itemId].quantity}x{"  "}
                                                                        {addedItemIds[itemId].name}
                                                                    </p>
                                                                </Col>
                                                                <Col md={3}>
                                                                    <p className="total">
                                                                        {addedItemIds[itemId].price *
                                                                            addedItemIds[itemId].quantity}{" "}
                                                                        USD
                                                                    </p>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    {Object.keys(addedItemIds).length > 0 ? (
                                                        <hr style={{ border: "1px dashed black" }} />
                                                    ) : null}
                                                    <p className="total">Total: {totalPrice}</p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Row className="align-items-center mt-4">
                                            <Col md={5} className="me-4">
                                                <Row>
                                                    <Button
                                                        onClick={handlePrevTab}
                                                        disabled={activeTab === 1}
                                                        color="light"
                                                        className="bg-gradient"
                                                    >
                                                        Back
                                                    </Button>
                                                </Row>
                                            </Col>
                                            <Col md={6}>
                                                <Row className="shadow bg-white rounded">
                                                    <Button
                                                        onClick={handleNextTab}
                                                        color="warning"
                                                        className="bg-gradient"
                                                    >
                                                        Continue
                                                    </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                        </Container>
                    </div>
                </Container>
            </div>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader
                    className="modal-header-order"
                    toggle={() => setModal(!modal)}
                >
                    Confirm Booking
                </ModalHeader>
                <ModalBody className="modal-body-order">
                    <div className="ticket-info-order">
                        <div className="ticket-section-order">
                            <strong>MOVIE</strong>
                            <br />
                            {data.movieName}
                        </div>
                        <div className="ticket-section-order">
                            <strong>CINEMA</strong>
                            <br />
                            {data.cinemaName}
                        </div>
                        <div className="ticket-section-order">
                            <strong>SHOWTIME</strong>
                            <br />
                            {data.time}
                        </div>
                        <div>
                            <strong>TOTAL</strong>
                            <br />
                        </div>
                        <div className="ticket-section-order">
                            <div className="price-tag-order"></div>
                            {totalPrice} USD
                        </div>
                    </div>
                    <div className="confirmation-checkbox-order">
                        <input type="checkbox" /> I confirm that the booking information is
                        correct.
                    </div>
                </ModalBody>
                <ModalFooter className="modal-footer-order">
                    <Button color="danger" onClick={handleConfirmation}>
                        Pay
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default withRouter(Booking);

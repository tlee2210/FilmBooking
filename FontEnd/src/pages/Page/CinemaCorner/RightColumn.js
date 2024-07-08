import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  FormGroup,
  Button,
} from "reactstrap";
import "./css/CinemaCorner.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "../../../Components/Common/withRouter";
import {
  BuyFastTicket,
  getBookingTime,
} from "../../../slices/home/bookingHome/thunk";

// BuyFastTickets
const BuyFastTickets = (props) => {
  const dispatch = useDispatch();

  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMulti, setSelectedMulti] = useState(null);

  useEffect(() => {
    dispatch(
      BuyFastTicket(selectedMovie, selectedTheater, selectedDate, useNavigate)
    );
  }, [dispatch, selectedMovie, selectedTheater, selectedDate]);

  const BuyFastTicketsState = (state) => state;
  const BuyFastTicketsStateData = createSelector(
    BuyFastTicketsState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
      buyFastTicket: state.HomeBooking.buyFastTicket,
    })
  );

  const { error, messageError, buyFastTicket } = useSelector(
    BuyFastTicketsStateData
  );

  const handleMulti = (selectedMulti) => {
    setSelectedMulti(selectedMulti);
  };

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleBooking = (idRoom) => {
    dispatch(getBookingTime(idRoom, props.router.navigate));
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <React.Fragment>
      {/* Mua vé Nhanh */}
      <Card className="quick-ticket-card mb-4">
        <CardHeader className="quick-ticket-header">
          Buy Fast Tickets
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Input
              type="select"
              id="movieSelect"
              value={selectedMovie}
              onChange={handleMovieChange}
            >
              <option value="">Select movie</option>
              {buyFastTicket && buyFastTicket.movieList
                ? buyFastTicket?.movieList?.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  ))
                : null}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              id="theaterSelect"
              value={selectedTheater}
              onChange={handleTheaterChange}
              disabled={!selectedMovie}
            >
              <option value="">Choose a cinema</option>
              {buyFastTicket?.cinemaList?.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              id="dateSelect"
              value={selectedDate}
              onChange={handleDateChange}
              disabled={!selectedTheater}
            >
              <option value="">Select date</option>
              {buyFastTicket && buyFastTicket.dateList
                ? buyFastTicket?.dateList?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                : null}
            </Input>
          </FormGroup>
          {buyFastTicket?.movieFormat?.length > 0 &&
            buyFastTicket.movieFormat.map((format, index) => (
              <Row key={index} className="mb-4">
                <Col md={12} className="ms-2 fs-3">
                  <h2>{format.name}</h2>
                </Col>
                <Col md={12} className="d-flex flex-wrap ms-4">
                  {format.times.map((timeItem, timeIndex) => (
                    // <div
                    //   key={timeIndex}
                    //   onClick={() => handleBooking(timeItem.idRoom)}
                    //   className="m-2"
                    // >
                    //   <Button className="btn-showTime mb-2">
                    //     {formatTime(timeItem.time)}
                    //   </Button>
                    // </div>
                    <button
                      key={timeIndex}
                      className="time-rapphim"
                      onClick={() => handleBooking(timeItem?.idRoom)}
                    >
                      <span
                        style={{
                          fontSize: 17,
                        }}
                      >
                        {formatTime(timeItem?.time)}
                      </span>
                    </button>
                  ))}
                </Col>
              </Row>
            ))}
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default withRouter(BuyFastTickets);

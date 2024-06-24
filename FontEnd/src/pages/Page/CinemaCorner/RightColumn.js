import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import "./css/CinemaCorner.css";

const DirectorInfor = () => {
  const [selectedMulti, setSelectedMulti] = useState(null);

  const handleMulti = (selectedMulti) => {
    setSelectedMulti(selectedMulti);
  };

  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // document.title = "Đạo Diễn";

  return (
    <React.Fragment>
      {/* Mua vé Nhanh */}
      <Card className="quick-ticket-card mb-4">
        <CardHeader className="quick-ticket-header">Mua Vé Nhanh</CardHeader>
        <CardBody>
          <FormGroup>
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
    </React.Fragment>
  );
};

export default DirectorInfor;

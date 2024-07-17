import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardBody, Container, Row } from "reactstrap";
// import RightColumn from "../CinemaCorner/RightColumn";
import { Link, useNavigate } from "react-router-dom";
// import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import withRouter from "../../../Components/Common/withRouter";
import buttonTicket from "../../../assets/images/buttonTicket/btn-ticket.png";

const MovieIsShowing = ({ MovieIntroduce }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <div
          className="text-xl inline-block font-bold uppercase"
          style={{
            borderLeft: "4px solid #007bff",
            fontSize: "18px",
            fontWeight: "bold",
            paddingLeft: "0.5rem",
            marginLeft: "40px",
          }}
        >
          MOVIE IS SHOWING
        </div>
        {MovieIntroduce
          ? MovieIntroduce?.map((movie, index) => (
              <Card
                key={index}
                className="quick-ticket-card-phim-dang-chieu mt-4"
              >
                <Link
                  to={`/book-tickets/${movie.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <CardBody className="position-relative p-0 hover-container">
                    <img
                      style={{
                        height: "280px",
                        width: "380px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      className="img-fluid hover-image"
                      src={movie.imagePortrait}
                      alt="Movie"
                    />
                    <div className="ticket-overlay">
                      <img
                        src={buttonTicket}
                        alt="Ticket"
                        className="ticket-image"
                      />
                    </div>
                    <div style={{ paddingTop: 7 }}>
                      <h1>{movie.name}</h1>
                    </div>
                  </CardBody>
                </Link>
              </Card>
            ))
          : null}
      </Row>
      <div className="button-dien-vien">
        <Link
          to="/movie-showing"
          className="btn btn-outline-danger waves-effect waves-light material-shadow-none"
          style={{ textDecoration: "none" }}
        >
          See More <i className="bx bx-right-arrow-alt"></i>
        </Link>
      </div>
    </Container>
  );
};
export default withRouter(MovieIsShowing);

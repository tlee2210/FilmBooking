import React, { useState, useEffect } from "react";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import MovieList from "../Movie/MovieList";
import { getAllMovie } from "../../../slices/home/MovieHome/thunk";

const Movie = () => {
  document.title = "Movie";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovie());
  }, [dispatch]);
  const MovieState = (state) => state;

  const MovieStateData = createSelector(MovieState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    HomeData: state.HomeMovie.HomeData,
  }));
  const { error, messageError, HomeData } = useSelector(MovieStateData);

  return (
    <React.Fragment>
      <Container fluid>
        {HomeData && <MovieList HomeData={HomeData} />}
      </Container>
    </React.Fragment>
  );
};
export default Movie;

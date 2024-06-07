import React, { useState, useEffect, createRef } from "react";
import withRouter from "../../../Components/Common/withRouter";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Row,
  Input,
  Label,
  FormFeedback,
  Form,
  Button,
  FormGroup,
} from "reactstrap";
import Select from "react-select";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
// import { filmImage } from "../../../assets/images/film.jpg";
import filmImageDefaut from "../../../assets/images/film.jpg";

import * as Yup from "yup";
import { useFormik } from "formik";

const ShowTimeCreate = (props) => {
  document.title = "Set Show Time";
  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      cinema: "",
      movie: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const RoleOption = [
    { value: "USER", label: "User" },
    { value: "MANAGER", label: "Manager" },
  ];
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb
          title="Set Show Time Management"
          pageTitle="Set Show Time"
        />
        <Row>
          <Col md={8}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Set Show Time Details</h5>
              </CardHeader>
              <CardBody></CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Set Movie And Cinema</h5>
              </CardHeader>
              <CardBody>
                <Col sm={12}>
                  <div className="search-box mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Movie
                    </Label>
                    <Select
                      name="Movie"
                      options={RoleOption}
                      placeholder="Select Movie..."
                      classNamePrefix="select"
                      onChange={(option) => {
                        const roleValue = option ? option.value : null;
                        validation.setFieldValue("movie", roleValue);
                        validation.setFieldTouched("movie", true);
                      }}
                      onBlur={() => validation.setFieldTouched("movie", true)}
                      value={RoleOption.find(
                        (opt) => opt.value === validation.values.movie
                      )}
                    />
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="search-box">
                    <Label className="form-label" htmlFor="product-title-input">
                      Cinema
                    </Label>
                    <Select
                      name="Cinema"
                      options={RoleOption}
                      placeholder="Select Cinema..."
                      classNamePrefix="select"
                      onChange={(option) => {
                        const roleValue = option ? option.value : null;
                        validation.setFieldValue("cinema", roleValue);
                        validation.setFieldTouched("cinema", true);
                      }}
                      onBlur={() => validation.setFieldTouched("cinema", true)}
                      value={RoleOption.find(
                        (opt) => opt.value === validation.values.cinema
                      )}
                    />
                  </div>
                </Col>
              </CardBody>
            </Card>
            <Row>
              <Col sm={12} xl={12}>
                <Card>
                  <img
                    className="card-img-top img-fluid"
                    src={filmImageDefaut}
                    alt="Card cap"
                    width={100}
                  />
                  <CardBody>
                    {/* <h4 className="card-title mb-2">Web Developer</h4> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default withRouter(ShowTimeCreate);

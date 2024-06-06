import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
  FormFeedback,
  FormGroup,
  Form,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { createSelector } from "reselect";
import Flatpickr from "react-flatpickr";
import withRouter from "../../../Components/Common/withRouter";

import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser, GetEditUser } from "../../../slices/User/thunk";

import { clearNotification } from "../../../slices/message/reducer";
import Select from "react-select";

const EditUser = (props) => {
  const { id } = props.router.params;
  document.title = "Edit User";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectState = (state) => state;

  const CreateUserProperties = createSelector(selectState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    item: state.User.item,
  }));
  const { error, messageError, item } = useSelector(CreateUserProperties);

  useEffect(() => {
    dispatch(GetEditUser(id, navigate));
  }, [id]);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const RoleOption = [
    { value: "USER", label: "User" },
    { value: "MANAGER", label: "Manager" },
  ];

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: item.name || "",
      role: item.role || "USER",
      email: item.email || "",
      phone: item.phone || "",
      dateOfBirth: item.dob || "",
      Gender: item.gender || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Name"),
      phone: Yup.string().required("Please Enter a phone"),
      role: Yup.string().required("Please Enter a role"),
      dateOfBirth: Yup.date().required("Please select a date of birth"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please Enter Your Email"),
      Gender: Yup.string()
        .oneOf(
          ["Male", "Female"],
          "Invalid gender. Please choose either Male or Female."
        )
        .required("Please Enter a Gender"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      if (values.dateOfBirth) {
        const dob = new Date(values.dateOfBirth);
        const formattedDate = [
          dob.getFullYear(),
          ("0" + (dob.getMonth() + 1)).slice(-2),
          ("0" + dob.getDate()).slice(-2),
        ].join("-"); // Format: YYYY-MM-DD

        formData.append("DOB", formattedDate);
      }
      formData.append("gender", values.Gender);
      formData.append("role", values.role);
      dispatch(UpdateUser(formData, navigate));
    },
  });

  // useEffect(() => {
  //   console.log("Current validation errors:", validation.errors);
  // }, [validation.errors]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User Management" pageTitle="Edit User" />
          <Row>
            <Col md={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Name">
                            Name
                          </Label>
                          <Input
                            type="text"
                            disabled
                            className="form-control"
                            id="Name"
                            placeholder="Enter Name"
                            name="name"
                            value={validation.values.name || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.name && validation.touched.name
                                ? true
                                : false
                            }
                          />
                          {validation.errors.name && validation.touched.name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            Email
                          </Label>
                          <Input
                            id="email"
                            disabled
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Role">
                            Role
                          </Label>
                          <Select
                            name="role"
                            options={RoleOption}
                            id="Role"
                            placeholder="Select Role"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const roleValue = option ? option.value : null;
                              validation.setFieldValue("role", roleValue);
                            }}
                            onBlur={() =>
                              validation.setFieldTouched("role", true)
                            }
                            value={RoleOption.find(
                              (opt) => opt.value === validation.values.role
                            )}
                          />
                          {validation.errors.role && validation.touched.role ? (
                            <FormFeedback type="invalid">
                              {validation.errors.role}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            phone number
                          </Label>
                          <Input
                            name="phone"
                            type="text"
                            disabled
                            placeholder="Enter username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                              validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                          validation.errors.phone ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.phone}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="Gender">
                            Gender
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="Gender"
                            disabled
                            placeholder="Enter Gender"
                            name="Gender"
                            value={validation.values.Gender || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.Gender &&
                              validation.touched.Gender
                                ? true
                                : false
                            }
                          />
                          {validation.errors.Gender &&
                          validation.touched.Gender ? (
                            <FormFeedback type="invalid">
                              {validation.errors.Gender}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            date Of Birth
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="Gender"
                            disabled
                            placeholder="Enter Gender"
                            name="Gender"
                            value={validation.values.dateOfBirth || ""}
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            invalid={
                              validation.errors.dateOfBirth &&
                              validation.touched.dateOfBirth
                                ? true
                                : false
                            }
                          />
                          {validation.errors.dateOfBirth &&
                          validation.touched.dateOfBirth ? (
                            <div className="text-danger">
                              {validation.errors.dateOfBirth}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <div className="mb-3">
                  <button type="submit" className="btn btn-success w-sm">
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EditUser);

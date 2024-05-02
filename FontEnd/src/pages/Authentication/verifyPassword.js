import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createSelector } from "reselect";

import withRouter from "../../Components/Common/withRouter";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { GetverifyOtp, ResetPassword } from "../../slices/auth/forgetpwd/thunk";
import { message } from "antd";

// import profile from "../../assets/images/bg.png";
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

// action
// import { clearNotification } from "../../slices/thunks";
import { clearNotification } from "../../slices/message/reducer";

const verifyPassword = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // console.log(props.router.params);
  const id = props.router.params.id;
  const opt = props.router.params.opt;

  useEffect(() => {
    dispatch(GetverifyOtp(id, opt, props.router.navigate));
  }, []);

  const selectForgetPasswordState = (state) => state.Message;

  const ForgetPasswordState = createSelector(
    selectForgetPasswordState,
    (message) => ({
      success: message.success,
      error: message.error,
      messageSuccess: message.messageSuccess,
      messageError: message.messageError,
    })
  );
  const { error, success, messageSuccess, messageError } =
    useSelector(ForgetPasswordState);

  useEffect(() => {
    if (success) {
      // history("/login");
      if (messageSuccess != null) {
        message.success(messageSuccess);
      }
    }
    if (error) {
      history("/login");
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [dispatch, success, error, history]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Please enter your password"),
      confirm_password: Yup.string()
        .min(8, "confirm Password must be at least 8 characters long")
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("repeatPassword", values.confirm_password);
      dispatch(ResetPassword(id, formData, props.history));
    },
  });

  document.title = "Change Password";
  return (
    <ParticlesAuth>
      <div className="auth-page-content mt-lg-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="20" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">change Password</p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">change Password</h5>
                    <p className="text-muted">Reset password</p>

                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#0ab39c"
                      className="avatar-xl"
                      style={{ width: "120px", height: "120px" }}
                    ></lord-icon>
                  </div>

                  <div className="p-2">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label htmlFor="userpassword" className="form-label">
                          Password <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.password}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-2">
                        <Label htmlFor="confirmPassword" className="form-label">
                          Confirm Password{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          name="confirm_password"
                          type="password"
                          placeholder="Confirm Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirm_password || ""}
                          invalid={
                            validation.touched.confirm_password &&
                            validation.errors.confirm_password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.confirm_password &&
                        validation.errors.confirm_password ? (
                          <FormFeedback type="invalid">
                            <div>{validation.errors.confirm_password}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          change Password
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

verifyPassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(verifyPassword);

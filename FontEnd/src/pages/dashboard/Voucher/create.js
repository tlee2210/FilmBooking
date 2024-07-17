import React, { useEffect } from "react";
import withRouter from "../../../Components/Common/withRouter";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { message } from "antd";
import { clearNotification } from "../../../slices/message/reducer";

import * as Yup from "yup";
import { useFormik } from "formik";

import { createVoucher } from "../../../slices/Voucher/thunk";

const VoucherCreate = (props) => {
  document.title = "Voucher Create";
  const history = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMovieAndCinema());
  // }, [dispatch]);
  // ShowTime
  const selecVoucherTimeState = (state) => state;
  const VoucherStateData = createSelector(selecVoucherTimeState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
  }));

  const { error, messageError } = useSelector(VoucherStateData);

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const Option = [
    { value: "PERCENTAGE", label: "Percentage" },
    { value: "FIXED", label: "Fixed" },
  ];

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: "",
      discountType: "PERCENTAGE",
      expirationDate: "",
      discountValue: "",
      usageLimit: "",
      minSpend: "",
    },
    validationSchema: Yup.object({
      // usageLimit: Yup.string().required("Please Enter usage Limit"),
      // minSpend: Yup.string().required("Please Enter usage Limit"),
      discountValue: Yup.string().required("Please Enter discount Value"),
      code: Yup.string()
        .required("Please Enter code")
        .matches(
          /^[A-Za-z0-9]{6}$/,
          "Code must be exactly 6 alphanumeric characters"
        )
        .matches(/^\S*$/, "Code must not contain spaces"),
      // expirationDate: Yup.string().required("Please Enter Expiration Date"),
      discountType: Yup.string().required("Please Enter Discount Type"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("code", values.code);
      formData.append("discountType", values.discountType);
      formData.append("discountValue", values.discountValue);
      if (values.expirationDate) {
        const dob = new Date(values.expirationDate);
        const formattedDate = [
          dob.getFullYear(),
          ("0" + (dob.getMonth() + 1)).slice(-2),
          ("0" + dob.getDate()).slice(-2),
        ].join("-"); // Format: YYYY-MM-DD

        formData.append("expirationDate", formattedDate);
      }
      formData.append("usageLimit", values.usageLimit);
      formData.append("minSpend", values.minSpend);

      dispatch(createVoucher(formData, props.router.navigate));
    },
  });

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="promotion Management" pageTitle="Voucher Create" />{" "}
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
                        <Label className="form-label" htmlFor="Code">
                          Code
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="Code"
                          placeholder="Enter Code"
                          name="code"
                          value={validation.values.code || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.code && validation.touched.code
                              ? true
                              : false
                          }
                        />
                        {validation.errors.code && validation.touched.code ? (
                          <FormFeedback type="invalid">
                            {validation.errors.code}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* usageLimit */}
                    <Col md={6}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="usageLimit">
                          Usage Limit
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="usageLimit"
                          placeholder="Enter Usage Limit"
                          name="usageLimit"
                          value={validation.values.usageLimit || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.usageLimit &&
                            validation.touched.usageLimit
                              ? true
                              : false
                          }
                        />
                        {validation.errors.usageLimit &&
                        validation.touched.usageLimit ? (
                          <FormFeedback type="invalid">
                            {validation.errors.usageLimit}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    {/* minSpend */}
                    <Col md={6}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="minSpend">
                          Min Spend
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="Code"
                          placeholder="Enter Min Spend"
                          name="minSpend"
                          value={validation.values.minSpend || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.minSpend &&
                            validation.touched.minSpend
                              ? true
                              : false
                          }
                        />
                        {validation.errors.minSpend &&
                        validation.touched.minSpend ? (
                          <FormFeedback type="invalid">
                            {validation.errors.minSpend}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="discountValue">
                          Discount Value
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="Code"
                          placeholder="Enter Discount Value"
                          name="discountValue"
                          value={validation.values.discountValue || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.discountValue &&
                            validation.touched.discountValue
                              ? true
                              : false
                          }
                        />
                        {validation.errors.discountValue &&
                        validation.touched.discountValue ? (
                          <FormFeedback type="invalid">
                            {validation.errors.discountValue}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="discountType">
                          Discount Type
                        </Label>
                        <Select
                          name="discountType"
                          options={Option}
                          id="discountType"
                          placeholder="Select Role"
                          classNamePrefix="select"
                          onChange={(option) => {
                            const roleValue = option ? option.value : null;
                            validation.setFieldValue("discountType", roleValue);
                          }}
                          onBlur={() =>
                            validation.setFieldTouched("discountType", true)
                          }
                          value={Option.find(
                            (opt) =>
                              opt.value === validation.values.discountType
                          )}
                        />
                        {validation.errors.discountType &&
                        validation.touched.discountType ? (
                          <FormFeedback type="invalid">
                            {validation.errors.discountType}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="mb-3">
                        <Label htmlFor="expirationDate" className="form-label">
                          Expiration Date
                        </Label>
                        <Flatpickr
                          className="form-control"
                          placeholder="expirationDate"
                          value={validation.values.expirationDate}
                          onChange={([selectedDate]) => {
                            validation.setFieldValue(
                              "expirationDate",
                              selectedDate
                            );
                          }}
                        />
                        {validation.errors.expirationDate &&
                        validation.touched.expirationDate ? (
                          <div className="text-danger">
                            {validation.errors.expirationDate}
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
  );
};
export default withRouter(VoucherCreate);

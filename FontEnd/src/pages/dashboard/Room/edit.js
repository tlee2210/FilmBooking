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
import { message } from "antd";
import { clearNotification } from "../../../slices/message/reducer";

import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GetEditRoom, UpdateRoom } from "../../../slices/Room/thunk";
import Select from "react-select";
import Item from "antd/es/list/Item";

const EditRoom = (props) => {
  // console.log(props);

  const id = props.router.params.id;

  document.title = "Create Room Movie";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetEditRoom(id, props.router.navigate));
  }, []);

  const selectRoomMovieCreateState = (state) => state;
  const roomMovieCreatepageData = createSelector(
    selectRoomMovieCreateState,
    (state) => ({
      error: state.Message.error,
      messageError: state.Message.messageError,
      selectOptions: state.RoomMovie.selectOptions,
      item: state.RoomMovie.item,
    })
  );
  const { error, messageError, selectOptions, item } = useSelector(
    roomMovieCreatepageData
  );

  useEffect(() => {
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [error]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: item.name || "",
      cinema: item.cinemaId || "",
      rows: item.seatRows || "",
      columns: item.seatColumns || "",
      doubleSeatColumns: item.doubleSeatColumns || "",
      doubleSeatRows: item.doubleSeatRows || "",
      totalColumn: item.totalColumn || "1",
    },
    validationSchema: Yup.object({
      totalColumn: Yup.string().required("Please Enter a Room total Column"),
      name: Yup.string().required("Please Enter a Room Name"),
      cinema: Yup.string().required("Please Enter a cinema"),
      rows: Yup.number().required("Required").min(1, "Rows must be at least 1"),
      columns: Yup.number()
        .required("Required")
        .min(1, "Columns must be at least 1"),
      doubleSeatColumns: Yup.number()
        .required("Required")
        .min(0, "Double seat columns must be at least 0"),
      doubleSeatRows: Yup.number()
        .required("Required")
        .min(0, "Double seat rows must be at least 0"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("name", values.name);
      formData.append("SeatRows", values.rows);
      formData.append("SeatColumns", values.columns);
      formData.append("doubleSeatColumns", values.doubleSeatColumns);
      formData.append("doubleSeatRows", values.doubleSeatRows);
      formData.append("totalColumn", values.totalColumn);
      formData.append("cinema", values.cinema);

      dispatch(UpdateRoom(formData, props.router.navigate));
    },
  });

  const RowOption = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
  ];

  const renderSeats = (numRows, numCols, totalColumns, isDouble = false) => {
    const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      .split("")
      .slice(0, numRows + (isDouble ? validation.values.rows : 0))
      .reverse();
    const seatsPerPart = Math.ceil(numCols / totalColumns);
    // console.log(seatsPerPart);
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

              return (
                <div
                  key={seatNumber}
                  className={
                    isDouble ? "" : applyMargin ? "margin-right-seat" : null
                  }
                >
                  <div className={isDouble ? "double-seat" : "seat"}>
                    {seatNumber}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Room Create" pageTitle="Movie" />
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Room Details</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={validation.handleSubmit}>
                  <Row>
                    <Col md={4}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Cinema</Label>
                        <Select
                          name="cinema"
                          options={selectOptions}
                          classNamePrefix="select"
                          onChange={(option) => {
                            validation.setFieldValue("cinema", option.value);
                          }}
                          onBlur={() =>
                            validation.setFieldTouched("cinema", true)
                          }
                          invalid={
                            validation.touched.cinema &&
                            validation.errors.cinema
                              ? true
                              : false
                          }
                          value={selectOptions.find(
                            (opt) => opt.value === validation.values.cinema
                          )}
                        />

                        {validation.touched.cinema &&
                          validation.errors.cinema && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {validation.errors.cinema}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Room name
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          placeholder="Enter Room name"
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
                    <Col md={4}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="validationCustom02">Total Column</Label>
                        <Select
                          name="totalColumn"
                          options={RowOption}
                          classNamePrefix="select"
                          onChange={(option) => {
                            validation.setFieldValue(
                              "totalColumn",
                              option.value
                            );
                          }}
                          onBlur={() =>
                            validation.setFieldTouched("totalColumn", true)
                          }
                          invalid={
                            validation.touched.totalColumn &&
                            validation.errors.totalColumn
                              ? true
                              : false
                          }
                          value={RowOption?.find(
                            (opt) => opt.value === validation.values.totalColumn
                          )}
                        />

                        {validation.touched.totalColumn &&
                          validation.errors.totalColumn && (
                            <div
                              className="invalid-feedback"
                              style={{ display: "block" }}
                            >
                              {validation.errors.totalColumn}
                            </div>
                          )}
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="rows-input">
                          Number of Rows
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="rows-input"
                          placeholder="Enter number of rows"
                          name="rows"
                          value={validation.values.rows || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.rows && validation.touched.rows
                              ? true
                              : false
                          }
                        />
                        {validation.errors.rows && validation.touched.rows ? (
                          <FormFeedback type="invalid">
                            {validation.errors.rows}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="columns-input">
                          Number of Columns
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="columns-input"
                          placeholder="Enter number of columns"
                          name="columns"
                          value={validation.values.columns || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.columns &&
                            validation.touched.columns
                              ? true
                              : false
                          }
                        />
                        {validation.errors.columns &&
                        validation.touched.columns ? (
                          <FormFeedback type="invalid">
                            {validation.errors.columns}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="double-seat-columns-input"
                        >
                          Number of Double Seat Columns
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="double-seat-columns-input"
                          placeholder="Enter number of double seat columns"
                          name="doubleSeatColumns"
                          value={validation.values.doubleSeatColumns || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.doubleSeatColumns &&
                            validation.touched.doubleSeatColumns
                              ? true
                              : false
                          }
                        />
                        {validation.errors.doubleSeatColumns &&
                        validation.touched.doubleSeatColumns ? (
                          <FormFeedback type="invalid">
                            {validation.errors.doubleSeatColumns}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="mb-3">
                        <Label
                          className="form-label"
                          htmlFor="double-seat-rows-input"
                        >
                          Number of Double Seat Rows
                        </Label>
                        <Input
                          type="number"
                          className="form-control"
                          id="double-seat-rows-input"
                          placeholder="Enter number of double seat rows"
                          name="doubleSeatRows"
                          value={validation.values.doubleSeatRows}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.doubleSeatRows &&
                            validation.touched.doubleSeatRows
                              ? true
                              : false
                          }
                        />
                        {validation.errors.doubleSeatRows &&
                        validation.touched.doubleSeatRows ? (
                          <FormFeedback type="invalid">
                            {validation.errors.doubleSeatRows}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-success w-sm">
                      Submit
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Seating Chart</h5>
              </CardHeader>
              <CardBody>
                {validation.values.doubleSeatColumns > 0 &&
                  validation.values.doubleSeatRows > 0 &&
                  renderSeats(
                    parseInt(validation.values.doubleSeatColumns, 10),
                    parseInt(validation.values.doubleSeatRows, 10),
                    parseInt(validation.values.totalColumn, 10),
                    true
                  )}
                {validation.values.rows > 0 &&
                  validation.values.columns > 0 &&
                  renderSeats(
                    parseInt(validation.values.rows, 10),
                    parseInt(validation.values.columns, 10),
                    parseInt(validation.values.totalColumn, 10)
                  )}
                <div className="border-2 border-orange-10 mt-3"></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(EditRoom);

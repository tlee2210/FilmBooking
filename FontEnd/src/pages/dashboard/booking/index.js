import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  Button,
  Form,
  Input,
} from "reactstrap";

import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { message } from "antd";

// import * as Yup from "yup";
import { useFormik } from "formik";

import withRouter from "../../../Components/Common/withRouter";
import { Link, useSearchParams } from "react-router-dom";
//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { clearNotification } from "../../../slices/message/reducer";
import Flatpickr from "react-flatpickr";

import Select from "react-select";
//redux
import { useSelector, useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

import { celebrity, deleteCelebrity } from "../../../slices/Celebrity/thunk";
import { Booking } from "../../../slices/booking/thunk";

const BookingPage = (props) => {
  const dispatch = useDispatch();

  const [modal_detele, setmodal_detele] = useState(false);
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [slug, setSlug] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchname, setSearch] = useState(
    searchParams.get("searchname") || null
  );

  const [startDay, setStartDay] = useState(
    searchParams.get("startday") || null
  );
  const [lastday, setLastDay] = useState(searchParams.get("lastday") || null);
  const [searchmovie, setMovie] = useState(searchParams.get("movie") || null);
  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 15
  );

  const BookingState = (state) => state;
  const BookingStateData = createSelector(BookingState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    data: state.Booking.data,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError, data } =
    useSelector(BookingStateData);

  useEffect(() => {
    if (success) {
      if (messageSuccess != null) {
        message.success(messageSuccess);
      }
    }
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [dispatch, success, error]);

  useEffect(() => {
    let params = {};
    if (searchname && searchname !== null && searchname !== undefined) {
      params.searchname = searchname;
    }
    if (searchmovie && searchmovie !== null && searchmovie !== undefined) {
      params.movie = searchmovie;
    }

    if (
      startDay &&
      startDay !== null &&
      startDay !== undefined &&
      !isNaN(new Date(startDay))
    ) {
      params.startday = startDay;
    }
    if (
      lastday &&
      lastday !== null &&
      lastday !== undefined &&
      !isNaN(new Date(lastday))
    ) {
      params.lastday = lastday;
    }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(Booking(searchname, searchmovie, pageNo, pageSize));
  }, [dispatch, searchname, searchmovie, pageNo, pageSize]);

  const handlePagination = (page) => {
    const newPageNo = page + 1;
    setPageNo(newPageNo);

    setSearchParams({ searchname, pageNo: newPageNo, pageSize });
  };

  const handlenumberOfElements = (elements) => {
    setPageSize(elements);
    setPageNo(1);
    setSearchParams({ searchname, pageNo, pageSize: elements });
  };

  const searchForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: searchname ? searchname : "" || "",
      movie: searchmovie ? searchmovie : "" || "",
      startDay: startDay ? startDay : "",
      lastDay: lastday ? lastday : "",
    },
    onSubmit: (values) => {
      console.log(values);
      setSearch(values.name);
      setMovie(values.movie);
      setStartDay(values.startDay);
      setLastDay(values.lastDay);
      setPageNo(1);
    },
  });

  function tog_togdelete(slug) {
    setmodal_detele(!modal_togFirst);
    // console.log(id);
    if (slug) {
      setSlug(slug);
    }
  }

  function deleteitem(slug) {
    // console.log("delete : " + id);
    if (slug) {
      dispatch(deleteCelebrity(slug));
    }
  }

  const columns = useMemo(
    () => [
      {
        header: "User Name",
        accessorKey: "userName",
        enableColumnFilter: false,
      },
      {
        header: "Movie Name",
        accessorKey: "movieName",
        enableColumnFilter: false,
      },
      {
        header: "Show Time",
        accessorKey: "showtime",
        enableColumnFilter: false,
      },
      {
        header: "date",
        accessorKey: "date",
        enableColumnFilter: false,
      },
      {
        header: "Cinema Name",
        accessorKey: "cinemaName",
        enableColumnFilter: false,
      },
      {
        header: "Room Name",
        accessorKey: "roomName",
        enableColumnFilter: false,
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
        enableColumnFilter: false,
        cell: (cell) => {
          const { quantityDoubleSeat, quantitySeat } = cell.row.original;

          const doubleSeatArray = quantityDoubleSeat
            ? quantityDoubleSeat.split(", ")
            : [];
          const seatArray = quantitySeat ? quantitySeat.split(", ") : [];

          return (
            <span>
              {doubleSeatArray && doubleSeatArray.length > 0
                ? doubleSeatArray.map((item, index) => (
                    <span
                      key={`double-${index}`}
                      className="badge bg-warning-subtle text-warning me-1"
                    >
                      {item}
                    </span>
                  ))
                : null}
              {seatArray && seatArray.length > 0
                ? seatArray.map((item, index) => (
                    <span
                      key={`seat-${index}`}
                      className="badge bg-secondary-subtle text-secondary me-1"
                    >
                      {item}
                    </span>
                  ))
                : null}
            </span>
          );
        },
      },
    ],
    []
  );

  document.title = "Booking Manager";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Booking Management" pageTitle="Booking" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Booking</h5>
                      </div>
                    </div>
                    {/* <div className="col-sm-auto">
                      <div>
                        <Link
                          className="btn btn-success add-btn"
                          to={`/dashboard/celebrity/create`}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>
                          Create New
                        </Link>
                      </div>
                    </div> */}
                  </Row>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      searchForm.handleSubmit();
                      return false;
                    }}
                    action="#"
                  >
                    <Row className="g-2 mt-3 mb-3">
                      <Col sm={3}>
                        <div className="search-box">
                          <Input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Search for name..."
                            onChange={searchForm.handleChange}
                            onBlur={searchForm.handleBlur}
                            value={searchForm.values.name}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col sm={3}>
                        <div className="search-box">
                          <Input
                            type="text"
                            name="movie"
                            className="form-control"
                            placeholder="Search for movie..."
                            onChange={searchForm.handleChange}
                            onBlur={searchForm.handleBlur}
                            value={searchForm.values.movie}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div className="search-box">
                          <Flatpickr
                            className="form-control"
                            placeholder="select Start Day"
                            value={searchForm.values.startDay || null}
                            onChange={([selectedDate]) => {
                              const day = new Date(selectedDate);
                              const formattedDate = [
                                day.getFullYear(),
                                ("0" + (day.getMonth() + 1)).slice(-2),
                                ("0" + day.getDate()).slice(-2),
                              ].join("-");
                              searchForm.setFieldValue(
                                "startDay",
                                formattedDate
                              );
                            }}
                            options={{
                              dateFormat: "Y-m-d",
                            }}
                          />
                        </div>
                      </Col>
                      <Col sm={2}>
                        <div className="search-box">
                          <Flatpickr
                            className="form-control"
                            placeholder="select Last Day"
                            value={searchForm.values.lastDay || null}
                            onChange={([selectedDate]) => {
                              const day = new Date(selectedDate);
                              const formattedDate = [
                                day.getFullYear(),
                                ("0" + (day.getMonth() + 1)).slice(-2),
                                ("0" + day.getDate()).slice(-2),
                              ].join("-");
                              searchForm.setFieldValue(
                                "lastDay",
                                formattedDate
                              );
                            }}
                            options={{
                              dateFormat: "Y-m-d",
                              minDate: searchForm.values.startDay,
                            }}
                          />
                        </div>
                      </Col>
                      {/* <Col sm={3}>
                        <div className="search-box">
                          <Select
                            name="status"
                            options={statusOption}
                            isClearable={true}
                            placeholder="Select Role"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const roleValue = option ? option.value : null;
                              searchForm.setFieldValue("role", roleValue);
                              searchForm.setFieldTouched("role", true);
                            }}
                            onBlur={() =>
                              searchForm.setFieldTouched("role", true)
                            }
                            value={statusOption.find(
                              (opt) => opt.value === searchForm.values.role
                            )}
                          />
                        </div>
                      </Col> */}
                      <Col className="col-sm-auto ms-auto">
                        <div className="list-grid-nav hstack gap-1">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            {" "}
                            <i className="ri-equalizer-fill me-2 align-bottom"></i>
                            Filters
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardHeader>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns || []}
                    data={data.content || []}
                    paginateData={data}
                    customPageSize={data.size}
                    paginate={handlePagination}
                    numberOfElements={handlenumberOfElements}
                    tableClass="table-centered align-middle table-nowrap mb-0"
                    theadClass="text-muted table-light"
                    SearchPlaceholder="Search Products..."
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {/* delete modal */}
      <Modal
        isOpen={modal_detele}
        toggle={() => {
          tog_togdelete();
        }}
        id="firstmodal"
        centered
      >
        <ModalBody className="text-center p-5">
          {/* <lord-icon
              src="https://cdn.lordicon.com/tdrtiskw.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#405189"
              style={{ width: "130px", height: "130px" }}
            ></lord-icon> */}
          <div className="pt-4">
            <h4>Confirm Deletion</h4>
            <p className="text-muted">
              {" "}
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="col-lg-12">
            <div className="hstack gap-2 justify-content-center">
              <Button color="light" onClick={() => setmodal_detele(false)}>
                Cancel
              </Button>
              <Button
                color="danger"
                type="submit"
                onClick={() => {
                  deleteitem(slug);
                  setmodal_detele(false);
                }}
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(BookingPage);

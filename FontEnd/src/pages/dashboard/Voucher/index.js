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
import { getVoucher, deleteVoucher } from "../../../slices/Voucher/thunk";

const ShowTime = (props) => {
  const dispatch = useDispatch();

  const [modal_detele, setmodal_detele] = useState(false);
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [id, setId] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [cinema, setCinema] = useState(searchParams.get("cinema") || null);
  const [startDay, setStartDay] = useState(
    searchParams.get("startday") || null
  );
  const [lastday, setLastDay] = useState(searchParams.get("lastday") || null);
  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 15
  );

  const VoucherState = (state) => state;
  const VoucherStateData = createSelector(VoucherState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    data: state.Voucher.data,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError, data } =
    useSelector(VoucherStateData);

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

    // if (cinema && cinema !== null && cinema !== undefined) {
    //   params.cinema = cinema;
    // }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(getVoucher(pageNo, pageSize));
  }, [dispatch, pageNo, pageSize]);

  const handlePagination = (page) => {
    const newPageNo = page + 1;
    setPageNo(newPageNo);

    setSearchParams({ pageNo: newPageNo, pageSize });
  };

  const handlenumberOfElements = (elements) => {
    setPageSize(elements);
    setPageNo(1);
    setSearchParams({ cinema, pageNo, pageSize: elements });
  };

  const searchForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      cinema: cinema ? cinema : "",
      startDay: startDay ? startDay : "",
      lastDay: lastday ? lastday : "",
    },
    onSubmit: (values) => {
      console.log(values);
      setCinema(values.cinema);
      setStartDay(values.startDay);
      setLastDay(values.lastDay);
      setPageNo(1);
    },
  });

  function tog_togdelete(id) {
    setmodal_detele(!modal_togFirst);
    // console.log(id);
    if (id) {
      setId(id);
    }
  }

  function deleteitem(id) {
    console.log("delete : " + id);
    if (id) {
      dispatch(deleteVoucher(id));
    }
  }

  const columns = useMemo(
    () => [
      {
        header: "Code",
        accessorKey: "code",
        enableColumnFilter: false,
      },
      {
        header: "Discount Value",
        accessorKey: "discountValue",
        enableColumnFilter: false,
      },
      // {
      //   header: "Usage Limit",
      //   accessorKey: "usageLimit",
      //   enableColumnFilter: false,
      // },
      {
        header: "Used",
        accessorKey: "usedCount",
        enableColumnFilter: false,
        cell: (cell) => {
          const value = cell.getValue();
          return cell.row.original.usageLimit !== 0 &&
            cell.row.original.usageLimit !== null ? (
            <span>
              {value} / {cell.row.original.usageLimit}
            </span>
          ) : null;
        },
      },
      {
        header: "Expiration Date",
        accessorKey: "expirationDate",
        enableColumnFilter: false,
      },
      {
        header: "Discount Type",
        accessorKey: "discountType",
        enableColumnFilter: false,
        cell: (cell) => {
          const value = cell.getValue();
          return (
            <React.Fragment>
              {value === "PERCENTAGE" ? (
                <span className="badge bg-warning-subtle  text-warning badge-border">
                  {" "}
                  {value}
                </span>
              ) : (
                <span className="badge bg-secondary-subtle text-secondary  badge-border">
                  {value}
                </span>
              )}
            </React.Fragment>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "statusVoucher",
        enableColumnFilter: false,
        cell: (cell) => {
          const value = cell.getValue();
          return (
            <React.Fragment>
              {value === "ACTIVE" ? (
                <span className="badge bg-success-subtle text-success badge-border">
                  {" "}
                  {value}
                </span>
              ) : value === "USEDUP" ? (
                <span className="badge bg-danger-subtle text-danger badge-border">
                  {value}
                </span>
              ) : (
                <span className="badge bg-success-subtle text-secondary  badge-border">
                  {value}
                </span>
              )}
            </React.Fragment>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell) => {
          // return <React.Fragment>Details</React.Fragment>;
          return (
            <React.Fragment>
              <Link to={`/dashboard/voucher/${cell.getValue()}/edit`}>
                <span className="bg-gradient me-3 fs-4 text-info">
                  <i className="ri-edit-2-fill"></i>
                </span>
              </Link>

              <span
                className="fs-4 text-danger"
                onClick={() => tog_togdelete(cell.getValue())}
              >
                <i className="ri-delete-bin-5-line"></i>
              </span>
            </React.Fragment>
          );
        },
        className: "sticky-right",
      },
    ],
    []
  );

  document.title = "Voucher Manager";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Voucher Management" pageTitle="Voucher Manager" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Voucher Manager</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Link
                          className="btn btn-success add-btn"
                          to={`/dashboard/voucher/create`}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>
                          Create New
                        </Link>
                      </div>
                    </div>
                  </Row>
                  {/* <Form
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
                          <Select
                            name="status"
                            options={selectCinema}
                            isClearable={true}
                            placeholder="Select cinema"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const roleValue = option ? option.value : null;
                              searchForm.setFieldValue("cinema", roleValue);
                              searchForm.setFieldTouched("cinema", true);
                            }}
                            onBlur={() =>
                              searchForm.setFieldTouched("cinema", true)
                            }
                            value={selectCinema?.find(
                              (opt) => opt.value === searchForm.values.cinema
                            )}
                          />
                        </div>
                      </Col>
                      <Col sm={3}>
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
                      <Col sm={3}>
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
                  </Form> */}
                </CardHeader>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns || []}
                    data={data?.content || []}
                    paginateData={data}
                    customPageSize={data?.size}
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
                  deleteitem(id);
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

export default withRouter(ShowTime);

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { message, Image } from "antd";

import withRouter from "../../../Components/Common/withRouter";
import { Link, useSearchParams } from "react-router-dom";
//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useFormik } from "formik";
import { clearNotification } from "../../../slices/message/reducer";

//redux
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

import { getCinema, deleteCinema } from "../../../slices/Cinemas/thunk";

const Cinema = (props) => {
  const dispatch = useDispatch();

  const [modal_detele, setmodal_detele] = useState(false);
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [slug, setSlug] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchname, setSearch] = useState(
    searchParams.get("searchname") || null
  );
  const [status, setStatus] = useState(searchParams.get("status") || null);
  const [city, setCity] = useState(searchParams.get("city") || null);
  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 15
  );

  useEffect(() => {
    let params = {};
    if (searchname && searchname !== null && searchname !== undefined) {
      params.searchname = searchname;
    }

    if (status && status !== null && status !== undefined) {
      params.status = status;
    }

    if (city && city !== null && city !== undefined) {
      params.city = city;
    }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(getCinema(searchname, status, city, pageNo, pageSize));
  }, [dispatch, searchname, city, status, pageNo, pageSize]);

  const CinemaState = (state) => state;
  const CinemaStateData = createSelector(CinemaState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    Cinema: state.Cinema.data,
    item: state.Cinema.item,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError, Cinema, item } =
    useSelector(CinemaStateData);

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

  const handlePagination = (page) => {
    const newPageNo = page + 1;
    setPageNo(newPageNo);

    setSearchParams({ searchname, status, city, pageNo: newPageNo, pageSize });
  };

  const handlenumberOfElements = (elements) => {
    setPageSize(elements);
    setPageNo(1);
    setSearchParams({ searchname, status, city, pageNo, pageSize: elements });
  };

  const searchForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: searchname ? searchname : null,
      status: status ? status : null,
      city: city ? city : null,
    },
    onSubmit: (values) => {
      console.log(values);
      setSearch(values.name);
      setStatus(values.status);
      setCity(values.city);
      setPageNo(1);
    },
  });

  function tog_togdelete(slug) {
    setmodal_detele(!modal_togFirst);
    // console.log(slug);
    if (slug) {
      setSlug(slug);
    }
  }

  function deleteitem(slug) {
    // console.log("delete : " + slug);
    if (slug) {
      dispatch(deleteCinema(slug));
    }
  }

  const statusOption = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
  ];

  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "images",
        cell: (cell) => {
          const imageUrls = cell.getValue()?.map((item) => item.url);
          return (
            <>
              <Image.PreviewGroup items={imageUrls}>
                <Image
                  width={150}
                  src={imageUrls && imageUrls[0] ? imageUrls[0] : ""}
                />
              </Image.PreviewGroup>
            </>
          );
        },
        enableColumnFilter: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "Address",
        accessorKey: "address",
        enableColumnFilter: false,
      },
      {
        header: "city",
        accessorKey: "city",
        cell: (cell) => {
          return <span>{cell.getValue()}</span>;
        },
        enableColumnFilter: false,
      },
      {
        header: "status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          const value = cell.getValue();
          return (
            <React.Fragment>
              {value === "ACTIVE" ? (
                <span className="badge bg-success-subtle text-success badge-border">
                  {value}
                </span>
              ) : (
                <span className="badge bg-danger-subtle  text-danger badge-border">
                  {value}
                </span>
              )}
            </React.Fragment>
          );
        },
      },
      {
        header: "Actions",
        accessorKey: "slug",
        enableColumnFilter: false,
        cell: (cell) => {
          // return <React.Fragment>Details</React.Fragment>;
          return (
            <React.Fragment>
              <Link to={`/dashboard/cinema/${cell.getValue()}/edit`}>
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

  document.title = "Cinema Manager";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Cinema Manager" pageTitle="Cinema" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Cinema Manager</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Link
                          className="btn btn-success add-btn"
                          to={`/dashboard/cinema/create`}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          New Cinema
                        </Link>
                      </div>
                    </div>
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
                      <Col sm={4}>
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
                          <Select
                            name="city"
                            options={item}
                            isClearable={true}
                            placeholder="Select city"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const status = option ? option.value : null;
                              searchForm.setFieldValue("city", status);
                              searchForm.setFieldTouched("city", true);
                            }}
                            onBlur={() =>
                              searchForm.setFieldTouched("city", true)
                            }
                            value={statusOption.find(
                              (opt) => opt.value === searchForm.values.city
                            )}
                          />
                        </div>
                      </Col>
                      <Col sm={3}>
                        <div className="search-box">
                          <Select
                            name="status"
                            options={statusOption}
                            isClearable={true}
                            placeholder="Select Status"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const status = option ? option.value : null;
                              searchForm.setFieldValue("status", status);
                              searchForm.setFieldTouched("status", true);
                            }}
                            onBlur={() =>
                              searchForm.setFieldTouched("status", true)
                            }
                            value={statusOption.find(
                              (opt) => opt.value === searchForm.values.status
                            )}
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
                  </Form>
                </CardHeader>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns || []}
                    data={Cinema.content || []}
                    paginateData={Cinema}
                    customPageSize={Cinema.size}
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

export default withRouter(Cinema);

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

import { getMovie, deleteMovie } from "../../../slices/Movie/thunk";
const Movies = (props) => {
  const dispatch = useDispatch();

  const [modal_detele, setmodal_detele] = useState(false);
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [slug, setSlug] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchname, setSearch] = useState(
    searchParams.get("searchname") || null
  );
  const [status, setStatus] = useState(searchParams.get("status") || null);
  const [country, setCountry] = useState(searchParams.get("country") || null);
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

    if (country && country !== null && country !== undefined) {
      params.country = country;
    }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(getMovie(searchname, status, country, pageNo, pageSize));
  }, [dispatch, searchname, country, status, pageNo, pageSize]);

  const MovieState = (state) => state;
  const MovieStateData = createSelector(MovieState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    Movie: state.Movie.data,
    selectStatus: state.Movie.selectStatus,
    selectcountry: state.Movie.selectcountry,
  }));
  // Inside your component
  const {
    error,
    success,
    messageSuccess,
    messageError,
    Movie,
    selectStatus,
    selectcountry,
  } = useSelector(MovieStateData);

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

    setSearchParams({
      searchname,
      status,
      country,
      pageNo: newPageNo,
      pageSize,
    });
  };

  const handlenumberOfElements = (elements) => {
    setPageSize(elements);
    setPageNo(1);
    setSearchParams({
      searchname,
      status,
      country,
      pageNo,
      pageSize: elements,
    });
  };

  const searchForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: searchname ? searchname : "",
      status: status ? status : [],
      country: country ? country : [],
    },
    onSubmit: (values) => {
      // console.log(values);
      setSearch(values.name);
      setStatus(values.status);
      setCountry(values.country);
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
      dispatch(deleteMovie(slug));
    }
  }

  const columns = useMemo(
    () => [
      {
        header: "Image",
        accessorKey: "imagePortrait",
        cell: (cell) => {
          return (
            <>
              <Image width={70} src={cell.getValue()} />
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
        header: "country",
        accessorKey: "country",
        cell: (cell) => {
          return (
            <>
              <span>{cell.getValue()?.name}</span>
            </>
          );
        },
        enableColumnFilter: false,
      },
      {
        header: "movie Format",
        accessorKey: "movieFormat",
        enableColumnFilter: false,
      },
      {
        header: "duration movie",
        accessorKey: "duration_movie",
        cell: (cell) => {
          return <span>{cell.getValue()} minutes</span>;
        },
        enableColumnFilter: false,
      },
      {
        header: "release Date movie",
        accessorKey: "releaseDate",
        enableColumnFilter: false,
      },
      {
        header: "end Date movie",
        accessorKey: "endDate",
        enableColumnFilter: false,
      },
      {
        header: "price",
        accessorKey: "price",
        enableColumnFilter: false,
      },
      {
        header: "categories",
        accessorKey: "categories",
        cell: (cell) => {
          return (
            <span>
              {cell.getValue()?.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="badge bg-secondary-subtle text-secondary me-1"
                  >
                    {item.name}
                  </span>
                );
              })}
            </span>
          );
        },
        enableColumnFilter: false,
      },
      {
        header: "director",
        accessorKey: "director",
        cell: (cell) => {
          return (
            <span>
              {cell.getValue()?.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="badge bg-primary-subtle text-primary me-1"
                  >
                    {item.name}
                  </span>
                );
              })}
            </span>
          );
        },
        enableColumnFilter: false,
      },
      {
        header: "actor",
        accessorKey: "actor",
        cell: (cell) => {
          return (
            <span>
              {cell.getValue()?.map((item) => {
                return (
                  <span
                    key={item.id}
                    className="badge bg-info-subtle text-info me-2"
                  >
                    {item.name}
                  </span>
                );
              })}
            </span>
          );
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
              {value === "COMING_SOON" ? (
                <span className="badge bg-warning-subtle  text-warning badge-border">
                  {" "}
                  {value}
                </span>
              ) : value === "NO_LONGER_SHOWING" ? (
                <span className="badge bg-danger-subtle text-danger badge-border">
                  {value}
                </span>
              ) : value === "NOW_SHOWING" ? (
                <span className="badge bg-success-subtle text-success badge-border">
                  {value}
                </span>
              ) : value === "LIMITED_RELEASE" ? (
                <span className="badge bg-danger-subtle  text-danger badge-border">
                  {value}
                </span>
              ) : value === "SPECIAL_SCREENING" ? (
                <span className="badge bg-primary-subtle text-primary badge-border">
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
        header: "Actions",
        accessorKey: "slug",
        enableColumnFilter: false,
        cell: (cell) => {
          // return <React.Fragment>Details</React.Fragment>;
          return (
            <React.Fragment>
              <Link to={`/dashboard/movie/${cell.getValue()}/edit`}>
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
                          to={`/dashboard/movie/create`}
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
                            value={searchForm.values.name || ""}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col sm={3}>
                        <div className="search-box">
                          <Select
                            name="country"
                            options={selectcountry}
                            isClearable={true}
                            placeholder="Select country"
                            classNamePrefix="select"
                            onChange={(option) => {
                              const status = option ? option.value : null;
                              searchForm.setFieldValue("country", status);
                              searchForm.setFieldTouched("country", true);
                            }}
                            onBlur={() =>
                              searchForm.setFieldTouched("country", true)
                            }
                            value={selectcountry?.find(
                              (opt) => opt.value === searchForm.values.country
                            )}
                          />
                        </div>
                      </Col>
                      <Col sm={3}>
                        <div className="search-box">
                          <Select
                            name="status"
                            options={selectStatus}
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
                            value={selectStatus?.find(
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
                    data={Movie.content || []}
                    paginateData={Movie}
                    customPageSize={Movie.size}
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

export default withRouter(Movies);

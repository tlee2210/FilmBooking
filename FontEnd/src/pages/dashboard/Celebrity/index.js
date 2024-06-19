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

import * as Yup from "yup";
import { useFormik } from "formik";

import withRouter from "../../../Components/Common/withRouter";
import { Link, useSearchParams } from "react-router-dom";
//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { clearNotification } from "../../../slices/message/reducer";

import Select from "react-select";
//redux
import { useSelector, useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

import { celebrity, deleteCelebrity } from "../../../slices/Celebrity/thunk";

const Celebrity = (props) => {
  const dispatch = useDispatch();

  const [modal_detele, setmodal_detele] = useState(false);
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [slug, setSlug] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchname, setSearch] = useState(
    searchParams.get("searchname") || null
  );
  const [role, setRole] = useState(searchParams.get("role") || null);
  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 15
  );

  const CelebrityState = (state) => state;
  const CelebrityStateData = createSelector(CelebrityState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    Celebrity: state.Celebrity.data,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError, Celebrity } =
    useSelector(CelebrityStateData);

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

    if (role && role !== null && role !== undefined) {
      params.role = role;
    }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(celebrity(searchname, role, pageNo, pageSize));
  }, [dispatch, searchname, role, pageNo, pageSize]);

  const handlePagination = (page) => {
    const newPageNo = page + 1;
    setPageNo(newPageNo);

    setSearchParams({ searchname, role, pageNo: newPageNo, pageSize });
  };

  const handlenumberOfElements = (elements) => {
    setPageSize(elements);
    setPageNo(1);
    setSearchParams({ searchname, role, pageNo, pageSize: elements });
  };

  const searchForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: searchname ? searchname : "" || "",
      role: role ? role : "" || "",
    },
    onSubmit: (values) => {
      // console.log(values);
      setSearch(values.name);
      setRole(values.role);
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

  const statusOption = [
    { label: "Actor", value: "ACTOR" },
    { label: "Director", value: "DIRECTOR" },
  ];

  const columns = useMemo(
    () => [
      {
        header: "Avatar",
        accessorKey: "image",
        cell: (cell) => {
          return (
            <Image width={70} src={cell.getValue()} alt={cell.getValue()} />
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
        header: "Date",
        accessorKey: "dateOfBirth",
        enableColumnFilter: false,
      },
      {
        header: "nationality",
        accessorKey: "country",
        cell: (cell) => {
          return <span>{cell.getValue()?.name}</span>;
        },
        enableColumnFilter: false,
      },
      {
        header: "role",
        enableColumnFilter: false,
        accessorKey: "role",
        cell: (cell) => {
          switch (cell.getValue()) {
            case "ACTOR":
              return (
                <span className="badge bg-success-subtle text-success text-uppercase">
                  {" "}
                  {cell.getValue()}
                </span>
              );
            case "DIRECTOR":
              return (
                <span className="badge bg-warning-subtle  text-warning text-uppercase">
                  {" "}
                  {cell.getValue()}
                </span>
              );
          }
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
              <Link to={`/dashboard/celebrity/${cell.getValue()}/edit`}>
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

  document.title = "Actors and Directors Manager";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Actors and Directors Manager"
            pageTitle="Actors and Directors"
          />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">
                          Actors and Directors Manager
                        </h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Link
                          className="btn btn-success add-btn"
                          to={`/dashboard/celebrity/create`}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>
                          Create New
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
                    data={Celebrity.content || []}
                    paginateData={Celebrity}
                    customPageSize={Celebrity.size}
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

export default withRouter(Celebrity);

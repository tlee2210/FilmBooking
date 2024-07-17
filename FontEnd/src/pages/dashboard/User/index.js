import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, CardHeader, Form, Input } from "reactstrap";

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

import { getUsers } from "../../../slices/User/thunk";
import avatar from "../../../assets/images/User-avatar.png";

const User = (props) => {
  const dispatch = useDispatch();

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
    User: state.User.data,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError, User } =
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

    dispatch(getUsers(searchname, role, pageNo, pageSize));
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

  const RoleOption = [
    { value: "USER", label: "User" },
    { value: "MANAGER", label: "Manager" },
  ];

  const columns = useMemo(
    () => [
      {
        header: "Avatar",
        accessorKey: "avatar",
        cell: (cell) => {
          return (
            <>
              <Image
                width={50}
                src={cell.getValue() ? cell.getValue() : avatar}
              />
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
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Gender",
        accessorKey: "gender",
        enableColumnFilter: false,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "role",
        enableColumnFilter: false,
        accessorKey: "role",
        cell: (cell) => {
          switch (cell.getValue()) {
            case "USER":
              return (
                <span className="badge bg-success-subtle text-success text-uppercase">
                  {" "}
                  {cell.getValue()}
                </span>
              );
            case "MANAGER":
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
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell) => {
          // return <React.Fragment>Details</React.Fragment>;
          return (
            <React.Fragment>
              <Link to={`/dashboard/users/${cell.getValue()}/edit`}>
                <span className="bg-gradient me-3 fs-4 text-info">
                  <i className="ri-edit-2-fill"></i>
                </span>
              </Link>
            </React.Fragment>
          );
        },
        className: "sticky-right",
      },
    ],
    []
  );

  document.title = "Users Manager";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Users Management" pageTitle="Users" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Users Management</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <Link
                          className="btn btn-success add-btn"
                          to={`/dashboard/users/create`}
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
                            options={RoleOption}
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
                            value={RoleOption.find(
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
                    data={User.content || []}
                    paginateData={User}
                    customPageSize={User.size}
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
    </React.Fragment>
  );
};

export default withRouter(User);

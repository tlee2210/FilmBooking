import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Container, Row, Col, Card, CardHeader } from "reactstrap";

import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { message } from "antd";

import withRouter from "../../../Components/Common/withRouter";
import { Link } from "react-router-dom";
//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import { clearNotification } from "../../../slices/message/reducer";

//redux
import { useSelector, useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

import { celebrity } from "../../../slices/Celebrity/thunk";

const Celebrity = (props) => {
  const dispatch = useDispatch();

  const CelebrityState = (state) => state;
  const CelebrityStateData = createSelector(CelebrityState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError } =
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
    dispatch(celebrity({}, props.router.navigate));
  }, []);

  const selectLayoutState = (state) => state;
  const CelebrityProperties = createSelector(selectLayoutState, (state) => ({
    Celebrity: state.Celebrity.data,
  }));
  // Inside your component
  const { Celebrity } = useSelector(CelebrityProperties);

  const handlePagination = (page) => {
    const formData = new FormData();
    formData.append("pageNo", page);
    dispatch(celebrity(formData, props.router.navigate));
  };

  const columns = useMemo(
    () => [
      {
        header: "Avatar",
        accessorKey: "image",
        cell: (cell) => {
          return (
            <img src={cell.getValue()} alt={cell.getValue()} width={100} />
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
          return <span>{cell.getValue().name}</span>;
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
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell) => {
          // return <React.Fragment>Details</React.Fragment>;
          return (
            <React.Fragment>
              <span className="bg-gradient me-3 fs-4 text-info">
                <i className="ri-edit-2-fill"></i>
              </span>
              <span className="fs-4 text-danger">
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
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          New Profile
                        </Link>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns || []}
                    data={Celebrity.content || []}
                    paginateData={Celebrity}
                    customPageSize={Celebrity.size}
                    paginate={handlePagination}
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

export default withRouter(Celebrity);

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import TableContainer from "../../../Components/Common/TableContainerReactTable";

import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { isEmpty } from "lodash";
import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import withRouter from "../../../Components/Common/withRouter";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";

import { celebrity } from "../../../slices/Celebrity/thunk";

const Celebrity = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(celebrity({}, props.router.navigate));
  }, []);

  const selectLayoutState = (state) => state;
  const CelebrityProperties = createSelector(selectLayoutState, (state) => ({
    Celebrity: state.Celebrity.data,
    totalPages: state.Celebrity.totalPages,
    pageNumber: state.Celebrity.pageNumber,
    totalElements: state.Celebrity.totalElements,
  }));
  // Inside your component
  const { Celebrity, totalPages, pageNumber, totalElements } =
    useSelector(CelebrityProperties);

  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState([]);

  const handlePagination = (page) => {
    const formData = new FormData();
    formData.append("pageNo", page);
    dispatch(celebrity(formData, props.router.navigate));
  };

  const customermocalstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Active", value: "Active" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  const columns = useMemo(
    () => [
      // {
      //   header: "ID",
      //   cell: ({ rowIndex, table }) => {
      //     const realIndex =
      //       rowIndex +
      //       1 +
      //       table.getState().pagination.pageIndex *
      //         table.getState().pagination.pageSize;
      //     return <span>{realIndex}</span>;
      //   },
      //   enableColumnFilter: false,
      // },
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
        accessorKey: "nationality",
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
        enableColumnFilter: false,
        cell: (cell) => {
          return <React.Fragment>Details</React.Fragment>;
        },
      },
    ],
    []
  );

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      customer: (customer && customer.customer) || "",
      email: (customer && customer.email) || "",
      phone: (customer && customer.phone) || "",
      date: (customer && customer.date) || "",
      status: (customer && customer.status) || "",
    },
    validationSchema: Yup.object({
      customer: Yup.string().required("Please Enter Customer Name"),
      email: Yup.string().required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      status: Yup.string().required("Please Enter Your Status"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          _id: customer ? customer._id : 0,
          customer: values.customer,
          email: values.email,
          phone: values.phone,
          date: date,
          status: values.status,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          customer: values["customer"],
          email: values["email"],
          phone: values["phone"],
          date: date,
          status: values["status"],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  document.title = "Customers";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Customers" pageTitle="Ecommerce" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        <h5 className="card-title mb-0">Customer List</h5>
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>{" "}
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns || []}
                    data={Celebrity || []}
                    // customPageSize={5}
                    totalPages={totalPages}
                    pageNumber={pageNumber}
                    totalElements={totalElements}
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

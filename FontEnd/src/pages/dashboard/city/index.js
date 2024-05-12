import React, { useEffect, useMemo, useState } from "react";
// import {
//   GetCourses,
//   CreateCourses,
//   UpdateCourses,
//   deleteCourses,
// } from "../../../slices/Courses/thunk";
import { createSelector } from "reselect";
// import { findCoursesById, clearCourses } from "../../../slices/Courses/reducer";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
  FormFeedback,
} from "reactstrap";
import { message } from "antd";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { clearNotification } from "../../../slices/message/reducer";
import { clearCity } from "../../../slices/city/reducer";
import {
  getcity,
  CreateCity,
  deleteCity,
  GetEditCity,
  UpdateCity,
} from "../../../slices/city/thunk";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import TableContainer from "../../../Components/Common/TableContainerReactTable";

const Citylist = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcity({}));
  }, []);

  const [formcheck, setformcheck] = useState(false);
  const [Id, setId] = useState("");
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [modal_togtitle, setmodal_togtitle] = useState("Create New Courses");
  const [modal_detele, setmodal_detele] = useState(false);

  const selectCityState = (state) => state;

  const CitypageData = createSelector(selectCityState, (state) => ({
    CityData: state.City.data,
    item: state.City.item,
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
  }));

  const { error, success, messageSuccess, messageError, CityData, item } =
    useSelector(CitypageData);

  useEffect(() => {
    if (success) {
      if (messageSuccess != null) {
        message.success(messageSuccess);
        setmodal_togFirst(false);
      }
    }
    if (error) {
      if (messageError != null) {
        message.error(messageError);
      }
    }
    dispatch(clearNotification());
  }, [dispatch, success, error]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: item?.name || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
    }),

    onSubmit: (values) => {
      // console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);

      if (formcheck) {
        // console.log("edit: ", values);
        formData.append("id", item?.id);
        dispatch(UpdateCity(formData));
      } else {
        // console.log("create: ", values);
        dispatch(CreateCity(formData));
      }
    },
  });
  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Slug",
        accessorKey: "slug",
        enableColumnFilter: false,
      },
      {
        header: "Actions",
        accessorKey: "id",
        enableColumnFilter: false,
        cell: (cell) => {
          // return <React.Fragment>Details</React.Fragment>;
          return (
            <React.Fragment>
              <span
                className="bg-gradient me-3 fs-4 text-info"
                onClick={() => {
                  getedit(cell.getValue());
                  setformcheck(true);
                  settitle(false);
                }}
              >
                <i className="ri-edit-2-fill"></i>
              </span>

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

  const handlePagination = (page) => {
    // console.log(page);
    const formData = new FormData();
    formData.append("pageNo", page);
    dispatch(getcity(formData));
  };

  function settitle(type) {
    if (!type) {
      setmodal_togtitle("Edit City");
    } else {
      setmodal_togtitle("Create New City");
      // dispatch(clearNotificationMessage());
      dispatch(clearCity());
      validation.resetForm();
    }
  }

  function deleteitem(id) {
    console.log(id);
    if (id) {
      dispatch(deleteCity(id));
    }
  }

  function tog_togFirst() {
    validation.resetForm();
    setmodal_togFirst(!modal_togFirst);
  }

  const getedit = (id) => {
    // console.log(id);
    dispatch(GetEditCity(id));
    setmodal_togFirst(!modal_togFirst);
  };

  function tog_togdelete(id) {
    setmodal_detele(!modal_togFirst);
    if (id) {
      setId(id);
    }
  }
  document.title = "City Manager";

  return (
    <React.Fragment>
      <Row>
        <Col xs={12}>
          <div className="page-content">
            <Container fluid>
              <BreadCrumb title="City Manager" pageTitle="City" />
              <Row>
                <Col lg={12}>
                  <Card id="customerList">
                    <CardHeader className="border-0">
                      <Row className="g-4 align-items-center">
                        <div className="col-sm">
                          <div>
                            <h5 className="card-title mb-0">City Manager</h5>
                          </div>
                        </div>
                        <div className="col-sm-auto">
                          <div>
                            <Link
                              className="btn btn-success add-btn"
                              to="#"
                              onClick={() => {
                                tog_togFirst();
                                setformcheck(false);
                                settitle(true);
                              }}
                            >
                              <i className="ri-add-line align-bottom me-1"></i>{" "}
                              Add New City
                            </Link>
                          </div>
                        </div>
                      </Row>
                    </CardHeader>
                    <div className="card-body pt-0">
                      <TableContainer
                        columns={columns || []}
                        data={CityData.content || []}
                        paginateData={CityData}
                        customPageSize={CityData.size}
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
          {/* create modal */}
          <Modal
            isOpen={modal_togFirst}
            toggle={() => {
              tog_togFirst();
            }}
            centered
          >
            <ModalHeader>
              <div className="modal-title">{modal_togtitle}</div>
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
                action="#"
              >
                <div className="row g-3">
                  <Col xxl={12}>
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Name
                      </label>
                      <Input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Enter City Name"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <div className="col-lg-12">
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        color="light"
                        onClick={() => setmodal_togFirst(false)}
                      >
                        Close
                      </Button>
                      <Button color="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </ModalBody>
          </Modal>
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
                      deleteitem(Id);
                      setmodal_detele(false);
                    }}
                  >
                    Yes, Delete
                  </Button>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Citylist;

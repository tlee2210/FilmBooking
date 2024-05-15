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
} from "reactstrap";

import TableContainer from "../../../Components/Common/TableContainerReactTable";
import { message, Image } from "antd";

import withRouter from "../../../Components/Common/withRouter";
import { Link } from "react-router-dom";
//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";

import { clearNotification } from "../../../slices/message/reducer";

//redux
import { useSelector, useDispatch } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { createSelector } from "reselect";

import { getCinema } from "../../../slices/Cinemas/thunk";

const Cinema = (props) => {
  const dispatch = useDispatch();

  const [modal_detele, setmodal_detele] = useState(false);
  const [modal_togFirst, setmodal_togFirst] = useState(false);
  const [slug, setSlug] = useState("");

  const CinemaState = (state) => state;
  const CinemaStateData = createSelector(CinemaState, (state) => ({
    success: state.Message.success,
    error: state.Message.error,
    messageSuccess: state.Message.messageSuccess,
    messageError: state.Message.messageError,
    Cinema: state.Cinema.data,
  }));
  // Inside your component
  const { error, success, messageSuccess, messageError, Cinema } =
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

  useEffect(() => {
    dispatch(getCinema({}, props.router.navigate));
  }, []);
  useEffect(() => {
    console.log(slug);
  }, [slug]);

  const handlePagination = (page) => {
    const formData = new FormData();
    formData.append("pageNo", page);
    console.log(page);
    dispatch(getCinema(formData, props.router.navigate));
  };

  function tog_togdelete(slug) {
    setmodal_detele(!modal_togFirst);
    // console.log(slug);
    if (slug) {
      setSlug(slug);
    }
  }

  function deleteitem(slug) {
    console.log("delete : " + slug);
    if (slug) {
      // dispatch(deleteCelebrity(id));
    }
  }

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
        header: "Address",
        accessorKey: "address",
        enableColumnFilter: false,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableColumnFilter: false,
      },
      {
        header: "city",
        accessorKey: "city",
        cell: (cell) => {
          return <span>{cell.getValue()?.name}</span>;
        },
        enableColumnFilter: false,
      },
      // {
      //   header: "Description",
      //   accessorKey: "description",
      //   cell: (cell) => {
      //     return <div dangerouslySetInnerHTML={{ __html: cell.getValue() }} />;
      //   },
      //   enableColumnFilter: false,
      // },
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
                          to={`/dashboard/celebrity/create`}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          New Cinema
                        </Link>
                      </div>
                    </div>
                  </Row>
                </CardHeader>
                <div className="card-body pt-0">
                  <TableContainer
                    columns={columns || []}
                    data={Cinema.content || []}
                    paginateData={Cinema}
                    customPageSize={Cinema.size}
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

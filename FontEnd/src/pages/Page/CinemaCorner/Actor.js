import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  FormGroup,
  Button,
} from "reactstrap";
import "./css/CinemaCorner.css";
import { createSelector } from "reselect";
import { message, Image } from "antd";

import { getHomeActor } from "../../../slices/home/ActorHome/thunk";
import withRouter from "../../../Components/Common/withRouter";
import { useSelector, useDispatch } from "react-redux";

import RightColumn from "./RightColumn";

const HomeActor = () => {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [pageNo, setPageNo] = useState(
    parseInt(searchParams.get("pageNo"), 10) || 1
  );
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize"), 10) || 10
  );
  const CelebrityState = (state) => state;
  const CelebrityStateData = createSelector(CelebrityState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    data: state.HomeCelebrity.data,
  }));

  const { error, messageError, data } = useSelector(CelebrityStateData);

  useEffect(() => {
    let params = {};

    // if (role && role !== null && role !== undefined) {
    //   params.role = role;
    // }

    params.pageNo = pageNo;
    params.pageSize = pageSize;

    setSearchParams(params);

    dispatch(getHomeActor(pageNo, pageSize));
  }, [dispatch, pageNo, pageSize]);

  const handlePagination = (page) => {
    // console.log(page);
    const newPageNo = page + 1;
    setPageNo(newPageNo);
    setSearchParams({ pageNo: newPageNo, pageSize });
  };

  // HomeCelebrity

  document.title = "Actor";

  return (
    <React.Fragment>
      <Container style={{ paddingTop: 100 }}>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col lg={8}>
                <div className="director-header-container-cinemaCorner">
                  <Row className="align-items-center">
                    <Col md="3" className="d-flex align-items-center">
                      <div className="title-icon-cinemaCorner"></div>
                      <h2 className="title-cinemaCorner">ACTOR</h2>
                    </Col>
                    <Col md="9" className="d-flex justify-content-end">
                      <Input
                        type="select"
                        className="custom-select-cinemaCorner mx-2"
                      >
                        <option>Quốc Gia</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                      </Input>
                    </Col>
                  </Row>
                  <div className="bottom-border"></div>
                </div>
                {data && data.content
                  ? data.content.map((item, index) => (
                      <Link
                        to="/dien-vien/dien-vien-details"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        key={index}
                      >
                        <Col className="mb-4 mt-4">
                          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                            <Row className="g-0">
                              <Col md={3}>
                                <Image
                                  width={140}
                                  src={item.image}
                                  alt={item.image}
                                />
                              </Col>
                              <Col md={8}>
                                <CardHeader>
                                  <h1 className="title-cinemaCorner-name mb-0">
                                    {item.name}
                                  </h1>
                                </CardHeader>
                                <CardBody>
                                  <p
                                    className="card-text mb-2 text-muted"
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Biography: {item.biography}
                                  </p>
                                  <p
                                    className="card-text mb-2 text-muted"
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Description: {item.description}
                                  </p>
                                </CardBody>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Link>
                    ))
                  : null}
                <div className="col-sm-auto mb-3">
                  <ul className="pagination pagination-separated pagination-md justify-content-center justify-content-sm-start mb-0">
                    <li
                      className={
                        data.number === 0 ? "page-item disabled" : "page-item"
                      }
                    >
                      <Link
                        to="#"
                        className="page-link"
                        onClick={() => {
                          handlePagination(data.number - 1);
                        }}
                      >
                        Previous
                      </Link>
                    </li>

                    {[...Array(data?.totalPages)].map((_, index) => (
                      <li key={index} className="page-item">
                        <Link
                          to="#"
                          className={
                            data.number === index
                              ? "page-link active"
                              : "page-link"
                          }
                          onClick={() => {
                            if (data.number !== index) {
                              // setPageIndex(index);
                              handlePagination(index);
                            }
                          }}
                        >
                          {index + 1}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={
                        data.number === data.totalPages - 1
                          ? "page-item disabled"
                          : "page-item"
                      }
                    >
                      <Link
                        to="#"
                        className="page-link"
                        onClick={() => {
                          // nextPage;
                          handlePagination(data.number + 1);
                        }}
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

              {/* Bên Phải */}
              <Col lg={4}>
                <RightColumn />
                <div className="button-dien-vien">
                  <Button
                    color="secondary"
                    outline
                    className="waves-effect waves-light material-shadow-none"
                  >
                    {" "}
                    Xem Thêm <i className="bx bx-right-arrow-alt"></i>{" "}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default HomeActor;

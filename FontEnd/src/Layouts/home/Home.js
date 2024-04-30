import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Form,
  Input,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

// import Avatar3 from "../../../assets/images/users/avatar-3.jpg";
// import Avatar9 from "../../../assets/images/users/avatar-9.jpg";
// import Avatar10 from "../../../assets/images/users/avatar-10.jpg";
// import JobProfile2 from "../../../assets/images/job-profile2.png";

const Home = () => {
  return (
    <React.Fragment>
      <section className="section job-hero-section bg-light pb-0" id="hero">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg={6}>
            <div>
                <h1 className="display-6 fw-semibold text-capitalize mb-3 lh-base">
                  Find your next job and build your dream here
                </h1>
                <p className="lead text-muted lh-base mb-4">
                  Find jobs, create trackable resumes and enrich your
                  applications. Carefully crafted after analyzing the needs of
                  different industries.
                </p>
                <Form action="#" className="job-panel-filter">
                  <Row className="g-md-0 g-2">
                    <Col className="col-md-4">
                      <div>
                        <Input
                          type="search"
                          id="job-title"
                          className="form-control filter-input-box"
                          placeholder="Job, Company name..."
                        />
                      </div>
                    </Col>
                    <Col className="col-md-4">
                      <div>
                        <select className="form-control" data-choices>
                          <option value="">Select job type</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Intership">Intership</option>
                        </select>
                      </div>
                    </Col>
                    <Col className="col-md-4">
                      <div className="h-100">
                        <button
                          className="btn btn-primary submit-btn w-100 h-100"
                          type="submit"
                        >
                          <i className="ri-search-2-line align-bottom me-1"></i>{" "}
                          Find Job
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>

                <ul className="treding-keywords list-inline mb-0 mt-3 fs-13">
                  <li className="list-inline-item text-danger fw-semibold">
                    <i className="mdi mdi-tag-multiple-outline align-middle"></i>{" "}
                    Trending Keywords:
                  </li>
                  <li className="list-inline-item">
                    <Link to="#!">
                      Design,
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#!">
                      Development,
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#!">
                      Manager,
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#!">
                      Senior
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
           
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Home;

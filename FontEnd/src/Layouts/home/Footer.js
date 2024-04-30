import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import LogoLight from "../../assets/images/logo-light.png";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="custom-footer bg-dark py-5 position-relative">
        <Container>
          <Row>
            <Col className="col-lg-4 mt-4">
              <div>
                <div>
                  <img src={LogoLight} alt="logo light" height="17" />
                </div>
                <div className="mt-4 fs-13">
                  <p>elcome to MovieLand</p>
                  <p>
                    Discover a world of cinema with us. MovieLand offers a vast
                    collection of movies from all genres, directors, and eras.
                    Explore filmographies, track your favorite actors, and dive
                    into the cinematic universe. Join us for movie reviews,
                    upcoming releases, and insightful discussions about the film
                    industry.
                  </p>
                  <ul className="list-inline mb-0 footer-social-link">
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-facebook-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-github-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-linkedin-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-google-fill"></i>
                        </div>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#!" className="avatar-xs d-block">
                        <div className="avatar-title rounded-circle">
                          <i className="ri-dribbble-line"></i>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col className="col-lg-7 ms-lg-auto">
              <Row>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Company</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-16">
                      <li>
                        <Link to="/pages-profile">About Us</Link>
                      </li>
                      <li>
                        <Link to="/pages-gallery">Gallery</Link>
                      </li>
                      <li>
                        <Link to="/pages-team">Team</Link>
                      </li>
                      <li>
                        <Link to="/pages-pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/pages-timeline">Timeline</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Film Corner</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-16">
                      <li>
                        <Link to="/apps-job-lists">Movie Genres</Link>
                      </li>
                      <li>
                        <Link to="/apps-job-application">Movie Reviews</Link>
                      </li>
                      <li>
                        <Link to="/apps-job-new">Movie Blog</Link>
                      </li>
                      <li>
                        <Link to="/apps-job-companies-lists">
                          Top Movies of the Month
                        </Link>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col className="col-sm-4 mt-4">
                  <h5 className="text-white mb-0">Support</h5>
                  <div className="text-muted mt-3">
                    <ul className="list-unstyled ff-secondary footer-list fs-16">
                      <li>
                        <Link to="/pages-faqs">Feedback</Link>
                      </li>
                      <li>
                        <Link to="/pages-faqs">Careers</Link>
                      </li>
                      <li>
                        <Link to="/pages-faqs">Contact</Link>
                      </li>
                      <li>
                        <Link to="/pages-faqs">FAQ</Link>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="text-center text-sm-start align-items-center mt-5">
            <Col className="col-sm-6">
              <div>
                <p className="copy-rights mb-0">
                  {new Date().getFullYear()} ©Themesbrand -Tlee
                </p>
              </div>
            </Col>
            <Col className="col-sm-6">
              <div className="text-sm-end mt-3 mt-sm-0">
                <ul className="list-inline mb-0 footer-list gap-4 fs-15">
                  <li className="list-inline-item">
                    <Link to="/pages-privacy-policy">Privacy Policy</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/pages-term-conditions">Terms & Conditions</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/pages-privacy-policy">Security</Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Footer;

import React from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  CardHeader,
  Button,
  Alert,
  UncontrolledDropdown,
} from "reactstrap";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { SessionsByCountriesCharts } from "./WidgetsCharts";
import { AudiencesMetricsCharts } from "./WidgetsCharts";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Mousewheel } from "swiper/modules";
// import img3 from "../../assets/images/products/img-3.png";
import img from "../../assets/images/productsTest/img-3.png";

import BreadCrumb from "../../Components/Common/BreadCrumb";

const Starter = () => {
  const widgetsAudiences = [
    {
      id: 1,
      subCounter: [{ id: 1, counter: "854", suffix: "", prefix: "" }],
      caption: "Avg. Session",
      percentage: "49%",
    },
    {
      id: 2,
      subCounter: [
        {
          id: 1,
          counter: "1278",
          decimals: 0,
          separator: ",",
          suffix: "",
          prefix: "",
        },
      ],
      caption: "Conversion Rate",
      percentage: "60%",
    },
    {
      id: 3,
      subCounter: [
        {
          id: 1,
          counter: "3",
          decimals: 0,
          suffix: "m ",
          prefix: "",
        },
        {
          id: 2,
          counter: "40",
          decimals: 0,
          suffix: "sec",
          prefix: "",
        },
      ],
      caption: "Avg. Ses. Duration",
    },
  ];
  const tileBoxs1 = [
    {
      id: 1,
      label: "Total Earnings",
      labelClass: "muted",
      percentage: "+16.24 %",
      percentageClass: "success",
      percentageIcon: "ri-arrow-right-up-line",
      counter: "559.25",
      caption: "View net earnings",
      icon: "bx bx-dollar-circle",
      iconClass: "success-subtle",
      color: "success",
      decimals: 2,
      prefix: "$",
      suffix: "k",
    },
    {
      id: 2,
      label: "Orders",
      labelClass: "white-50",
      percentage: "-3.57 %",
      percentageClass: "warning",
      percentageIcon: "ri-arrow-right-down-line",
      counter: "36894",
      caption: "View all orders",
      icon: "bx bx-shopping-bag",
      iconClass: "white bg-opacity-25",
      bgColor: "bg-info",
      counterClass: "text-white",
      captionClass: "text-white-50",
      decimals: 0,
      prefix: "",
      separator: ",",
      suffix: "",
    },
    {
      id: 3,
      label: "Customers",
      labelClass: "muted",
      percentage: "+29.08 %",
      percentageClass: "success",
      percentageIcon: "ri-arrow-right-up-line",
      counter: "183.35",
      caption: "See details",
      icon: "bx bx-user-circle",
      iconClass: "warning-subtle",
      color: "warning",
      decimals: 2,
      prefix: "",
      suffix: "M",
    },
    {
      id: 4,
      label: "My Balance",
      labelClass: "muted",
      percentage: "+0.00 %",
      percentageClass: "muted",
      counter: "165.89",
      caption: "Withdraw money",
      icon: "bx bx-wallet",
      iconClass: "primary-subtle",
      color: "primary",
      decimals: 2,
      prefix: "$",
      separator: ",",
      suffix: "k",
    },
  ];
  document.title = "Starter";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Starter" pageTitle="Pages" />
          <Row>
            {(tileBoxs1 || []).map((item, key) => (
              <Col xl={3} md={6} key={key}>
                <Card className={"card-animate " + item.bgColor}>
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <p
                          className={
                            "text-uppercase fw-medium mb-0 text-" +
                            item.labelClass
                          }
                        >
                          {item.label}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5
                          className={"fs-14 mb-0 text-" + item.percentageClass}
                        >
                          <i
                            className={
                              "fs-13 align-middle " + item.percentageIcon
                            }
                          ></i>{" "}
                          {item.percentage}
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4
                          className={
                            "fs-22 fw-semibold ff-secondary mb-4 " +
                            item.counterClass
                          }
                        >
                          <span className="counter-value" data-target="559.25">
                            <CountUp
                              start={0}
                              prefix={item.prefix}
                              suffix={item.suffix}
                              separator={item.separator}
                              end={item.counter}
                              decimals={item.decimals}
                              duration={4}
                            />
                          </span>
                        </h4>
                        <Link
                          to="#"
                          className={
                            "text-decoration-underline " + item.captionClass
                          }
                        >
                          {item.caption}
                        </Link>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span
                          className={
                            "avatar-title rounded fs-3 material-shadow bg-" +
                            item.iconClass
                          }
                        >
                          <i className={item.icon + " text-" + item.color}></i>
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col xxl={6} xl={6}>
              <Card className="card-height-100">
                <CardHeader className="align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Sessions by Countries
                  </h4>
                  <div>
                    <Button
                      color="secondary"
                      size="sm"
                      className="btn-soft-secondary me-1 material-shadow-none"
                    >
                      ALL
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      className="btn-soft-primary me-1 material-shadow-none"
                    >
                      1M
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      className="btn-soft-secondary material-shadow-none"
                    >
                      6M
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="p-0">
                  <div>
                    <div
                      id="countries_charts"
                      className="apex-charts"
                      dir="ltr"
                    >
                      {/* Sessions by Countries */}
                      <SessionsByCountriesCharts dataColors='["--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-danger", "--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-info"]' />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xxl={6}>
              <Card className="card-height-100">
                <CardHeader className="border-0 align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Audiences Metrics
                  </h4>
                  {/* <div>
                    <Button
                      color="secondary"
                      size="sm"
                      className="btn-soft-secondary me-1 material-shadow-none"
                    >
                      ALL
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      className="btn-soft-secondary me-1 material-shadow-none"
                    >
                      1M
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      className="btn-soft-secondary me-1 material-shadow-none"
                    >
                      6M
                    </Button>
                    <Button
                      color="primary"
                      size="sm"
                      className="btn-soft-primary material-shadow-none"
                    >
                      1Y
                    </Button>
                  </div> */}
                </CardHeader>

                <CardBody className="p-0 pb-2">
                  <div>
                    <div
                      id="audiences_metrics_charts"
                      className="apex-charts"
                      dir="ltr"
                    >
                      {/* Audiences Metrics Chart */}
                      <AudiencesMetricsCharts dataColors='["--vz-success", "--vz-gray-300"]' />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Starter;

import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import withRouter from "../../Components/Common/withRouter";
import PropTypes from "prop-types";
// import { Container } from "reactstrap";
// import {
//   useLocation,
//   useNavigate,
//   useParams
// } from "react-router-dom";

const LayoutHome = (props) => {

  window.onscroll = function () {
    scrollFunction();
  };

  const scrollFunction = () => {
    const element = document.getElementById("back-to-top");
    if (element) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
  };

  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <React.Fragment>
      <div className="layout-wrapper landing">
        <Navbar />
        {props.children}
        <Footer />
        <button
          onClick={() => toTop()}
          className="btn btn-info btn-icon landing-back-top"
          id="back-to-top"
        >
          <i className="ri-arrow-up-line"></i>
        </button>
      </div>
    </React.Fragment>
  );
};
LayoutHome.propTypes = {
  children: PropTypes.object,
};
export default withRouter(LayoutHome);

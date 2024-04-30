import React from "react";
import Footer from "../../Layouts/home/Footer";
import Home from "../../Layouts/home/Home";
import Navbar from "../../Layouts/home/Navbar";
import LayoutHome from "../../Layouts/home/index";

const JobLanding = () => {
  document.title = "home";

  return (
    <React.Fragment>
      <div className="layout-wrapper landing">
        <Home />

        {/* <button
          onClick={() => toTop()}
          className="btn btn-info btn-icon landing-back-top"
          id="back-to-top"
        >
          <i className="ri-arrow-up-line"></i>
        </button> */}
      </div>
    </React.Fragment>
  );
};

export default JobLanding;

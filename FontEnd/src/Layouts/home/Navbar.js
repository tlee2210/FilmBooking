import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scrollspy from "react-scrollspy";
import { Collapse, Container, NavbarToggler, NavLink, Dropdown, dropdownOpen, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import LogoDark from "../../assets/images/logo-dark.png";
import LogoLight from "../../assets/images/logo-light.png";

import Ticket from "../../assets/images/Ticket.png";
import { color } from "echarts";

const Navbar = () => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setisOpenMenu(!isOpenMenu);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  const scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > 50) {
      setnavClass(" is-sticky");
    } else {
      setnavClass("");
    }
  };

  const [activeLink, setActiveLink] = useState();
  useEffect(() => {
    const activation = (event) => {
      const target = event.target;
      if (target) {
        target.classList.add("active");
        setActiveLink(target);
        if (activeLink && activeLink !== target) {
          activeLink.classList.remove("active");
        }
      }
    };
    const defaultLink = document.querySelector(".navbar li.a.active");
    if (defaultLink) {
      defaultLink?.classList.add("active");
      setActiveLink(defaultLink);
    }
    const links = document.querySelectorAll(".navbar a");
    links.forEach((link) => {
      link.addEventListener("click", activation);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", activation);
      });
    };
  }, [activeLink]);

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navbar-landing fixed-top job-navbar" +
          navClass
        }
        id="navbar"
      >
        <Container fluid className="custom-container">
          <Link className="navbar-brand" to="/">
            <img
              src={LogoDark}
              className="card-logo card-logo-dark"
              alt="logo dark"
              height="17"
            />
            <img
              src={LogoLight}
              className="card-logo card-logo-light"
              alt="logo light"
              height="17"
            />
          </Link>
          <NavbarToggler
            onClick={toggle}
            className="navbar-toggler py-0 fs-20 text-body"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="mdi mdi-menu"></i>
          </NavbarToggler>

          <Collapse
            className="navbar-collapse"
            id="navbarSupportedContent"
            isOpen={isOpenMenu}
          >
            <Scrollspy
              offset={-18}
              items={[
                "hero",
                "process",
                "categories",
                "findJob",
                "candidates",
                "blog",
              ]}
              currentClassName="active"
              className="navbar-nav mx-auto mt-2 mt-lg-0"
              id="navbar-example"
            >
              <li className="nav-item">
                <NavLink
                  className="fs-16"
                  href="#Movies"
                  style={{
                    marginTop: "-5px",
                  }}
                >
                  <img src={Ticket} height={36} width={112} />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-16" href="#Movies">
                  Movies
                </NavLink>
              </li>
              <li
                className='nav-item'
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle className='fs-16 nav-link' caret style={{ backgroundColor: 'transparent', color: 'black', borderColor: 'transparent' }}>
                    Cinema Corner
                  </DropdownToggle>
                  <DropdownMenu style={{boxShadow:"20px 20px 50px 10px #95d8f3 inset"}}>
                    <DropdownItem tag={Link} to='/the-loai-phim'>
                      Thể Loại Phim
                    </DropdownItem>
                    <DropdownItem tag={Link} to='/dien-vien'>
                      Diễn Viên
                    </DropdownItem>
                    <DropdownItem tag={Link} to='/dao-dien'>
                      Đạo Diễn
                    </DropdownItem>
                    <DropdownItem tag={Link} to='/binh-luan-phim'>
                      Bình Luận Phim
                    </DropdownItem>
                    <DropdownItem tag={Link} to='/Cinema-Corner'>
                      Blog Điện Ảnh
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
              <li className="nav-item">
                <NavLink className="fs-16" href="#Cinema">
                  Cinema
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-16" href="#Events">
                  Events
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="fs-16" href="/rap-phim">
                  Rạp Phim
                </NavLink>
              </li>
            </Scrollspy>

            <div>
              <Link to="/login" className="btn btn-soft-primary">
                <i className="ri-user-3-line align-bottom me-1"></i> Login &
                Register
              </Link>
            </div>
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;

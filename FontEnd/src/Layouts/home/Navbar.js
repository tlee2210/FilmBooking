import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/MoviesDropdown.css";
import Scrollspy from "react-scrollspy";
import { createSelector } from "reselect";
import {
  Collapse,
  Container,
  NavbarToggler,
  NavLink,
  Dropdown,
  dropdownOpen,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";
import LogoDark from "../../assets/images/logo-dark.png";
import LogoLight from "../../assets/images/logo-light.png";

import Ticket from "../../assets/images/Ticket.jpg";
import { getNavbar } from "../../slices/home/MovieHome/thunk";
import { useSelector, useDispatch } from "react-redux";

import buttonTicket from '../../assets/images/buttonTicket/btn-ticket.png';

// getNavbar

const Navbar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNavbar());
  }, [dispatch]);

  const MovieState = (state) => state;
  const MovieStateData = createSelector(MovieState, (state) => ({
    error: state.Message.error,
    messageError: state.Message.messageError,
    navbarData: state.HomeMovie.navbarData,
  }));
  const { error, messageError, navbarData } = useSelector(MovieStateData);
  console.log(navbarData);
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [navClass, setnavClass] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [moviesDropdownOpen, setMoviesDropdownOpen] = useState(false);

  const toggle = () => setisOpenMenu(!isOpenMenu);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMoviesDropdown = () =>
    setMoviesDropdownOpen((prevState) => !prevState);

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

  const moviesComingSoon = [
    {
      img: "https://cdn.galaxycine.vn/media/2024/6/4/mua-he-dep-nhat-2_1717486022304.jpg",
      name: "Mùa Hè Đẹp Nhất",
      link: "/phim-sap-chieu",
    },
    {
      img: "https://cdn.galaxycine.vn/media/2024/5/6/inside-out-2-3_1714970461256.jpg",
      name: "Những Mảnh Ghép Cảm Xúc 2",
      link: "/phim-sap-chieu",
    },
    {
      img: "https://cdn.galaxycine.vn/media/2024/5/6/inside-out-2-3_1714970461256.jpg",
      name: "Những Mảnh Ghép Cảm Xúc 2",
      link: "/phim-sap-chieu",
    },
    {
      img: "https://cdn.galaxycine.vn/media/2024/5/6/inside-out-2-3_1714970461256.jpg",
      name: "Những Mảnh Ghép Cảm Xúc 2",
      link: "/phim-sap-chieu",
    },
  ];

  return (
    <React.Fragment>
      <nav
        style={{ backgroundColor: "white" }}
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
                  <img src={buttonTicket} height={36} width={112} />
                </NavLink>
              </li>

              {/* Movies */}
              <li
                className="nav-item dropdown-nav-movies"
                onMouseEnter={() => setMoviesDropdownOpen(true)}
                onMouseLeave={() => setMoviesDropdownOpen(false)}
              >
                <Dropdown
                  isOpen={moviesDropdownOpen}
                  toggle={toggleMoviesDropdown}
                >
                  <DropdownToggle
                    className="fs-16 nav-link"
                    caret
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      borderColor: "transparent",
                    }}
                  >
                    Movies
                  </DropdownToggle>
                  <DropdownMenu className="movies-dropdown-menu">
                    <DropdownItem className="header-movies-dropdown" header>
                      Movies Showing Now
                    </DropdownItem>
                    <Row>
                      {navbarData && navbarData?.movieShowingList
                        ? navbarData?.movieShowingList?.map((movie, index) => (
                          <Col md={3} key={index}>
                            <DropdownItem
                              tag={Link}
                              to={`/booking/${movie.slug}`}
                              className="movie-item"
                            >
                              <div className="movie-thumbnail">
                                <img
                                  src={movie.imagePortrait}
                                  alt={movie.name}
                                />
                                <div className="movie-overlay">
                                  <button className="ticket-button">
                                   <img style={{filter:'blur(0px)'}} src={buttonTicket}/>
                                  </button>
                                </div>
                              </div>
                              <div className="movie-name">{movie.name}</div>
                            </DropdownItem>
                          </Col>
                        ))
                        : null}
                    </Row>
                    <DropdownItem className="header-movies-dropdown" header>
                      Movie coming soon
                    </DropdownItem>
                    <Row>
                      {navbarData && navbarData?.movieSoonList
                        ? navbarData?.movieSoonList?.map((movie, index) => (
                          <Col md={3} key={index}>
                            <DropdownItem
                              tag={Link}
                              to={`/booking/${movie.slug}`}
                              className="movie-item"
                            >
                              <div className="movie-thumbnail">
                                <img
                                  src={movie.imagePortrait}
                                  alt={movie.name}
                                />
                                <div className="movie-overlay">
                                  <button class="ticket-button">
                                  <img style={{filter:'blur(0px)'}} src={buttonTicket}/>
                                  </button>
                                </div>
                              </div>
                              <div className="movie-name">{movie.name}</div>
                            </DropdownItem>
                          </Col>
                        ))
                        : null}
                    </Row>
                  </DropdownMenu>
                </Dropdown>
              </li>

              {/* CinemaCorner */}
              <li
                className="nav-item"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                  <DropdownToggle
                    className="fs-16 nav-link"
                    caret
                    style={{
                      backgroundColor: "transparent",
                      color: "black",
                      borderColor: "transparent",
                    }}
                  >
                    Cinema Corner
                  </DropdownToggle>
                  <DropdownMenu style={{}}>
                    {/* <DropdownItem tag={Link} to="/the-loai-phim">
                      Thể Loại Phim
                    </DropdownItem> */}
                    <DropdownItem tag={Link} to="/actor">
                      Actor
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/director">
                      Director
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/blog-movie">
                      Blog Movie
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/movie-commentary">
                      Movie Commentary
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

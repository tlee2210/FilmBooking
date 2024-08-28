import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { createSelector } from "reselect";
import avatar from "../../assets/images/User-avatar.png";
import { logoutUser } from "../../slices/auth/login/thunk";
import { useSelector, useDispatch } from "react-redux";

// import avatar6 from "../../assets/images/users/avatar-6.jpg";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [avatar1, setavatar] = useState(null);
  const [role, setrole] = useState(null);

  useEffect(() => {
    const authUserString = sessionStorage.getItem("authUser");
    if (authUserString) {
      const userObj = JSON.parse(authUserString);
      // setavatar(userObj.user.avatar);
      setUserName(userObj.user.name);
      setavatar(userObj.user.avatar);
      setrole(userObj.user.role);
      // console.log(userObj.user);
    }
  }, []);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
  };
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1 ? avatar1 : avatar}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {userName}
              </span>
              {role !== "USER" ? (
                <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                  {role}
                  {/* Founder */}
                </span>
              ) : null}
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {role !== "USER" ? (
            <h6 className="dropdown-header">Welcome {role}!</h6>
          ) : null}
          <DropdownItem className="p-0">
            <Link to="/profile" className="dropdown-item">
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle">Profile</span>
            </Link>
          </DropdownItem>
          {role !== "USER" ? (
            <React.Fragment>
              <DropdownItem className="p-0">
                <Link to="/dashboard/users" className="dropdown-item">
                  {/* <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "} */}
                  <span className="align-middle">Dashboard</span>
                </Link>
              </DropdownItem>
              {/* <DropdownItem className="p-0">
                <Link to="/" className="dropdown-item">
                  <span className="align-middle">Home</span>
                </Link>
              </DropdownItem> */}
            </React.Fragment>
          ) : null}
          {/* <DropdownItem className="p-0">
            <Link to="/apps-chat" className="dropdown-item">
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Messages</span>
            </Link>
          </DropdownItem> */}
          {/* <DropdownItem className="p-0">
            <Link to="#" className="dropdown-item">
              <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Taskboard</span>
            </Link>
          </DropdownItem> */}
          {/* <DropdownItem className="p-0">
            <Link to="/pages-faqs" className="dropdown-item">
              <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Help</span>
            </Link>
          </DropdownItem> */}
          <div className="dropdown-divider"></div>
          <DropdownItem className="p-0">
            {/* <Link to="/logout" className="dropdown-item">
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Logout
              </span>
            </Link> */}
            <a className="dropdown-item" onClick={handleLogOut}>
              <i className=" ri-logout-box-r-fill text-muted fs-16 align-middle me-1"></i>{" "}
              log Out
            </a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;

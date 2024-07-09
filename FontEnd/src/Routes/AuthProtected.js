import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../slices/auth/login/thunk";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();

  // useEffect(() => {
  //   if (userProfile && !loading && token) {
  //     setAuthorization(token);
  //   } else if (!userProfile && loading && !token) {
  //     dispatch(logoutUser());
  //   }
  // }, [token, userProfile, loading, dispatch]);

  // console.log("userProfile :", userProfile);
  if (!userProfile) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

// const AccessRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return (
//           <>
//             {" "}
//             <Component {...props} />{" "}
//           </>
//         );
//       }}
//     />
//   );
// };

//admin
const AdminProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, token } = useProfile();

  // console.log("userProfile: ", userProfile);
  if (!userProfile) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  } else {
    const user = userProfile.user;
    if (user && user.role !== "ADMIN" && user.role !== "MANAGER") {
      return (
        <Navigate to={{ pathname: "/", state: { from: props.location } }} />
      );
    }
  }
  useEffect(() => {
    if (userProfile && token) {
      setAuthorization(token);
    } else if (!userProfile && !token) {
      dispatch(logoutUser());
    }
  }, [token, userProfile, dispatch]);

  return <>{props.children}</>;
};

//login
const AccessRoute = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();

  if (userProfile) {
    return <Navigate to={{ pathname: "/", state: { from: props.location } }} />;
  }

  return <>{props.children}</>;
};

export { AuthProtected, AdminProtected, AccessRoute };

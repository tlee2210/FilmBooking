import React from "react";

//import Scss
import "./assets/scss/themes.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
//imoprt Route
import Route from "./Routes";
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// // init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId="724460963519-pn71te5d6a2p37sv18ql7dv3j1e9cgu4.apps.googleusercontent.com">
        <Route />
      </GoogleOAuthProvider>
    </React.Fragment>
  );
}

export default App;

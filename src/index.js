import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import axios from "axios";
import decode from "jwt-decode";
import { loginSuccess } from "./features/login/loginPageSlice";
import { JWT_LOCAL_STORAGE_KEY } from "./constants/constants";

// Regenerate token in store if exists in localstorage
if (localStorage.getItem(JWT_LOCAL_STORAGE_KEY)) {
   const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
   let tokenDecoded = decode(token);
   store.dispatch(loginSuccess({ name: tokenDecoded.name }));
   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

ReactDOM.render(
   // <React.StrictMode>
   <Provider store={store}>
      <App />
   </Provider>,
   // </React.StrictMode>,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

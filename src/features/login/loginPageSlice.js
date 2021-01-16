import { createSlice } from "@reduxjs/toolkit";
import { authenticate } from "./loginPageService";
import decode from "jwt-decode";
import axios from "axios";
import { JWT_LOCAL_STORAGE_KEY } from "../../constants/constants";
import { HOME_ROUTE } from "../../constants/routes";

export const loginPageSlice = createSlice({
   name: "loginPageSlice",
   initialState: {
      userInfo: {},
      userLoggedIn: false,
      badCredentials: false,
      loginInProgress: false,
      loginServerFailed: false,
   },
   reducers: {
      loginProcessStart: (state) => {
         state.userInfo = {};
         state.userLoggedIn = false;
         state.badCredentials = false;
         state.loginInProgress = true;
         state.loginServerFailed = false;
      },
      loginSuccess: (state, action) => {
         state.userInfo = action.payload;
         state.userLoggedIn = true;
         state.badCredentials = false;
         state.loginInProgress = false;
         state.loginServerFailed = false;
      },
      loginFailed: (state) => {
         state.userInfo = {};
         state.userLoggedIn = false;
         state.badCredentials = true;
         state.loginInProgress = false;
         state.loginServerFailed = false;
      },
      loginServerFailed: (state) => {
         state.userInfo = {};
         state.userLoggedIn = false;
         state.badCredentials = false;
         state.loginInProgress = false;
         state.loginServerFailed = true;
      },
      logout: (state) => {
         state.userInfo = {};
         state.userLoggedIn = false;
         state.badCredentials = false;
         state.loginInProgress = false;
         state.loginServerFailed = false;
      },
   },
});

export const login = (username, password) => async (dispatch) => {
   dispatch(loginProcessStart());
   try {
      const response = await authenticate(username, password);
      const token = response.token;
      if (token) {
         localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);
         axios.defaults.headers.common["Authorization"] = "Bearer " + token;

         let decodedToken = decode(token);
         dispatch(loginSuccess({ name: decodedToken.name }));

         window.location.href = HOME_ROUTE;
      } else {
         dispatch(loginFailed());
      }
   } catch (ex) {
      console.log(ex);
      dispatch(loginServerFailed());
   }
};

export const { loginSuccess, loginFailed, loginProcessStart, loginServerFailed, logout } = loginPageSlice.actions;
export default loginPageSlice.reducer;

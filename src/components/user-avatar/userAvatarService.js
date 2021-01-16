import axios from "axios";
import { logout } from "../../features/login/loginPageSlice";
import { ROOT_ROUTE } from "../../constants/routes";
import { JWT_LOCAL_STORAGE_KEY } from "../../constants/constants";

export function signOut(dispatch) {
   localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);
   delete axios.defaults.headers.common["Authorization"];
   dispatch(logout());
   window.location.href = ROOT_ROUTE;
}

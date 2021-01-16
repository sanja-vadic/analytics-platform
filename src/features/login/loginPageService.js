import axios from "axios";
import { config } from "../../constants/environment";

export async function authenticate(username, password) {
   let response = await axios.post(config.api.authUrl, { username: username, password: password });
   let data = await response.data;
   return data;
}

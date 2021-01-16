import axios from "axios";

export async function fetchClientSites() {
   let apiResponse = await axios.get("https://run.mocky.io/v3/67890df9-ef66-43e7-8652-2a072cda5677");
   return apiResponse;
}

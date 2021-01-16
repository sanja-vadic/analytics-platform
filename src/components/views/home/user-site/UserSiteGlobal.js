import UserSite from "./UserSite";
import withGroupIntervalFetch from "../../../../common/graph-util/hoc/interval-fetch/withGroupIntervalFetch";
import { HOME_DASHBOARD_USER_SITES_GROUP } from "../../../../constants/constants";

export default withGroupIntervalFetch(UserSite, HOME_DASHBOARD_USER_SITES_GROUP);

import { HOME_ACQUISITION_OVERVIEW_VIEW, HOME_SITE_LOAD_SPEED_VIEW, HOME_TOTAL_VISITORS_VIEW, HOME_USERS_COUNTRY_VIEW, HOME_USERS_DEVICE_VIEW } from "../../constants/constants";
import TotalVisitors from '../../components/views/home/total-visitors/TotalVisitors';
import AcquisitionOverview from '../../components/views/home/acquisition-overview/AcquisitionOverview';
import UsersCountry from '../../components/views/home/users-country/UsersCountry';
import UsersDevice from '../../components/views/home/users-device/UsersDevice';
import {fetchData as totalVisitorsFetchData} from '../../components/views/home/total-visitors/totalVisitorsService';
import {fetchData as acquisitionOverviewFetchData} from '../../components/views/home/acquisition-overview/acquisitionOverviewService';
import {fetchData as usersCountryFetchData} from '../../components/views/home/users-country/usersCountryService';
import {fetchData as usersDeviceFetchData} from '../../components/views/home/users-device/usersDeviceService';

export const viewMappings = {
   [HOME_TOTAL_VISITORS_VIEW]: {component: TotalVisitors, fetchData: totalVisitorsFetchData},
   [HOME_ACQUISITION_OVERVIEW_VIEW]: {component: AcquisitionOverview, fetchData: acquisitionOverviewFetchData},
   [HOME_USERS_COUNTRY_VIEW]: {component: UsersCountry, fetchData: usersCountryFetchData},
   [HOME_USERS_DEVICE_VIEW]: {component: UsersDevice, fetchData: usersDeviceFetchData},
};
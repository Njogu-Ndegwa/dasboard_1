import request from '../_helpers/request';
import {SERVICE_PROVIDER_DRIVERS} from "../_helpers/apis";


function fetchServiceProviderDrivers() {
    return request(`${SERVICE_PROVIDER_DRIVERS}`);
}

function postServiceProviderDrivers(values) {
    return request.post(`${SERVICE_PROVIDER_DRIVERS}`, values);
}

function updateServiceProviderDrivers(values, id) {
    return request.put(`${SERVICE_PROVIDER_DRIVERS}/${id}`, values);
}

function deleteServiceProviderDrivers( id) {
    return request.delete(`${SERVICE_PROVIDER_DRIVERS}/${id}`);
}


export const ServiceProviderDriversService = {
    fetchServiceProviderDrivers,
    postServiceProviderDrivers,
    updateServiceProviderDrivers,
    deleteServiceProviderDrivers,
}
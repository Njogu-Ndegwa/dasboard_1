import request from '../_helpers/request';
import {SERVICE_PROVIDER_VEHICLE} from "../_helpers/apis";


function fetchServiceProviderVehicle() {
    return request(`${SERVICE_PROVIDER_VEHICLE}`);
}

function fetchServiceProviderVehicleId(id) {
    return request(`${SERVICE_PROVIDER_VEHICLE}?userId=${id}`);
}

function postServiceProviderVehicle(values, id) {
    return request.post(`${SERVICE_PROVIDER_VEHICLE}?userId=${id}`, values);
}

function updateServiceProviderVehicle(values, id) {
    return request.put(`${SERVICE_PROVIDER_VEHICLE}/${id}`, values);
}

function deleteServiceProviderVehicle( id) {
    return request.delete(`${SERVICE_PROVIDER_VEHICLE}/${id}`);
}


export const ServiceProviderVehicle = {
    fetchServiceProviderVehicle,
    postServiceProviderVehicle,
    updateServiceProviderVehicle,
    deleteServiceProviderVehicle,
    fetchServiceProviderVehicleId
}
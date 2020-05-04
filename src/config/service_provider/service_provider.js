import request from '../_helpers/request';
import {SERVICE_PROVIDER} from "../_helpers/apis";


function fetchServiceProvider() {
    return request(`${SERVICE_PROVIDER}`);
}

function postServiceProvider(values) {
    return request.post(`${SERVICE_PROVIDER}`, values);
}

function updateServiceProvider(values, id) {
    return request.put(`${SERVICE_PROVIDER}/${id}`, values);
}

function deleteServiceProvider( id) {
    return request.delete(`${SERVICE_PROVIDER}/${id}`);
}


export const ServiceProviderService = {
    fetchServiceProvider,
    postServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
}
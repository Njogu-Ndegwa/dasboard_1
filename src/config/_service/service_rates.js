import request from '../_helpers/request';
import {SERVICE_RATES} from "../_helpers/apis";


function fetchServiceRates() {
    return request(`${SERVICE_RATES}`);
}

function fetchServiceRatesId(params) {
    return request(SERVICE_RATES, {params});
}


function postServiceRates(values) {
    return request.post(`${SERVICE_RATES}`, values);
}

function updateServiceRates(values, id) {
    return request.put(`${SERVICE_RATES}/${id}`, values);
}

function deleteServiceRates( id) {
    return request.delete(`${SERVICE_RATES}/${id}`);
}


export const ServiceRatesService = {
    fetchServiceRatesId,
    fetchServiceRates,
    postServiceRates,
    updateServiceRates,
    deleteServiceRates,
}
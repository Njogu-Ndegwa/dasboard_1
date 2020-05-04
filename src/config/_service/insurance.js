import request from '../_helpers/request';
import {INSURANCE } from "../_helpers/apis";


function fetchInsurance() {
    return request(`${INSURANCE}`);
}

function postInsurance(values) {
    return request.post(`${INSURANCE}`, values);
}

function updateInsurance(values, id) {
    return request.put(`${INSURANCE}/${id}`, values);
}

function deleteInsurance( id) {
    return request.delete(`${INSURANCE}/${id}`);
}


export const InsuranceService = {
    fetchInsurance,
    postInsurance,
    updateInsurance,
    deleteInsurance,
}
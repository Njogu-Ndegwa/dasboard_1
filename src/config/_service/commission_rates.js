import request from '../_helpers/request';
import {COMMISSION_RATES} from "../_helpers/apis";


function fetchCommissionRates() {
    return request(`${COMMISSION_RATES}`);
}

function postCommissionRates(values) {
    return request.post(`${COMMISSION_RATES}`, values);
}

function updateCommissionRates(values, id) {
    return request.put(`${COMMISSION_RATES}/${id}`, values);
}

function deleteCommissionRates( id) {
    return request.delete(`${COMMISSION_RATES}/${id}`);
}


export const CommissionRateservice = {
    fetchCommissionRates,
    postCommissionRates,
    updateCommissionRates,
    deleteCommissionRates,
}
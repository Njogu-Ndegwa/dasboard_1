import request from '../_helpers/request';
import {RECIEVE_PAYMENTS} from "../_helpers/apis";


function fetchReciepts() {
    return request(`${RECIEVE_PAYMENTS}`);
}


function fetchRecieptId(params) {
    return request(RECIEVE_PAYMENTS, {params});
}

function postReciepts(values) {
    return request.post(`${RECIEVE_PAYMENTS}`, values);
}

function updateReciepts(values, id) {
    return request.put(`${RECIEVE_PAYMENTS}/${id}`, values);
}

function deleteReciepts( id) {
    return request.delete(`${RECIEVE_PAYMENTS}/${id}`);
}


export const RecieptsService = {
    fetchRecieptId,
    fetchReciepts,
    postReciepts,
    updateReciepts,
    deleteReciepts,
}
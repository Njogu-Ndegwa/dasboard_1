import request from '../_helpers/request';
import {REQUESTS, MEMBER_REQUESTS} from "../_helpers/apis";


function fetchRequestsByPayerId(id) {
    return request(`${REQUESTS}/${id}`);
}

function fetchRequests(params) {
    return request(MEMBER_REQUESTS, {params});
}

function fetchMemberRequests(id) {
    return request(`${MEMBER_REQUESTS}/?payerId=${id}`);
}

function postRequests(values) {
    return request.post(`${REQUESTS}`, values);
}

function updateRequests(values, id) {
    return request.put(`${REQUESTS}/${id}`, values);
}

function deleteRequests( id) {
    return request.delete(`${REQUESTS}/${id}`);
}


export const RequestsService = {
    fetchRequests,
    fetchRequestsByPayerId,
    fetchMemberRequests,
    postRequests,
    updateRequests,
    deleteRequests,
}
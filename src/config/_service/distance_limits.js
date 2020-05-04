import request from '../_helpers/request';
import {DISANCE_LIMITS} from "../_helpers/apis";


function fetchDistanceLimits() {
    return request(`${DISANCE_LIMITS}`);
}

function postDistanceLimits(values) {
    return request.post(`${DISANCE_LIMITS}`, values);
}

function updateDistanceLimits(values, id) {
    return request.put(`${DISANCE_LIMITS}/${id}`, values);
}

function deleteDistanceLimits( id) {
    return request.delete(`${DISANCE_LIMITS}/${id}`);
}


export const DistanceLimitService = {
    fetchDistanceLimits,
    postDistanceLimits,
    updateDistanceLimits,
    deleteDistanceLimits,
}
import request from '../_helpers/request';
import {SHIFT_TIME} from "../_helpers/apis";


function fetchShiftTime() {
    return request(`${SHIFT_TIME}`);
}

function postShiftTime(values) {
    return request.post(`${SHIFT_TIME}`, values);
}

function updateShiftTime(values, id) {
    return request.put(`${SHIFT_TIME}/${id}`, values);
}

function deleteShiftTime( id) {
    return request.delete(`${SHIFT_TIME}/${id}`);
}


export const ShiftTimeService = {
    fetchShiftTime,
    postShiftTime,
    updateShiftTime,
    deleteShiftTime,
}
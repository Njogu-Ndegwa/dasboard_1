
import request from '../_helpers/request';
import {VEHICLE_MAPPING } from "../_helpers/apis";


function fetchMapping() {
    return request(`${VEHICLE_MAPPING}`);
}

function postMapping(values) {
    return request.post(`${VEHICLE_MAPPING}`, values);
}

function updateMapping(values, id) {
    return request.put(`${VEHICLE_MAPPING}/${id}`, values);
}

function deleteMapping( id) {
    return request.delete(`${VEHICLE_MAPPING}/${id}`);
}


export const MappingService = {
    fetchMapping,
    postMapping,
    updateMapping,
    deleteMapping,
}
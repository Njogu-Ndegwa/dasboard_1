import request from '../_helpers/request';
import {RESCUE_VEHICLE_TYPES} from "../_helpers/apis";


function fetchRescueVehicleTypes() {
    return request(`${RESCUE_VEHICLE_TYPES}`);
}

function postRescueVehicleTypes(values) {
    return request.post(`${RESCUE_VEHICLE_TYPES}`, values);
}

function updateRescueVehicleTypes(values, id) {
    return request.put(`${RESCUE_VEHICLE_TYPES}/${id}`, values);
}

function deleteRescueVehicleTypes( id) {
    return request.delete(`${RESCUE_VEHICLE_TYPES}/${id}`);
}


export const RescueVehicleTypesService = {
    fetchRescueVehicleTypes,
    postRescueVehicleTypes,
    updateRescueVehicleTypes,
    deleteRescueVehicleTypes,
}
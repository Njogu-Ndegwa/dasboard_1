import request from '../_helpers/request';
import {MEMBER_VEHICLE_TYPE} from "../_helpers/apis";


function fetchMemberVehicleType() {
    return request(`${MEMBER_VEHICLE_TYPE}`);
}

function postMemberVehicleType(values) {
    return request.post(`${MEMBER_VEHICLE_TYPE}`, values);
}

function updateMemberVehicleType(values, id) {
    return request.put(`${MEMBER_VEHICLE_TYPE}/${id}`, values);
}

function deleteMemberVehicleType( id) {
    return request.delete(`${MEMBER_VEHICLE_TYPE}/${id}`);
}


export const MemberVehicleTypeService = {
    fetchMemberVehicleType,
    postMemberVehicleType,
    updateMemberVehicleType,
    deleteMemberVehicleType,
}
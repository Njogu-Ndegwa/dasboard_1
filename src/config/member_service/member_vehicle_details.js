import request from '../_helpers/request';
import {MEMBER_VEHICLE_DETAILS } from "../_helpers/apis";


function fetchMemberVehicleDetails(id) {
    return request(`${MEMBER_VEHICLE_DETAILS}?userId=${id}`);
}

function postMemberVehicleDetails(values, id) {
    return request.post(`${MEMBER_VEHICLE_DETAILS}?userId=${id}`, values);
}

function updateMemberVehicleDetails(values, id) {
    return request.put(`${MEMBER_VEHICLE_DETAILS}/${id}`, values);
}

function deleteMemberVehicleDetails( id) {
    return request.delete(`${MEMBER_VEHICLE_DETAILS}/${id}`);
}


export const MemberVehicleDetailsService = {
    fetchMemberVehicleDetails,
    postMemberVehicleDetails,
    updateMemberVehicleDetails,
    deleteMemberVehicleDetails,
}
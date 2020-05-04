import request from '../_helpers/request';
import {MEMBER_VEHICLE_CATEGORY} from "../_helpers/apis";


function fetchMemberVehicleCategory() {
    return request(`${MEMBER_VEHICLE_CATEGORY}`);
}

function fetchMemberVehicleCategoryId(id) {
    return request(`${MEMBER_VEHICLE_CATEGORY}/${id}/vehicle-types`);
}

function postMemberVehicleCategory(values) {
    return request.post(`${MEMBER_VEHICLE_CATEGORY}`, values);
}

function updateMemberVehicleCategory(values, id) {
    return request.put(`${MEMBER_VEHICLE_CATEGORY}/${id}`, values);
}

function deleteMemberVehicleCategory( id) {
    return request.delete(`${MEMBER_VEHICLE_CATEGORY}/${id}`);
}


export const MemberVehicleCategoryService = {
    fetchMemberVehicleCategory,
    postMemberVehicleCategory,
    updateMemberVehicleCategory,
    deleteMemberVehicleCategory,
    fetchMemberVehicleCategoryId,
}
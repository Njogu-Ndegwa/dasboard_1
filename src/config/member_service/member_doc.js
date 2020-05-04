import request from '../_helpers/request';
import {MEMBER_VEHICLE_DOCS } from "../_helpers/apis";


function fetchMemberVehicleDocs() {
    return request(`${MEMBER_VEHICLE_DOCS}`);
}

function postMemberVehicleDocs(values) {
    return request.post(`${MEMBER_VEHICLE_DOCS}`, values);
}

function updateMemberVehicleDocs(values, id) {
    return request.put(`${MEMBER_VEHICLE_DOCS}/${id}`, values);
}

function deleteMemberVehicleDocs( id) {
    return request.delete(`${MEMBER_VEHICLE_DOCS}/${id}`);
}


export const MemberVehicleDocsService = {
    fetchMemberVehicleDocs,
    postMemberVehicleDocs,
    updateMemberVehicleDocs,
    deleteMemberVehicleDocs,
}

import request from '../_helpers/request';
import {MEMBER_TYPE } from "../_helpers/apis";


function fetchMemberType() {
    return request(`${MEMBER_TYPE}`);
}

function postMemberType(values) {
    return request.post(`${MEMBER_TYPE}`, values);
}

function updateMemberType(values, id) {
    return request.put(`${MEMBER_TYPE}/${id}`, values);
}

function deleteMemberType( id) {
    return request.delete(`${MEMBER_TYPE}/${id}`);
}


export const MemberTypeService = {
    fetchMemberType,
    postMemberType,
    updateMemberType,
    deleteMemberType,
}
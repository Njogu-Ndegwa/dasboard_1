import request from '../_helpers/request';
import {MEMBER} from "../_helpers/apis";


function fetchMember() {
    return request(`${MEMBER}`);
}

function postMember(values) {
    return request.post(`${MEMBER}`, values);
}

function updateMember(values, id) {
    return request.put(`${MEMBER}/${id}`, values);
}

function deleteMember( id) {
    return request.delete(`${MEMBER}/${id}`);
}


export const MemberService = {
    fetchMember,
    postMember,
    updateMember,
    deleteMember,
}
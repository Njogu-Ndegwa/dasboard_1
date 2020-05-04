import request from '../_helpers/request';
import {MEMBER_POLICY_MANAGEMENT} from "../_helpers/apis";


function fetchMemberPolicyManagement() {
    return request(`${MEMBER_POLICY_MANAGEMENT}`);
}


function fetchMemberPolicyManagementId(params) {
    return request(MEMBER_POLICY_MANAGEMENT, {params});
}

function postMemberPolicyManagement(values) {
    return request.post(`${MEMBER_POLICY_MANAGEMENT}`, values);
}

function updateMemberPolicyManagement(values, id) {
    return request.put(`${MEMBER_POLICY_MANAGEMENT}/${id}`, values);
}

function deleteMemberPolicyManagement( id) {
    return request.delete(`${MEMBER_POLICY_MANAGEMENT}/${id}`);
}


export const MemberPolicyManagementService = {
    fetchMemberPolicyManagementId,
    fetchMemberPolicyManagement,
    postMemberPolicyManagement,
    updateMemberPolicyManagement,
    deleteMemberPolicyManagement,
}
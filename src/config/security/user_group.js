import request from '../_helpers/request';
import {ROLES} from "../_helpers/apis";


function fetchUserGroups() {
    return request(`${ROLES}`);
}


function fetchRolePermissions(id) {
    return request(`${ROLES}/${id}/permissions`);
}


function updateRolePermission(values, id) {
    return request.put(`${ROLES}/${id}/permissions`, values);
}

function postUserGroups(values) {
    return request.post(`${ROLES}`, values);
}

function deleteUserGroups( id) {
    return request.delete(`${ROLES}/${id}`);
}


export const UserGroupsService = {
    fetchUserGroups,
    fetchRolePermissions,
    updateRolePermission,
    postUserGroups,
    deleteUserGroups,
}
import request from '../_helpers/request';
import {PERMISSIONS} from "../_helpers/apis";


function fetchPermissions() {
    return request(`${PERMISSIONS}`);
}

function postPermissions(values) {
    return request.post(`${PERMISSIONS}`, values);
}

function updatePermissions(values, id) {
    return request.put(`${PERMISSIONS}/${id}`, values);
}

function deletePermissions( id) {
    return request.delete(`${PERMISSIONS}/${id}`);
}


export const PermissionsService = {
    fetchPermissions,
    postPermissions,
    updatePermissions,
    deletePermissions,
}
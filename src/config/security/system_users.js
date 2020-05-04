import request from '../_helpers/request';
import {SYSTEM_USERS} from "../_helpers/apis";


function fetchSystemUsers() {
    return request(`${SYSTEM_USERS}`);
}

function postSystemUsers(values) {
    return request.post(`${SYSTEM_USERS}`, values);
}

function updateSystemUsers(values, id) {
    return request.put(`${SYSTEM_USERS}/${id}`, values);
}

function deleteSystemUsers( id) {
    return request.delete(`${SYSTEM_USERS}/${id}`);
}


export const SystemUsersService = {
    fetchSystemUsers,
    postSystemUsers,
    updateSystemUsers,
    deleteSystemUsers,
}
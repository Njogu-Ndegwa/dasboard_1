
import request from '../_helpers/request';
import {MAIN_BANK} from "../_helpers/apis";


function fetchMainBank() {
    return request(`${MAIN_BANK}`);
}

function postMainBank(values) {
    return request.post(`${MAIN_BANK}`, values);
}

function updateMainBank(values, id) {
    return request.put(`${MAIN_BANK}/${id}`, values);
}

function deleteMainBank( id) {
    return request.delete(`${MAIN_BANK}/${id}`);
}


export const MainBankService = {
    fetchMainBank,
    postMainBank,
    updateMainBank,
    deleteMainBank,
}
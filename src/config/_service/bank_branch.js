import request from '../_helpers/request';
import {BANK_BRANCH} from "../_helpers/apis";


function fetchBankBranch() {
    return request(`${BANK_BRANCH}`);
}

function fetchBranchesByMainBank( id) {
    return request(`${BANK_BRANCH}/${id}/bank-branches`);
}

function postBankBranch(values) {
    return request.post(`${BANK_BRANCH}`, values);
}

function updateBankBranch(values, id) {
    return request.put(`${BANK_BRANCH}/${id}`, values);
}

function deleteBankBranch( id) {
    return request.delete(`${BANK_BRANCH}/${id}`);
}




export const BankBranchService = {
    fetchBranchesByMainBank,
    fetchBankBranch,
    postBankBranch,
    updateBankBranch,
    deleteBankBranch,
}
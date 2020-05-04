import request from '../_helpers/request';
import {PREPARE_INVOICES} from "../_helpers/apis";


function fetchPrepareInvoice() {
    return request(`${PREPARE_INVOICES}`);
}

function postPrepareInvoice(values) {
    return request.post(`${PREPARE_INVOICES}`, values);
}

function updatePrepareInvoice(values, id) {
    return request.put(`${PREPARE_INVOICES}/${id}`, values);
}

function deletePrepareInvoice( id) {
    return request.delete(`${PREPARE_INVOICES}/${id}`);
}


export const PrepareInvoiceService = {
    fetchPrepareInvoice,
    postPrepareInvoice,
    updatePrepareInvoice,
    deletePrepareInvoice,
}
import request from '../_helpers/request';
import {DISPATCH_INVOICES} from "../_helpers/apis";


function fetchDispatchInvoices() {
    return request(`${DISPATCH_INVOICES}`);
}

function postDispatchInvoices(values) {
    return request.post(`${DISPATCH_INVOICES}`, values);
}

function updateDispatchInvoices(values, id) {
    return request.put(`${DISPATCH_INVOICES}/${id}`, values);
}

function deleteDispatchInvoices( id) {
    return request.delete(`${DISPATCH_INVOICES}/${id}`);
}


export const DispatchInvoicesService = {
    fetchDispatchInvoices,
    postDispatchInvoices,
    updateDispatchInvoices,
    deleteDispatchInvoices,
}
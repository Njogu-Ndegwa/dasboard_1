import request from '../_helpers/request';
import { FILTER_INVOICES } from "../_helpers/apis";


function fetchFilterInvoiceDraft(id) {
    return request(`${FILTER_INVOICES}?status=Draft`);
}

function fetchFilterInvoicePaid(id) {
    return request(`${FILTER_INVOICES}?payerId=${id}&status=Paid`);
}

function fetchFilterInvoiceSent(id) {
    return request(`${FILTER_INVOICES}?payerId=${id}&status=Sent`);
}
function fetchInvoice(params) {
    return request(FILTER_INVOICES, {params});
}




export const FilterInvoiceService = {
    fetchInvoice,
    fetchFilterInvoiceDraft,
    fetchFilterInvoiceSent,
    fetchFilterInvoicePaid,

}
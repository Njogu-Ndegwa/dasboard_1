import request from '../_helpers/request';
import {AUDIT_LOGS} from "../_helpers/apis";


function fetchAuditLogs() {
    return request(`${AUDIT_LOGS}`);
}

function postAuditLogs(values) {
    return request.post(`${AUDIT_LOGS}`, values);
}

function updateAuditLogs(values, id) {
    return request.put(`${AUDIT_LOGS}/${id}`, values);
}

function deleteAuditLogs( id) {
    return request.delete(`${AUDIT_LOGS}/${id}`);
}


export const AuditLogsService = {
    fetchAuditLogs,
    postAuditLogs,
    updateAuditLogs,
    deleteAuditLogs,
}
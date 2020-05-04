import request from '../_helpers/request';
import {SERVICE_REQUESTED} from "../_helpers/apis";



function fetchServiceRequested(params) {
    return request(SERVICE_REQUESTED, {params});
}

export const serviceRequestsService = {
    fetchServiceRequested,
}
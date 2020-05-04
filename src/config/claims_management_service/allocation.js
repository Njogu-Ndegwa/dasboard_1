import request from '../_helpers/request';
import {ALLOCATION, ALLOCATIONS} from "../_helpers/apis";


function fetchAllocation() {
    return request(`${ALLOCATIONS}`);
}

function postAllocation(values) {
    return request.post(`${ALLOCATION}`, values);
}

function updateAllocation(values, id) {
    return request.put(`${ALLOCATION}/${id}`, values);
}




export const AllocationService = {
    fetchAllocation,
    postAllocation,
    updateAllocation,
}
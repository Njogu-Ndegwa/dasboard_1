import request from '../_helpers/request';
import {SERVICE_CATEGORIES} from "../_helpers/apis";


function fetchServiceCategories() {
    return request(`${SERVICE_CATEGORIES}`);
}

function postServiceCategories(values) {
    return request.post(`${SERVICE_CATEGORIES}`, values);
}

function updateServiceCategories(values, id) {
    return request.put(`${SERVICE_CATEGORIES}/${id}`, values);
}

function deleteServiceCategories( id) {
    return request.delete(`${SERVICE_CATEGORIES}/${id}`);
}


export const ServiceCategoryService = {
    fetchServiceCategories,
    postServiceCategories,
    updateServiceCategories,
    deleteServiceCategories,
}
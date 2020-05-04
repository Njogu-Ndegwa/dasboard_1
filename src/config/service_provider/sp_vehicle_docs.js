import request from '../_helpers/request';
import {SERVICE_PROVIDER_VEHICLE_DOCS} from "../_helpers/apis";


function fetchServiceProviderVehicleDocs() {
    return request(`${SERVICE_PROVIDER_VEHICLE_DOCS}`);
}

function postServiceProviderVehicleDocs(values) {
    return request.post(`${SERVICE_PROVIDER_VEHICLE_DOCS}`, values);
}

function updateServiceProviderVehicleDocs(values, id) {
    return request.put(`${SERVICE_PROVIDER_VEHICLE_DOCS}/${id}`, values);
}

function deleteServiceProviderVehicleDocs( id) {
    return request.delete(`${SERVICE_PROVIDER_VEHICLE_DOCS}/${id}`);
}


export const ServiceProviderVehicleDocsService = {
    fetchServiceProviderVehicleDocs,
    postServiceProviderVehicleDocs,
    updateServiceProviderVehicleDocs,
    deleteServiceProviderVehicleDocs,
}
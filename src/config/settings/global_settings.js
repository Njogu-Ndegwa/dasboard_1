import request from '../_helpers/request';
import {GLOBAL_SETTINGS} from "../_helpers/apis";


function fetchGlobalSettings() {
    return request(`${GLOBAL_SETTINGS}`);
}

function updateGlobalSettings(values, id) {
    return request.put(`${GLOBAL_SETTINGS}/${id}`, values);
}




export const GlobalSettingsService = {
    fetchGlobalSettings,
    updateGlobalSettings,
    
}
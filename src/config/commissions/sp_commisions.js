import request from '../_helpers/request';
import {SP_COMMISSIONS} from "../_helpers/apis";


function fetchSpCommissions() {
    return request(`${SP_COMMISSIONS}`);
}




export const SpCommissionsService = {
    fetchSpCommissions,
 
}
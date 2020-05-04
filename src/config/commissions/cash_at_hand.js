import request from '../_helpers/request';
import {CASH_AT_HAND} from "../_helpers/apis";


function fetchSpCashAtHand() {
    return request(`${CASH_AT_HAND}`);
}




export const SpCashAtHandService = {
    fetchSpCashAtHand,
 
}
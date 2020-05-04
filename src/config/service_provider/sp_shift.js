import request from '../_helpers/request';
import {SP_SHIFT} from "../_helpers/apis";



function fetchSpShiftWithSpecs(params) {
    return request(SP_SHIFT, {params});
}

export const SpShiftWithSpecsService = {
    fetchSpShiftWithSpecs,
}
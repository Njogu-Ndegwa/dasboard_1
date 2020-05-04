import request from '../_helpers/request';
import {SP_REVIEWS_RATINGS} from "../_helpers/apis";


function fetchSpReviewsAndRatings() {
    return request(`${SP_REVIEWS_RATINGS}`);
}




export const SpReviewsAndRatings = {
    fetchSpReviewsAndRatings
}
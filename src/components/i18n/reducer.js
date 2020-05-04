import { CHANGE_THEME } from './actionTypes';
import * as LocalStorage from '../../util/localstorage'

export default (state = { theme: LocalStorage.get('smarthealth_skin') || 'light' }, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            LocalStorage.put('smarthealth_skin', action.payload);
            return { theme: action.payload }
        default:
            return state;
    }
};
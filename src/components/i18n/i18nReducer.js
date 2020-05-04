import { I18N_INIT, I18N_SELECT } from './actionTypes';
import * as LocalStorage from '../../util/localstorage'

export default function i18nReducer(
    state = {
        language: LocalStorage.get('smarthealth_locale') || 'en',
        locales: {}
    },
    action) {
    switch (action.type) {
        case I18N_INIT:
            return {
                ...state,
                locales: action.payload
            }
        case I18N_SELECT:
            LocalStorage.put('smarthealth_locale', action.payload);
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    }
}
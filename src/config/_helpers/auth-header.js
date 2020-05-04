import React from 'react';
import { useSelector } from 'react-redux';
import * as LocalStorage from '../_helpers/localstorage';

export function authHeader() {
    // return authorization header with jwt token
    let user = LocalStorage.get('smarthealth_user');

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export function User() {
    const auth = useSelector(state => state.authentication);
    console.log('authenticated user ', auth)
    return <>{auth.user}</>
}
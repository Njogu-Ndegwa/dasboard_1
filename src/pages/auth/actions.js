import { actions as loadingActions } from '../../components/loading/index';
import * as LocalStorage from '../../util/localstorage';
import { CLIENT_ID, CLIENT_SECRET, OAUTH_TOKEN } from '../../constants/api';
import { notification, message } from 'antd'
import { GET_ERRORS, returnErrors } from './errorActions';
import axios from '../../util/axios';
import qs from 'qs';

export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "USER_LOADED";
export const REGISTER_FAIL = "USER_LOADED";


export const login = (formVal, history) => {
  return (dispatch) => {
    dispatch(loadingActions.showLoading());
    const { username, password } = formVal;

    const credentials = {
      grant_type: 'password',
      username: username,
      password: password
    };

    const config = {
      url: OAUTH_TOKEN,
      mode: "cors",
      credentials: "include",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET
      },
      method: 'post',
      data: qs.stringify(credentials)
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        const { access_token } = response.data;

        LocalStorage.put('smarthealth_user', formVal.username);
        LocalStorage.put('smarthealth_token', access_token);
        history.push('/');
        //store the token also
        dispatch(loadingActions.hideLoading());
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response)
          const { details, error_description } = error.response.data;
          notification.error({
            message: `Authentication Error`,
            description:
              `${error_description}`
          });
        } else if (error.request) {
          console.log(error.request);
          message.error(`Authentication Error: ${error.request}`);
        }
        else {
          console.log('Error', error.message);
          message.error(`😱 Login Error: ${error.message}`);
        }
        dispatch(loadingActions.hideLoading());
      });


  };

  //check tokens & load user
  // export const loadUser = () => (dispatch, getState) => {
  //   dispatch(loadingActions.showLoading());
  //   const token = getState().auth.token;
  //   const config = {
  //     headers: {
  //       "Content-type": "application/json"
  //     }
  //   }
  //   if (token) {
  //     config.headers['Authorization'] = `Bearer ${token}`
  //   }

  //   axios.get('', config)
  //     .then(res => dispatch({
  //       type: USER_LOADED,
  //       payload: res.data
  //     }))
  //     .catch(err => {
  //       dispatch(returnErrors(err.response.data, err.response.status));
  //       dispatch({
  //         type: AUTH_ERROR
  //       });
  //     });
  // }
};
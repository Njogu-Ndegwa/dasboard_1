import http from './httpService';
import {apiUrl} from './config.json';
import jwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + "/oauth/token?grant_type=password&username=admin&password=password";
const tokenKey = "access_token"

// export  async function login(email, password) {
//     const {data: jwt} = await http.post(apiEndpoint, {email, password})
//     localStorage.setItem(tokenKey, jwt);
// }

// export  async  function logins(username, password) {
             
//     return http.post(apiEndpoint, { username, password} )
    
 
//  }

        const username = 'mrescue'
        const password = 'ccUyb6vS4S8nxfbKPCrN'
        const encryptedPass = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
        const url = 'http://localhost:18080/oauth/token?grant_type=password&username=admin&password=password'

       export function accessToken() {
            fetch (apiEndpoint, {
                method: 'POST',
                headers: {'Authorization': `Basic ${encryptedPass}`}
            })
            .then(res=> res.json())
            .then(res => {
                localStorage.setItem("access_token", res.access_token )
            })
           
        }
        export function login (url) { 
        fetch (url, {
            method: 'POST',
            headers: {'Authorization': `Basic ${encryptedPass}`}
        })
        .then(res => res.json()).then(res => {
            localStorage.setItem('access_token', res.access_token);
            
            window.location('/')
        });

    }


        // export async function accessToken() {
        //     const response = await fetch (apiEndpoint, {
        //         method: 'POST',
        //         headers: {'Authorization': `Basic ${encryptedPass}`},
        //     })
        //     await response.json();
        //     localStorage.setItem('access_token', response.access_token )
        // }



export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey)

}

export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt)
        
      }
      catch(ex) {}
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default {
    // login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt,
    // logins,
    accessToken
}
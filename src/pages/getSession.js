
import { message } from 'antd'

export const getSession = () => {
    const jwt = localStorage.getItem('access_token')
    console.log( "access_token", jwt)
    let session 
    try {
        if (jwt) {
            const base64Url = jwt.split('.') [1];
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            session= JSON.parse(window.atob(base64))
        }
    } catch (error) {
        console.log('session error',error)
        message.error( 'You have entered an invalid username or password' )
    }
    return session
    
}

export const logOut = () => {
    localStorage.removeItem('access_token')
}
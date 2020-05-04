import http from './httpService';
import {apiUrl} from './config.json';

const apiEndpoint = apiUrl + "/api/service-category";
const username = 'mrescue'
const password = 'ccUyb6vS4S8nxfbKPCrN'
const encryptedPass = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
const tokens = localStorage.getItem('access_token')


function movieUrl(id) { 
    return `${apiEndpoint}/ ${id}`;
}

 

//  export function getService(dataSource) { 
//     console.log(  "aFfasdfa", tokens )
  
//  fetch ( apiEndpoint, {
     
//     method: 'GET',
//     headers: { Authorization: `Bearer ${tokens}` }
// } )
// .then( res=> res.json() )
// .then( res=> {
//     {
//         console.log(res.content)
//         const dataSource = res.content
//         // this.setState({dataSource})
//     }
  
// } )

//  }

  export async function postData(urls='', values) {
    const response = await fetch ( urls, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tokens}`,
         'Content-type' : 'application/json' },
         body: JSON.stringify(values),
        
         
    } )
    return await response.json();
}

export async function putData(urls='', values) {
  const response = await fetch ( urls, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${tokens}`,
       'Content-type' : 'application/json' },
       body: JSON.stringify(values),
      
       
  } )
  return await response.json();
}

// export async function dataa( urls ='' ) {

//     const response = await fetch ( urls,  { 
//         method: 'GET',
//         headers: { Authorization: `Bearer ${tokens}` }
//      } )
// return await [ response.json(), response.content, console.log("eee", response.content) ]

// }

// export  function what(urls='') {
//      fetch (urls, {
//         method: 'GET',
//         headers: { Authorization: `Bearer ${tokens}` }
//     } )
//     .then(res => res.json())
//     .then (res => {
//         const dataSource = res.content;
//         console.log(dataSource)
//     } )


// }



export function getMovie(movieId) { 
    return http.get(movieUrl(movieId) ) 
} 

export function saveMovie(movie) { 
    if (movie._id) {
        const body = {...movie};
        delete body._id;
        return http.put(movieUrl(movie._Id) ,  body)
    }

    return http.post(apiEndpoint, movie)
} 


export function deleteMovie(movieId) {
     return http.delete(movieUrl(movieId))
}


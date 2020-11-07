import React from 'react';
import {API} from "../config"

export const signup=(user)=>{
    return (  fetch(`http://localhost:8000/api/signup`,{
          method :"POST",
          headers:{
              Accept :'application/json',
              "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
      })
      .then(response=>{
          return response.json()
      })
      .catch(err=> console.log(err))
    )  
}


export const signin=(user)=>{
    return (fetch(`http://localhost:8000/api/signin`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err=> console.log(err))
    )
}


export const authenticate = (data , next)=>{
    if(typeof window  !==undefined){
        localStorage.setItem('jwt' , JSON.stringify(data))
        next();
    }
}

export const signout =(next)=>{
   if(typeof window !==undefined){
       localStorage.removeItem('jwt');
       next();       
       return fetch(`http://localhost:8000/api/signout`, {
           method: 'GET',
       })
       .then(response=>{
           console.log('signout' , response)
       })
       .catch(err=> console.log(err))
   }

}


export const isAuthenticated =()=>{
    if(typeof window ===undefined){
        return false
    }

    if(localStorage.getItem('jwt')){
        //console.log((JSON.parse(localStorage.getItem('jwt'))).user.role  , "role off the user")
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false;
    }
}

















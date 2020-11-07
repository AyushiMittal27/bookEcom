import {API} from '../config';
import queryString from 'query-string'

export const getProducts = (sortBy)=>{

return (fetch(`http://localhost:8000/api/products?sortBy=${sortBy}&order=desc&limit=6`, {
   method: 'GET',
   headers:{
    "Access-Control-Allow-Origin" : '*'
   }
})
.then(response => response.json())
.catch(err => console.log(err))
)
}


export const getCategories= ()=>{
    console.log({API} , "url route to connect to backend")
    console.log(process.env.REACT_APP_URL , "env var")
    return (fetch(`http://localhost:8000/api/categories`, {
        method: 'GET',
        headers:{
            "Access-Control-Allow-Origin" : '*'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    )

}

export const getFilteredProducts = (skip, limit, filters={})=>{
    const data={
        limit , skip , filters
    }
    return (fetch(`http://localhost:8000/api/products/by/search` , {
        method: "POST",
        headers:{
            Accept : "application/json" ,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : '*'
        },
        body : JSON.stringify(data)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
         console.log(err);       
    })
        )
}




export const list = (params) =>{
    const query = queryString.stringify(params) 
    //console.log('query', query)
    return fetch(`${API}/product/search?${query}`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
};

export const getBrainTreeClientToken=(userId , token)=>{
    
    return(fetch(`${API}/brainTree/getToken/${userId}` , {
        method: 'GET',
        headers:{
             Accept: 'application/json', 
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>response.json())
    .catch(err=>console.log(err))
    )
}



export const read= (productId)=>{
    return (fetch(`http://localhost:8000/api/product/${productId}`, {
        method: 'GET',
        headers: {
            "Access-Control-Allow-Origin" : '*'
        }
    })
    .then(response => response.json())
    .catch((err)=>console.log(err)))
}

export const processPayment = (userId , token , paymentData)=>{
    return (fetch(`${API}/brainTree/payment/${userId}` , {
        method: 'POST',
        headers:{
            Accept: "a0pplication/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then((data)=> data.json())
    .catch((err)=> console.log(err))
    )
}

export const createOrder = (userId , token , createOrderData)=>{
    return (fetch(`${API}/order/create/${userId}` , {
        method: 'POST',
        headers:{
            Accept: "a0pplication/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(createOrderData)
    })
    .then((data)=> data.json())
    .catch((err)=> console.log(err))
    )
}

export const listRelated = (productId)=>{
    console.log(productId , " Product Id to view a single product")
    return (fetch(`http://localhost:8000/api/products/related/${productId}`, {
        method: 'GET',
        headers:{
            "Access-Control-Allow-Origin" : '*'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err))
    )
}
















































import {API} from '../config'

export const createCategory = (userId , token , category) =>{

   return (fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers:{
            Accept : "application/json",
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,
            "Access-Control-Allow-Origin" : '*'
        },
        body : JSON.stringify(category)
    })
    .then(response=> response.json())
    .catch(err => console.log(err))
    )
}

export const createProduct = (userId , token , product)=>{
    return (
        fetch(`${API}/product/create/${userId}` , {
            method : 'POST',
            headers:{
                Accept : 'application/json',
                Authorization:`bearer ${token}`,
                "Access-Control-Allow-Origin" : '*'
            },
            body : product
        })
        .then(response =>response.json())
        .catch(err=> console.log(err))
    )
}


export const getCategories= ()=>{
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers:{
            "Access-Control-Allow-Origin" : '*'
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err));

}


export const listOrders= (userId, token)=>{
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const getStatusValues= (userId, token)=>{
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const updateOrderStatus= (userId, token, orderId , status)=>{
    return fetch(`${API}/order/${orderID}/status/${userId}`, {
        method: 'PUT',
        headers:{
            Accept:"application/json",
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}


/**
 * to perfrom crud on products
 * get all products
 * get a single product
 * update a single product
 * delete a single product
 */

export const getProducts= ()=>{
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const getProduct= (productId)=>{
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const deleteProduct = ( productId ,userId , token)=>{
    return (
        fetch(`${API}/product/${productId}/${userId}` , {
            method : 'DELETE',
            headers:{
                Accept : 'application/json',
                Authorization:`bearer ${token}`,
            },
        })
        .then(response =>response.json())
        .catch(err=> console.log(err))
    )
}


export const updateProduct = ( productId ,userId , token , product)=>{
    return (
        fetch(`${API}/product/${productId}/${userId}` , {
            method : 'PUT',
            headers:{
                Accept : 'application/json',
                Authorization:`bearer ${token}`
            },
            body: product
        })
        .then(response =>response.json())
        .catch(err=> console.log(err))
    )
}



























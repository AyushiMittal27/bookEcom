import React, { useState, useEffect }  from 'react'
import {isAuthenticated} from '../auth'
import { Link } from 'react-router-dom'
import { getBrainTreeClientToken, processPayment, createOrder } from './apiCore'
import DropIn from 'braintree-web-drop-in-react'
import { emptyCart } from './cartHelpers'

const Checkout = ({products})=> {

const [data , setData] = useState({
    success: false,
    clientToken : null,
    error: '',
    instance: {},
    address: '',
    loading:'',
})    

const userId = isAuthenticated() && isAuthenticated().user._id
const token = isAuthenticated() && isAuthenticated().token

const getToken=()=>{
        getBrainTreeClientToken(userId , token)
        .then(data=>{
            if(data.error){
                setData({...data , error: data.error})
            }else{
                console.log(data , "DAta from checkout")
                setData({clientToken:data.clientToken})
            }
        })
}

useEffect(()=>{
    getToken(userId , token)
},[])

const handleAddress= event=>{
    setData({...data , address: event.target.value})
}

const getTotal =()=>{
return products.reduce((currentvalue , nextValue)=>{
     return currentvalue + nextValue.count * nextValue.price
},0)
}

const showCheckout= ()=>{
    return(
    isAuthenticated() ? (
    <div>{showDropIn()}</div>
        ) : (
           <Link to='/signin'>
               <button  className="btn btn-primary"> Sign in to Checkout</button>
           </Link> 
        )
)
}

let deliveryAddress= data.address

const buy=()=>{
    setData({loading : true})
    //send the nounce to your server
    //nounce= data.instanve.requestPaymentMethod\\let nounce;
    let nounce;
    let getNounce = data.instance.requestPaymentMethod()
    .then(data=>{
        console.log(data)
        nounce = data.nounce
        // once you have nounce {cardtype , card number} send nounceas 'paymentMethodNounce'
        // and also total to be charged
        //console.log('send nounce and total to process' , nounce , getTotal(products))
        const paymentData = {
            paymentMethodNounce : nounce,
            amount: getTotal(products)
        }
        processPayment(userId, token , paymentData)
        .then((response)=>{
            //console.log(response)
            //empty cart
            //create order
            const createOrderData = {
                products: products,
                transaction_id : response.transaction_id,
                amount : response.transaction.amount,
                address: deliveryAddress
            }

            createOrder(userId , token , createOrderData)
            .then((response)=>{
                emptyCart(()=>{
                    console.log('payment successfull and empty card')
                    setData({loading: false , success: true})
                })          
        })
        .catch((error)=>console.log(error))
    })
    })
    .catch(err=>{
        //console.log('drop in error ', err)
        setData({...data , error: err.message})
    }) 
}                        

const showDropIn =()=>(
    <div onBlur = {()=> setData({...data , error:""})}>
        {data.clientToken!==null  && products.length >0 ? (
            <div>
                <div className="form-group mb-3">
                    <label className="text-muted">Delivery Address:</label>
                      <textarea
                      onChange={handleAddress}
                      className="form-control"
                      value={data.address}
                      placeholder="Type ypur delvery address here"
                      />
                     </div>
                <DropIn options={{
                    authorization : data.clientToken,
                    paypal:{
                        flow: "vault"
                    }
                }} onInstance={(instance)=>(data.instance = instance)} />
                <button onClick={buy} className="btn  btn-success btn-block"> Pay</button>
            </div>    
        ) : null }
    </div>    
)

const showError = error =>(

    <div className="alert alert-danger" style={{display:error ? '' : 'none'}} >
        {error}
    </div>
)

const showSuccess = success =>(
    <div
    className="alert alert-info"
    style={{display: success ? '' : 'none'}}
    >
    Thanks your payment was successfull
    </div>
)

const showLoading = loading =>(
    loading && (<h2> Loading .....</h2>)
)


return (
    <div>
        <h2> Total : ${getTotal()}</h2>
        {showLoading(data.loading)}
        {showSuccess(data.success)}
        {showError(data.error)}
        {showCheckout()}
    </div>
)


}


export default Checkout;
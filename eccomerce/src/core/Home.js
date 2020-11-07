import React , {useState, useEffect} from "react";
import Layout from './Layout'
import {getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'

const Home = ()=>{
 
    const [productsBySell , setProductsBySell] = useState([])
    const [productsByArrival, setProductByArrival] =useState([])
    const [error , setError]= useState(false)
 

    const loadProductBySell =()=>{
         getProducts('sold')
         .then(data=>{
             console.log(data , "Load Products By SEll")
             if(data.error){
             setError(data.error)
             }
             else{
                 setProductsBySell(data)
             }
         })        
    }
 
    const loadProductByArrival =()=>{
        getProducts('createdAt')
        .then(data=>{
            console.log(data , "Load Producs By Arrival")
            if(data.error){
            setError(data.error)
            }
            else{
                setProductByArrival(data)
            }
        })        
   }

   useEffect(()=>{
     loadProductByArrival()
     loadProductBySell()

   }, [])

 return (
    <Layout title='Home Page' description="Node React Ecommerce App"  className="container-fluid">
     <Search />
     <h2 className="mb-4">New Arrivals</h2>
     <div className="row">
     {productsByArrival.map((product , i)=>(
          <div className ="col-4 mb-3" key={i}>
              <Card product={product} />
          </div>    
      ))}

     </div>
     <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
      {productsBySell.map((product , i)=>(
         <div className ="col-4 mb-3" key={i}>
         <Card product={product} />
     </div>   
      ))}
      </div>

        </Layout>

 )   
}

export default Home;














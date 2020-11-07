import React , {useState , useEffect} from 'react'
import Layout from "./Layout"
import {read, listRelated} from "./apiCore"
import Card from "./Card"

const Product= (props)=>{
  const [product , setProduct]= useState()
  const [relatedProduct , setRelatedProduct]=useState([])
  const [error , setError]= useState(false)

const LoadSingleProduct = productId=>{
    console.log("Loading Single Products")
    console.log(productId , "Product Id")
    read(productId)
    .then((data)=>{
        console.log(data , "data from inside LoadSingleProduct")
        if(data.error){
            console.log(data.error , "Error from Product")
            setError(data.error)
        }
        else{
            setProduct(data);
            //fetch related products
            console.log(data._id , "data id")
            listRelated(data._id)
            .then((data)=>{
                if(data.error){
                    setError(data.error)
                }
                else{
                     setRelatedProduct(data);
                }
            })
        }
    })
}



useEffect(()=>{
    console.log("hello from Product")
    const productId = props.match.params.productId
    LoadSingleProduct(productId)
},[props])

return (
    <Layout 
    title={product && product.name}
    description={ product &&  product.description && product.description}
    className="container-fluid"
    >

        <div className="row">
            <div className="col-8">
            {
                product &&
                product.description && 
                < Card product={product} showViewProductButton={false}/>
            }
            <div className="col-4">
                <h4>Related Products</h4>
                {
                    relatedProduct.map((p, i)=>(
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))
                }
            </div>
            </div>
        </div>
    </Layout>
)


}



export default Product;

import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { read } from '../../../ecommerce/controllers/user'
import { update, updateUser } from './apiUser'
import { Redirect } from 'react-router-dom'



const Profile=({props})=>{
    
    const [] = useState({
        name :'',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const {token} = isAuthenticated().token

    const {name , email , password , error , success} = values

     const init =(userId)=>{
         //console.log(userId)
         read(userId, token)
         .then((data)=>{
             if(data.error){
                 setValues({...values , error: true})
             }else{
                 setValues({
                     ...values , name : data.name , email: data.email
                 })
             }
         })
     }

     useEffect(()=>{
         init(match.params.userId)
     },[])

    const handleChange = name=>e =>{
        setValues({...values, error:false , [name]: event.target.value})
    }

    const clickSubmit =(e)=>{
        e.preventDefault()
        update(match.params.userId , token , {name , email , password})
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                updateUser(data , ()=>{
                    setvalues({...values , name: data.name , email :data.email, success: true})
                })
            }
        })

    }

    const redirectUser = (success)=>{
        if(success){
            return <Redirect to='/cart' />
        }
    }

    const profileUpdate = (name , email , password)=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
            </div>    
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    return(
        <Layout
          title="Profile"
          description="Update your profile"
          className="container-fluid"
        >
        {profileUpdate(name , email , password)}
        {redirectUser(success)}
        </Layout>
    )
}

export default Profile
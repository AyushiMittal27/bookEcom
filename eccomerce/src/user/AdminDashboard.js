import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom';



const AdminDashboard=()=>{

      const {user: {_id, name , email ,role} } = isAuthenticated()

      const adminLinks=()=>(
          <div className="card">
              <h4 className="card-header">Admin Links</h4>
              <ul className="list-group">
                  <li className="list-group-item">
                      <Link className="nav-link"to ="/create/category"> Create Category</Link>
                  </li>
              </ul>
              <ul className="list-group">
                  <li className="list-group-item">
                      <Link className="nav-link"to ="/create/product">Create Product</Link>
                  </li>
              </ul>
              <ul className="list-group">
                  <li className="list-group-item">
                      <Link className="nav-link"to ="/admin/orders">View Orders</Link>
                  </li>
              </ul>
              <ul className="list-group">
                  <li className="list-group-item">
                      <Link className="nav-link"to ="/admin/products">Manage Products</Link>
                  </li>
              </ul>
          </div>
      )
       
      const adminInfo=()=>(
           <div className="card">
               <h4 className="card-header">My Profile</h4>
               <ul className="list-group">
                <li className="list-group-item">{name}</li>
               </ul>
               <ul className="list-group">
                <li className="list-group-item">{email}</li>
               </ul>
               <ul className="list-group">
                <li className="list-group-item">{role=== 1 ? "Admin" :"Registered User"}</li>
               </ul>
           </div>
      )
     
    return(
       <Layout title="Dashboard" Description={`G'D ${name}`} className="container-fluid" >
           <div className="row">
               <div className="col-3">
               {adminLinks()}
               </div>
               <div className="col-9">
                {adminInfo()}
                
               </div>
           </div>

       </Layout>
    )
}

export default AdminDashboard;






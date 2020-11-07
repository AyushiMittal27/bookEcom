import React , {useState } from 'react'


const Checkbox=({categories , handleFilters})=>{

const[checked , setChecked]= useState([])


const handletoggle= category => () =>{
   // return the first index or -1
const currentcategoryId= checked.indexOf(category)  
const newCheckedCategoryId= [...checked]
// if currently checked was not already in checked state > push
//else pull/take off
if(currentcategoryId === -1){
   newCheckedCategoryId.push(category)
}
else{
    newCheckedCategoryId.splice(currentcategoryId, 1)
}
//console.log(newCheckedCategoryId)
setChecked(newCheckedCategoryId)
handleFilters(newCheckedCategoryId);
}


    return categories.map((category, i)=>(
        <li  key={i} className="list-unstyled">
            <input onChange={handletoggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="form-check-input" />
    <label className="form-check-label">{category.name}</label>
        </li>
    ))
}


export default Checkbox
const {errorHandler}= require("../helpers/dbErrorHandler");
const Category = require("../models/category");


exports.categoryById=(req, res, next , id)=>{
   Category.findById(id).exec((err, category)=>{
       if(err || !category){
           return res.status(400).json({
               error : "Category doesn't  exits"
           })
       }
       req.category = category
       next();
   })
}


exports.create =(req,res)=>{
    console.log("Request revhed")
    const category= new Category(req.body)
    console.log("request reached" , category)
    category.save((err, data)=>{
        if(err)
        {   console.log(err , "An error occured while creating a new category")
            return res.status(400).json({
                error : errorHandler(err)
             })
        }
        console.log(data)
        res.json(data);
    })
}

exports.read=(req, res)=>{
    return res.json(req.category)
}


exports.update=(req, res)=>{
 const category = req.category
 category.name = req.body.name
 category.save((err , data)=>{
     if(err){
         res.status(400).json({
             error : errorHandler(err)
         })
     }
     res.json(data);
 })
}

exports.remove=(req, res)=>{
    const category = req.category;
    category.remove((err, data)=>{
        if(err){
            res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({
            message : " Category Deleted"
        })
    })
}

exports.list=(req, res)=>{
    Category.find().exec((err, data)=>{
    if(err){
        res.status(400).json({
            error: errorHandler(err)
        })
    }
    res.json(data)       
    })
}
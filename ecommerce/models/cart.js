const mongoose = require("mongoose")
const Schmea = mongoose.Schema
const {ObjectId} = mongoose.Schema


const CartItemSchema = new mongoose.Schema({
    product: {type:ObjectId , ref:"Product"},
    name: String,
    price:Number,
    count:Number
},{timestamps:true}
)

const CartItem = mongoose.model("CartItem" , CartItemSchema)
module.exports = CartItem


const OrderSchema = new mongoose.Schema({
    products:[CartItemSchema],
    transaction_id: {},
    amount:{type:Number},
    address: String,
    status:{
        type:String,
        default:'Not processed',
        enum:["Not processed" , "Processing" , "Shipped" , "Delivered", "Cancelled"] //enum means String objects
    },
    updated: Date,
    user:{type:ObjectId , ref:"User"}
},{timestamps:true})

const Order = mongoose.model("Order" , OrderSchema)
module.exports =Order
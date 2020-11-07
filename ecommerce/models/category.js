const mongoose = require('mongoose')



let categorySchema = new mongoose.Schema({

    name :{
        type: String,
        trim: true,
        require: true,
        max: 32,
        unique: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Category", categorySchema)
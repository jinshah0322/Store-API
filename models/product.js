const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"Product Name must be provided."],
    },
    price:{
        type:Number,
        required:[true,"Product price must be provided."],
    },
    featured:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        default:4.5,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    company:{
        type:String,
        enum:{
            values:["ikea","liddy","caressa","marcos"],
            message:"{VALUE} is not supported"
        },
        // enum:["ikea","liddy","caressa","marcos"],
    },
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
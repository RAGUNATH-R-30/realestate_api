const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    property_type:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:Number,
        default:0,
    }
});

module.exports = mongoose.model("Property", propertySchema, "properties");

const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ProductSchema=new Schema({
    image:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
   
    
});
module.exports=Product = mongoose.model("Product", ProductSchema);
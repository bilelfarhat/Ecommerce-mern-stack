const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const CategorieSchema=new Schema({
    name:{
        type:String,
        required:true,
    }
    
   
});
module.exports=Categorie = mongoose.model("Categorie", CategorieSchema);
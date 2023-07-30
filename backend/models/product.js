const mongoose = require("mongoose");
const {Schema , model} =mongoose;

const ProductSchema  = new Schema({
    prodname:{type:String , required:true},
    prodimage:{type:String , required:true},
    prodtype:{type:String , required:true},
    prodduration:{type:String , required:true},
    prodprice:{type:String, required:true},
});

const ProductModel = model('product' , ProductSchema);
module.exports = ProductModel;
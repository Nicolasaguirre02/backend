import mongoose from "mongoose";

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    titulo:{type:String, require:true},
    price:{type:Number, require:true},
    disponible:{type:Boolean, require:true}
});

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
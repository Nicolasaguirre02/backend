import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    titulo:{type:String, require:true},
    price:{type:Number, require:true},
    disponible:{type:Boolean, require:true}
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
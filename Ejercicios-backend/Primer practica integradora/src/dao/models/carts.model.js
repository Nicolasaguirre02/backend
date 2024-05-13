import mongoose from 'mongoose';

//Crea la coleccion
const cartsCollection = 'carts';

//Crea el esquema de la coleccion
const cartsSchema = new mongoose.Schema({
    products:[{
        product: {type: Number},
        quantity: {type: Number}
    }]
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
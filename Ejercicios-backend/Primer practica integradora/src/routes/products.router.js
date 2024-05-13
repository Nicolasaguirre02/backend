import { Router, raw, response } from "express";
import productsModel from "../dao/models/products.model.js";
import mongoose from "mongoose";

const router = Router();

router.get('/products', async(req, res) => {
    try {
        let listProducts = await productsModel.find();
        res.send({response:"Succes", playload:listProducts});
    } catch (error) {
        console.log("Erro al listar productos", error);
    }
});

router.get('/products/:pid', async(req, res) => {
    try {
        let productID = req.params.pid;
        let product = await productsModel.findById(productID);
        if(!product){
            res.send({status:"error", error:"Producto no encontrado"})
        }
        res.send({response:"Succes", playload:product});
    } catch (error) {
        console.log("error al buscar producto por ID", error);
    }
});

router.post('/products', async(req, res) => {
   try {
     let {titulo, price, disponible} = req.body;
    if(!titulo || !price || !disponible){
        res.send({status:"error", error:"Faltan parametros"});
    }
    let result =  await productsModel.create({titulo,price,disponible})
    res.send({response:"Succes", playload:result});
} catch (error) {
    console.log("Error al crear un nuevo producto", error)
   }
})

router.put('/products/:pid', async(req, res) => {
    try {
        let productID = req.params.pid;
        let productModificado = req.body;
        let product = await productsModel.findById(productID);

        if(!productModificado.titulo || !productModificado.price || !productModificado.disponible){
            res.send({status:"error", error:"Faltan parametros"})
        }
        product = productModificado;
        await productsModel.updateOne({ _id: productID }, product);
        res.send({response:"Succes", playload:product}); 
    } catch (error) {
        console.log("Error al modificar el producto", error)
    }
})

router.delete('/products/:pid', async(req, res) => {
    try {
        let productID = req.params.pid;
        let resultado = await productsModel.deleteOne({_id:productID})
        res.send({response:"Succes", playload:resultado});
    } catch (error) {
        res.send({status:"error", error:"Error al eliminar"})
    }
})

export default router
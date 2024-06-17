import { Router } from "express";
import cartsModel from "../../dao/models/carts.model.js";
import mongoose from "mongoose";

const router = Router();

router.get('/carts', async(req, res) => {
    try {
        let listCarts = await cartsModel.find();
        res.send({result:'succes', payload: listCarts});
    } catch (error) {
        console.log("Error al listar carts", error)
    }
});

router.get('/carts/:cid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let cart = await cartsModel.findById(idCart).populate('products.product');
        res.send({result:'succes', payload: cart});
    } catch (error) {
        console.log("Error al listar carts", error)
    }
});

router.post('/carts', async(req, res) => {
    try {
        let newCart = {products:[]};
        let result = await cartsModel.create(newCart);
        res.send({result:"Succes", payload:result})
    } catch (error) {
        console.log("Error al crear el carrito")
    }
})

router.post('/carts/:cid/product/:pid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let idProduct = req.params.pid;
        let cartSelect = await cartsModel.findById(idCart); //Guarda el carrito seleccionado con el id del parametro
        let listProducts = cartSelect.products; //Guarda la LISTA de productos que tiene el carrito
        let productFromCart = listProducts.find(producto => producto.product == idProduct); //Guarda el producto seleccionado por el ID {idProducto, cantidad}

        if(!productFromCart){ //Si el producto no existe, crea uno nuevo
            const newProduct = {
                product:idProduct,
                quantity:1
            };
            listProducts.push(newProduct)

        }else{ //Si ya existe el producto dentro del carrito, solo suma uno
            let quantityProduct  = parseInt(productFromCart.quantity) + 1; 
            productFromCart.quantity = quantityProduct ;
        }
        cartSelect.save(); 
        res.send({result:"Succes", payload:cartSelect}) 
        
    } catch (error) {
        console.log("Error al agregar producto al carrito", error)
    }
})


//Elimina el producto del carrito
router.delete('/carts/:cid/product/:pid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let idProduct = req.params.pid;
        let cartSelect = await cartsModel.findById(idCart);
        let listProducts = cartSelect.products;
        cartSelect.products = listProducts.filter(producto => producto.product != idProduct);
        await cartSelect.save();
        res.send({status:"Succes", playload:cartSelect});
    } catch (error) {
        console.log("Error al eliminar un producto", error)
    }
})


//Modifica el arreglo de productos
router.put('/carts/:cid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let idProduct = req.params.pid;
        let newListProducts = req.body;
        let cartSelect = await cartsModel.findById(idCart);
        cartSelect.products = newListProducts;
        await cartSelect.save();
        res.send({status:"Succes", playload:cartSelect});
    } catch (error) {
        console.log("Error al modificar el arreglo de productos", error)
    }
})


//Modifica la cantidad de un producto
router.put('/carts/:cid/product/:pid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let newQuantity = req.body;
        console.log(newQuantity.key)
        let idProduct = req.params.pid
        let cartSelect = await cartsModel.findById(idCart);
        let listProducts = cartSelect.products; 
        let productFromCart = listProducts.find(producto => producto.product == idProduct); 

        if(productFromCart){ 
            productFromCart.quantity = newQuantity.quantity;
        }else{ 
            res.send({status:"error", error:"No existe producto"});
        }

        await cartSelect.save();
        res.send({status:"Succes", playload:cartSelect});
    } catch (error) {
        console.log("Error al modificar el arreglo de productos", error)
    }
})



//Eliminar todos los productos del carrito
router.delete('/carts/:cid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let cartSelect = await cartsModel.findById(idCart);
        cartSelect.products = [];
        await cartSelect.save();
        res.send({status:"Succes", playload:cartSelect});
    } catch (error) {
        console.log("Error al eliminar un producto", error)
    }
})


export default router
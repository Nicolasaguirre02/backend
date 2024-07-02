import { Router } from "express";
import cartsModel from "../../dao/models/carts.model.js";
import cartsController from '../../controlles/cartsController.js'
import mongoose from "mongoose";

const router = Router();

//Lista todos los carritos
router.get('/carts',  cartsController.getAllCarts);

//Mustra carrito por ID
router.get('/carts/:cid', cartsController.getCartId);

//Crea un nueco carrito
router.post('/carts', cartsController.newCart)

//Asigna n producto a un carrito
router.post('/carts/:cid/product/:pid', cartsController.newProductToCart)

/* router.post('/carts/:cid/product/:pid', async(req, res) => {
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
}) */



//Elimina el producto del carrito
router.delete('/carts/:cid/product/:pid', cartsController.deletProdcutFromCart)

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
router.delete('/carts/:cid', cartsController.deleteAllProductsFromCart)



export default router
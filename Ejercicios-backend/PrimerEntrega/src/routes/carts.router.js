const express = require('express');
const router = express.Router();
const Cart = require('../cart.js');
const carrito = new Cart();

router.get("/carts/:cid", async(req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await carrito.getCartById(cartId);
        res.json(cart)
    } catch (error) {
        res.json({error:'No existe carrito con ese ID'})
    }
})

router.post("/carts", async(req, res) => {
    try {
        const newCart = req.body;
        await carrito.addCart(newCart);
        res.json({message:'Carrito creado con exito'})
    } catch (error) {
        res.json({error:'Error al crear un nuevo carrito'})
    }
})


router.post("/carts/:cid/product/:pid", async(req, res) => {
    try {
        const idCarrito = req.params.cid;
        const idProducto = req.params.pid;
        await carrito.addToListProducts(1, 1);
        res.json({message:'Se agrego el producto con exito'})
    } catch (error) {
        res.json({error:'Error al agregar el producto al carrito'})
    }
})  



module.exports = router;
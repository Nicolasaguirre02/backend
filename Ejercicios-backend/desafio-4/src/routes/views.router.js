import express, { Router } from 'express';
const ruouter = express.Router();
import ProdcutManage from '../services/productService.js'; //Utilizo la clase del desafio_2
import router from './products.router.js';
const productos = new ProdcutManage('./productos.json');

ruouter.get('/home', async(req, res) => {
    const listProducts = await productos.getProducts();
    console.log(listProducts)
    
    res.render('home', {listProducts})
});

ruouter.get('/realTimeProducts', async(req, res) => {
    res.render('realTimeProducts', {})
})

export default ruouter
import express from 'express';
import productModel from '../dao/models/products.model.js'
import cartsModel from '../dao/models/carts.model.js';
/* import {estaAutenticado, noEstaAutenticado} from '../middleware/auth.js' */
import { authToken } from '../utils.js';
const router = express.Router();

router.get('/', authToken, (req, res) => {
    res.render('chat', {})
});

router.get('/products',authToken,async (req,res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await productModel.paginate({},{page,limit:5,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)

    console.log("Esto manda al html,",{...result, user: req.user} )
    res.render('products', {...result, user: req.user}); 
})

router.get('/cart/:cid',async (req,res)=>{
    let idCart = req.params.cid;
    let result = await cartsModel.findById(idCart).populate('products.product').lean();
    res.render('carts', result)
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})





export default router;
import express from 'express';
import productModel from '../dao/models/products.model.js'
import cartsModel from '../dao/models/carts.model.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.render('chat', {})
});

router.get('/products',async (req,res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await productModel.paginate({},{page,limit:2,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/view/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/view/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('products',result)
})

router.get('/cart/:cid',async (req,res)=>{
    let idCart = req.params.cid;
    let result = await cartsModel.findById(idCart).populate('products.product');
    res.render('carts', result)
})

export default router;
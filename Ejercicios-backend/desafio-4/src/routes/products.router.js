import express from 'express';
const router = express.Router();
import prodcutManage from '../services/productService.js'; 
const productos = new prodcutManage('./productos.json');


router.get("/products", async (req, res) => {
    try {
        const listProducts = await productos.getProducts();
        let limit = req.query.limit;
        
        const listaProductosLimint =[];
        let  contador = 1;
        listProducts.map((producto)=>{
            if(contador <= limit){
                contador++;
                listaProductosLimint.push(producto);
            }
        }); 

        if(listaProductosLimint.length != 0){
            res.json(listaProductosLimint);
        }else{
            res.json(listProducts);
        }
    } catch (error) {
        res.json({error : 'Error al listar los productos'})
    }
});

router.get("/products/:pid", async(req, res) => {
    try {
        const idProdcut = parseInt(req.params.pid);
        const listaProducts = await productos.getProducts();
        const productEncontrado = listaProducts.find(product => product.id == idProdcut)
        res.json(productEncontrado)
    } catch (error) {
        res.json({error: "No existe producto con ese ID"})
    }
})



router.post("/products", async (req, res) => {
    try {
        const newProduct = req.body;
        console.log(newProduct)
        if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.code || !newProduct.stock || !newProduct.status ) {
            return res.json({ error: 'Los campos son obligatorios' });
        } 
        await productos.addProduct(newProduct);
        res.json({message: "Producto agregado correctamente"})    
    } catch (error) {
        res.json({ error: 'Error al agregar el producto' });
    }    
});


router.put("/products/:pid", async(req, res) => {
    try {
        const listaProducts = await productos.getProducts();
        const idProduct = parseInt(req.params.pid);
        const productModificado = req.body;
        const indiceProduct = listaProducts.findIndex(product => product.id === idProduct);

        if(indiceProduct){
            listaProducts[indiceProduct] = {
                ...listaProducts[indiceProduct],
                ...productModificado
            };
            await productos.updateProduct(listaProducts)
            res.json({message: "Producto modificado correctamente"})
        }
       
    } catch (error) {
        res.json({error: "Error al modificar el producto"})
    }
})


router.delete("/products/:pid", async(req, res) => {
    try {
        const idProduct = parseInt(req.params.pid);
        await productos.deleteProduct(idProduct);
        res.json({message:"Producto eliminado correctamente"})
    } catch (error) {
        res.json({error:"Error al eliminar el producto"})
    }
})


export default router
const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

const ProdcutManage = require('../../desafio-2/src/app.js'); //Utilizo la clase del desafio_2
const productos = new ProdcutManage('./productos.json');


//Mostrar todos los productos
function readProducts(){
    app.get('/products',async (req, res) => {
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
            res.send(listaProductosLimint);
        }else{
            res.send(listProducts);
        }

    })
}
readProducts();


function readProductByID(){
    app.get('/products/:pid', async (req, res) => {
        const listaProducts = await productos.getProducts();
        const id = req.params.pid;
        const productById = listaProducts.find((product) => product.id === parseInt(id));
        if(productById){
            res.send(productById);
        }else{
            res.send({"respuesta":"Producto no encontrado"})
        }
    }
)}
readProductByID();


app.listen(8080,()=>console.log("Servidor en puerto  8080"))    
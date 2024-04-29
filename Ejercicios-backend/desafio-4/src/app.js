import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import vewsRouter from './routes/views.router.js'
//importacion de 'server' a partir del server http
import {Server} from 'socket.io'
import productosRoutes from "./routes/products.router.js";

import prodcutManage from './services/productService.js'; 
const productos = new prodcutManage('productos.json');
  
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, ()=> {console.log("En puerto: ", PORT)}) 

//Configucarion de hanlebars
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

const socketServer = new Server(httpServer);



app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use('/', vewsRouter);
app.use("/api", productosRoutes); 






socketServer.on('connection', async (socket) => {
    /* const listaProductos = await productos.getProducts();  */
    
    socketServer.emit('listProducts', await productos.getProducts()) 

    //console.log("nueco cliente conectado");
    socket.on('newProduct', async(product) => {
        await productos.addProduct(product) 
        console.log("Agregado correctamente");
        socketServer.emit('listProducts', await productos.getProducts()) 
    });

    socket.on('eliminarProduct', async(id) => {
        await productos.deleteProduct(id);
        console.log("Eliminado correctamente");
        socketServer.emit('listProducts', await productos.getProducts()) 
    })
})
 

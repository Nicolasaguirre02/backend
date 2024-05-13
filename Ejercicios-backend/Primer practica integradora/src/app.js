import express from 'express';
import mongoose from 'mongoose';
import routerCarts from './routes/carts.router.js';
import routerProducts from './routes/products.router.js';
import routerView from "./routes/views.router.js"
import routerMessage from './routes/messages.router.js';
import handlebars from "express-handlebars";
import {Server} from 'socket.io';
import __dirname from './utils.js';

import messageModel from './dao/models/messages.model.js';

const app = express();
const httpServer = app.listen(8080,()=>console.log("Conectado en puerto 8080"));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', routerCarts);
app.use('/api', routerProducts);



mongoose.connect("mongodb+srv://nicolas:Colon1905@cluster0.5kklvxo.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Conexion correta con db ecommerce");
    })
    .catch((error) => {
        console.log("Error al la coneccion con db ecommerce", error);
    });

    app.use('/chat', routerView);
    app.use('/api', routerMessage);



//Configucarion de hanlebars
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

const socketServer = new Server(httpServer);


socketServer.on('connection', async(socket) => {
    socketServer.emit('listMessage', await messageModel.find());

    socket.on('eliminarMessage', async(id) => {
        await messageModel.deleteOne({_id:id});
        socketServer.emit('listMessage', await messageModel.find());
    });

    socket.on('newMessage', async(message) => {
        await messageModel.create(message);
        socketServer.emit('listMessage', await messageModel.find());
    });
})
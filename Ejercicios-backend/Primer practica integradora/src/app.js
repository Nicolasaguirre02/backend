import express from 'express';
import mongoose from 'mongoose';
import routerCarts from './routes/api/carts.router.js';
import routerProducts from './routes/api/products.router.js';
import routerView from "./routes/views.router.js"
import routerMessage from './routes/api/messages.router.js';
import handlebars from "express-handlebars";
import {Server} from 'socket.io';
import __dirname from './utils.js';
import messageModel from './dao/models/messages.model.js';
import routerUser from './routes/api/users.router.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';


//Imports session 
import cookieParse from 'cookie-parser';
import session from "express-session";
import MongoStore from 'connect-mongo'



const app = express();
const httpServer = app.listen(8080,()=>console.log("Conectado en puerto 8080"));


app.use(express.json());
app.use(express.urlencoded({extended:true}));





mongoose.connect("mongodb+srv://nicolas:Colon1905@cluster0.5kklvxo.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Conexion correta con db ecommerce");
    })
    .catch((error) => {
        console.log("Error al la coneccion con db ecommerce", error);
    });






//Session 
app.use(cookieParse());

app.use(session({
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://nicolas:Colon1905@cluster0.5kklvxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        ttl:100
    }),
    secret:'12345',
    resave:false,
    saveUninitialized:false,
    cookie: { secure: false }
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/chat', routerView);
app.use('/', routerView);

app.use('/api', routerCarts);
app.use('/api', routerProducts);
app.use('/api', routerUser);
app.use('/api', routerMessage);


/* 

app.get('/practicando', (req, res) => {
    if(req.session.views){
        req.session.views++
        res.send(`<h1>sessions : ${req.session.views}</h1>`)
    }else{
        req.session.views = 1;
        res.send('Bienvenido')
    }

    console.log("verrrr", req.session)
}) */

 








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
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

//Agregar conexion con el servidor de correo
const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
      user:"aguirrenicolas135@gmail.com",
      pass:""
    }
  })
  
  async function enviarMail(tiket) {
    try {
      await transport.sendMail({
        from: "holaaaa@coder.com",
        to: "aguirrenicolas135@gmail.com",
        subject: "Nuevo pedido",
        html: `<h1>Productos</h1>
        <p>Codigo ${tiket.code}</p>
        <p>Codigo ${tiket.amount}</p>
        <p>purchaser ${tiket.purchaser}</p>
        <p>hora ${tiket.purchase_datetime}</p>
        `,
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  }

//Generar un coidog aletaorio
const generarCodigo = () => {
    return Math.random().toString(36).substr(2, 9); 
  };


//Middleware para estrategia current


export const createHash =  password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//Devuelve true o false dependiendo si coincide o no 
export const isValidPassword = (user, password) => bcrypt.compareSync(password,user.password);


//---JWT
const PRIVATE_KEY = "nicolasContra";
const generarToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn:'24h'});
    console.log("Funcion generar token ", token )
    return token;
};
const authToken = (req, res, next) => {
    const authHeader = req.cookies.token;
   
    if(!authHeader) return res.status(401).send({error:"No auotrizadooo"});

    jwt.verify(authHeader,PRIVATE_KEY, (error, credenciales) => {
        if(error) return res.status(403).send({error:"No autorizadoo"});
        console.log("paso aut toejn")
        req.user = credenciales.user
        next();
    })
}

export default __dirname;
export {generarToken, authToken, generarCodigo, enviarMail};
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



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
    if(!authHeader) return res.status(401).send({error:"No auotrizado"});

    jwt.verify(authHeader,PRIVATE_KEY, (error, credenciales) => {
        if(error) return res.status(403).send({error:"No autorizado"});
        req.user = credenciales.user
        next();
    })
}

export default __dirname;
export {generarToken, authToken};
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);
import bcrypt from 'bcrypt';

export const createHash =  password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Devuelve true o false dependiendo si coincide o no 
export const isValidPassword = (user, password) => bcrypt.compareSync(password,user.password);


export default __dirname;
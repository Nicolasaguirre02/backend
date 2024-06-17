import Router, { response } from 'express'
import User from '../../dao/models/users.model.js';
import { createHash, isValidPassword } from '../../utils.js';
import passport from 'passport';
import { generarToken, authToken } from '../../utils.js';

const router = Router();

router.post('/login', passport.authenticate('login',{failureRedirect:'faillogin'}) ,async(req, res) => {
    const loginUser = req.body;
    const user = req.user;
    let isAdmin = false;
    if(!loginUser.email ||!loginUser.password) return res.status(400).send({status:"error", error:"Datos incompletos"})
    try {
        if(user._doc.rol === "admin"){
            isAdmin = true
        }
        user._doc.tipoUsuario = isAdmin;

        const newToken = generarToken(user);

        console.log('Este es mi usuario',user);
        res.cookie('token', newToken, {maxAge:10000, httpOnly:true}); 
        res.redirect('/products')
       
    } catch (error) {
         res.send({response:'Error', error:error}) 
    }
})


router.get('/faillogin', (req,res) => {
    res.send({error:"Error login"})
})


router.get('/current', authToken,(req, res) => {
    
    res.send({status:"succes", playload:req.user})
})



router.post('/register', passport.authenticate('register',{failureRedirect:'failregister'}),async(req,res) => {
    /* res.send({status:"succes"}) */
     res.redirect('/login'); 
});

router.get('/failregister', async(req, res) => {
    res.send({error:"Fallo"})
})



router.get('/github', passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{
    res.redirect('/products')
})


router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
   let user = req.user;
   let newToken = generarToken(user);
    res.cookie('token', newToken, {maxAge:10000, httpOnly:true}); 

    res.redirect('/products')
})

router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) return res.status(500).send('Error al cerrar sesion');
        res.redirect('/login')
    })
})


export default router
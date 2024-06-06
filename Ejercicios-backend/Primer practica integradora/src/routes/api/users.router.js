import Router, { response } from 'express'
import User from '../../dao/models/users.model.js'
import { createHash, isValidPassword } from '../../utils.js';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('login',{failureRedirect:'faillogin'}) ,async(req, res) => {
    const loginUser = req.body;
    if(!loginUser.email ||!loginUser.password) return res.status(400).send({status:"error", error:"Datos incompletos"})
    try {
        /* const user = await User.findOne({email}, {email:1,first_name:1,last_name:1,password:1});
        if(!user) return res.status(404).send('No se encontro usuario');
        if(!isValidPassword(user, password)) return res.status(403).send({status:"error", error:"Incorrect password"})
        delete user.password */
        let tipoUsuario = false;
        if(loginUser.rol === "admin"){
            tipoUsuario = true
        }
        
        req.session.user = {
            id: loginUser._id,
            first_name: loginUser.first_name,
            last_name: loginUser.last_name,
            email: loginUser.email,
            age: loginUser.age,
            rol: tipoUsuario
        }
        res.redirect('/products')
       
    } catch (error) {
         res.send({response:'Error', error:error}) 
    }
})


router.get('/faillogin', (req,res) => {
    res.send({error:"Error login"})
})






router.post('/register', passport.authenticate('register',{failureRedirect:'failregister'}),async(req,res) => {
    res.redirect('/login');
});

router.get('/failregister', async(req, res) => {
    res.send({error:"Fallo"})
})



router.get('/github', passport.authenticate('github',{scope:['user:email']}), async(req,res)=>{

})


router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}),async(req,res)=>{
    req.session.user = req.user;
    res.redirect('/products')
})




router.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) return res.status(500).send('Error al cerrar sesion');
        res.redirect('/login')
    })
})


export default router
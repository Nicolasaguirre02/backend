import Router, { response } from 'express'
import User from '../../dao/models/users.model.js'

const router = Router();

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(404).send('No se encontro usuario');
        let tipoUsuario = false;
        if(user.rol === "admin"){
            tipoUsuario = true
        }
        
        req.session.user = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            rol: tipoUsuario
        }
        res.redirect('/products')
       
    } catch (error) {
         res.send({response:'Error', error:error}) 
    }
})

router.post('/register', async(req,res) => {
    const user = req.body;
    user.rol = 'usuario'
    try {
        const newUser = new User(user);
        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        res.send({error})
    }
})


router.post('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) return res.status(500).send('Error al cerrar sesion');
        res.redirect('/login')
    })
})


export default router
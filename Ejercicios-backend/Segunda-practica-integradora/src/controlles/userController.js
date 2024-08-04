import express from "express";
import UserDTO from "../dao/DTOs/user.dto.js";
import userService from "../services/userService.js";
import { Router } from "express";
import { generarToken, authToken, isValidPassword, createHash } from "../utils.js";

const router = express.Router();

async function modifyRoleController(req, res){
  try {
    let userId = req.params.uid;
    let role = req.body.role;
    if(role != "user" && role != "premium"){
      res.status(400).json({ "sastus":"400", "respuesta": 'El usuario debe ser user o premium' });
      return
    }

    const user = await userService.getUserIdService(userId);
    if(!user){
      res.status(400).json({ "sastus":"400", "respuesta": 'No existe usuario con este id' });
      return
    }
    
    user.rol=role;
    await userService.modifyRoleService(userId, user)
    res.status(200).json({"status":"succes", "respuesta":user})
  } catch (error) {
    req.logger.error("No se puedo modificar el rol")
    res.status(500).json({ respuesta: 'No se puedo modificar el rol' });
  }
}

async function recoverPasswordController(req, res) {
  try {
    let { email, password } = req.body;

    //console.log("desde el controller", email)
    const user = await userService.recoverPasswordService({email:email}); 
   // console.log("desde el controller", user)
    const mismoPassword = isValidPassword(user, password);
    if(mismoPassword){
      res.status(400).json({ "sastus":"400", "respuesta": 'Tu contraseña no puede ser igual a la anterior' });
      return
    }

    const newPassword = createHash(password);
    user.password = newPassword;

    const respuestaPut = await userService.putPasswordUserService(user._id.valueOf(), user);

    res.status(200).json({"status":"succes", "respuesta":"Contraseña actualizada correctamente"})
} catch (error) {
    req.logger.error("No existe usuario con este mail")
    res.status(500).json({ respuesta: 'Error al actualizar la contraseña' });
}
}

async function loginController(req, res) {
  //console.log("Veri que imprimie.", req.user)
  const loginUser = req.body;
 // console.log("loginUser", loginUser);
  const user = req.user;
  //console.log("user", user);
  let isAdmin = false;
  if (!loginUser.email || !loginUser.password)
    return res
      .status(400)
      .send({ status: "error", error: "Datos incompletos" });
  try {
    if (user._doc.rol === "premium") {
      isAdmin = true;
    }
    user._doc.tipoUsuario = isAdmin;

    const newToken = generarToken(user);

    console.log("Este es mi usuario", user);
    res.cookie("token", newToken, { maxAge: 10000, httpOnly: true });
    res.redirect("/products");
  } catch (error) {
    res.json({ response: "Error", error: error });
  }
}

async function failLoginController(req, res) {
  res.json({ error: "Error login" });
}

async function currentController(req, res) {
  let {first_name, last_name, rol, cart} =  req.user;
  const registeredUser = new UserDTO({first_name, last_name, rol, cart})

  res.json({ status: "succes", playload: registeredUser });
}

async function registerController(req, res) {
  res.redirect("/login");
}

async function failRegisterController(req, res) {
  res.send({ error: "Fallo" });
}

async function githubController(req, res) {
  res.redirect("/products");
}

async function githubCallbackController(req, res) {
  let user = req.user;
  let newToken = generarToken(user);
  res.cookie("token", newToken, { maxAge: 10000, httpOnly: true });

  res.redirect("/products");
}

async function logoutController(req, res) {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error al cerrar sesion");
    res.redirect("/login");
  });
}

export default {
  loginController,
  failLoginController,
  currentController,
  registerController,
  failRegisterController,
  githubController,
  githubCallbackController,
  logoutController,
  recoverPasswordController,
  modifyRoleController
};

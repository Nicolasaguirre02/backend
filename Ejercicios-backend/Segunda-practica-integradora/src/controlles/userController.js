import express from "express";
import UserDTO from "../dao/DTOs/user.dto.js";
import { Router } from "express";
import { generarToken, authToken } from "../utils.js";

const router = express.Router();

async function loginController(req, res) {
  console.log("Veri que imprimie.", req.user)
  const loginUser = req.body;
  console.log("loginUser", loginUser);
  const user = req.user;
  console.log("user", user);
  let isAdmin = false;
  if (!loginUser.email || !loginUser.password)
    return res
      .status(400)
      .send({ status: "error", error: "Datos incompletos" });
  try {
    if (user._doc.rol === "admin") {
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
};

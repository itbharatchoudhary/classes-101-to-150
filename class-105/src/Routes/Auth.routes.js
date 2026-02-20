const express = require("express");

const {
  RegisterController,
  LoginController,
  LogoutController
} = require('../Controller/Auth.Controller');

const AuthRoutes = express.Router();

AuthRoutes.post("/Register",RegisterController);

AuthRoutes.post("/Login",LoginController);

AuthRoutes.post("/Logout",LogoutController);

module.exports = AuthRoutes; 

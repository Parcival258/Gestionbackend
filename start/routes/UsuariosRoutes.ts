import router from "@adonisjs/core/services/router";
import UsuariosController from "../../app/controller/Http/UsuariosController.js";

const usuarios = new UsuariosController()

//rutas

//login
router.post(`/login`, usuarios.login)
//register
router.post(`/register`, usuarios.register)
//User by Id
router.post('/userByEmail', usuarios.userByEmail)
//identificar por mail
router.post(`/email`, usuarios.userEmail)
const express = require('express');
const router = express.Router();
const UsuarioController = require('../Controller/usuarioController');
const verifyJWT = require('../Middlewares/auth.middleware');

router.get('/obtenerTodosLosUsuarios', verifyJWT, UsuarioController.obtenerTodosLosUsuarios);
router.post('/crearUsuario', UsuarioController.crearUsuario);
router.post('/iniciarSesion', UsuarioController.iniciarSesion);

module.exports = router;
const express = require('express');
const router = express.Router();
const UsuarioController = require('../Controller/usuarioController');

router.get('/obtenerTodosLosUsuarios', UsuarioController.obtenerTodosLosUsuarios);
router.post('/crearUsuario', UsuarioController.crearUsuario);
router.post('/iniciarSesion', UsuarioController.iniciarSesion);

module.exports = router;
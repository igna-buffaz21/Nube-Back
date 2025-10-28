const express = require('express');
const router = express.Router();
const LoggerMongoController = require('../Controller/loggerMongoController.js');

router.get('/obtenerLogsPorUsuario', LoggerMongoController.obtenerLogsPorUsuario);

module.exports = router;
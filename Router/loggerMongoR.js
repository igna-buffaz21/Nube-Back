const express = require('express');
const router = express.Router();
const LoggerMongoController = require('../Controller/loggerMongoController.js');

router.post('/obtenerLogsPorUsuario', LoggerMongoController.obtenerLogsPorUsuario);

module.exports = router;
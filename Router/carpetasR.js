const express = require('express');
const router = express.Router();
const CarpetasController = require('../Controller/carpetasController');

router.post('/crearCarpeta', CarpetasController.crearCarpeta);
router.get('/obtenerCarpetas', CarpetasController.obtenerCarpetas);

module.exports = router;
const express = require('express');
const router = express.Router();
const CarpetasController = require('../Controller/carpetasController');

router.post('/crearCarpeta', CarpetasController.crearCarpeta);

module.exports = router;
const express = require('express');
const router = express.Router();
const ArchivoController = require('../Controller/archivoController');
const multer = require('multer');

const upload = multer({ dest: '/tmp'})

router.post('/guardarArchivo', upload.single('file'), ArchivoController.guardarArchivo);

router.get('/servirArchivo', ArchivoController.servirArchivos)

module.exports = router;


const express = require('express');
const router = express.Router();
const ArchivoController = require('../Controller/archivoController');
const multer = require('multer');

const upload = multer({ dest: '/temp'})

router.post('/guardarArchivo', upload.single('file'), ArchivoController.guardarArchivo);

module.exports = router;


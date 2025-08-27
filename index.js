const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: '/srv/proyecto-nube/uploads' });

app.use('/uploads', express.static('/srv/proyecto-nube/uploads'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.post('/upload', upload.single('file'), (req, res) => {

    console.log(req.file); // Información del archivo subido

    if (!req.file) {
      return res.status(400).send('No se subió ningún archivo.');
    }

    res.send(`Archivo ${req.file.originalname} subido correctamente!`);
  });

  

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
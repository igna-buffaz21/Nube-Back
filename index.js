require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pool = require('./config/db.js');
const path = require('path');

const app = express();

const usuarioRouter = require('./Router/usuarioR');

app.use(express.json());

app.use('/api/usuarios', usuarioRouter);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/srv/proyecto-nube/uploads');
    },
    filename: (req, file, cb) => {
      // Extraer extensión original
      const ext = file.originalname.split('.').pop();
      // Generar nombre aleatorio
      const randomName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
      cb(null, randomName);
    }
  });
  
const upload = multer({ storage: storage });

app.use('/uploads', express.static('/srv/proyecto-nube/uploads'));

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    res.send(`DB connection works! Result: ${rows[0].result}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB connection failed');
  }
});

app.post('/upload', upload.single('file'), (req, res) => {

    console.log(req.file); // Información del archivo subido

    if (!req.file) {
      return res.status(400).send('No se subió ningún archivo.');
    }

    res.send(`Archivo ${req.file.originalname} subido correctamente!`);
  });

  const fs = require('fs');

  app.get('/files', (req, res) => {
    const uploadsPath = '/srv/proyecto-nube/uploads';
    fs.readdir(uploadsPath, (err, files) => {
      if (err) return res.status(500).send('Error al leer la carpeta uploads.');
      
      // Usar la IP fija de tu Linux en lugar de req.hostname
      const serverIP = '192.168.0.50'; // reemplazá con la IP de tu Linux
      const fileUrls = files.map(file => `http://${serverIP}:3000/uploads/${file}`);
      
      res.json(fileUrls);
    });
  });
  
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
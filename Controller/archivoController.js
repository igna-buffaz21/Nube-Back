const ArchivosNegocio = require('../Negocio/archivosN');

class ArchivoController {

    static async guardarArchivo(req, res) {
        try {
            const { user_id, folder_id } = req.body;
            const file = req.file;
            const original_name = req.file.originalname;

            console.log("REQ FILE:", req.file);

            const resultado = await ArchivosNegocio.guardarArchivo(user_id, original_name, folder_id, file);

            if (resultado > 0) {
                res.status(201).json({ message: 'Archivo guardado correctamente', fileId: resultado });
            }
            else {
                res.status(400).json({ error: 'No se pudo guardar el archivo' });
            }
        }
        catch (error) {
            console.error('Error en el controlador al guardar archivo:', error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = ArchivoController;
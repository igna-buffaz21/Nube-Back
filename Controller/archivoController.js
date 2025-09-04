const ArchivosNegocio = require('../Negocio/archivosN');

class ArchivoController {

    static async guardarArchivo(req, res) {
        try {
            const { user_id, folder_id } = req.body;
            const file = req.file;

            console.log("REQ FILE:", req.file);
            console.log("FILE " + file)

            const resultado = await ArchivosNegocio.guardarArchivo(user_id, req.file.originalname, folder_id, file);

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

    static async servirArchivos(req, res) {
        try {
            const { id_file, user_id } = req.query

            const response = await ArchivosNegocio.servirArchivos(id_file, user_id)

            res.setHeader("Content-Disposition", "inline");
            res.sendFile(response.file_path);   
        
        }
        catch (error) {
            console.error('Error en el controlador al servir archivo:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async obtenerPesoUsadoPorUsuario(req, res) {
        try {
            const { user_id } = req.query

            const response = await ArchivosNegocio.obtenerPesoUsadoPorUsuario(user_id);

            res.status(200).json({message: response})
        }
        catch (error) {
            console.error('Error en el controlador al servir archivo:', error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = ArchivoController;
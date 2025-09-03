const ArchivosDAO = require('../AccesoDatos/archivosAD')
const CarpetasDAO = require('../AccesoDatos/carpetasAD')
const fs = require('fs/promises'); // para usar await fs.rename(...)
const path = require('path');

class ArchivosNegocio {

    static async guardarArchivo(user_id, original_name, folder_id, file) {

        console.log("FILE EN NEGOCIO:", file);
        console.log("FOLDER ID " + folder_id);

        if (user_id <= 0 || !original_name || folder_id <= 0) {
            throw new Error('Todos los campos son obligatorios');
        }

        const carpetaExistente = await CarpetasDAO.obtenerCarpetaporId(folder_id);

        if (!carpetaExistente) {
            throw new Error('La carpeta no existe');
        }

        const carpetaPath = carpetaExistente.path;

        const ext = path.extname(file.originalname);

        const randomName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;

        const uploadDir = path.join('/srv/proyecto-nube/uploads/' + carpetaPath, randomName);

        console.log("UPLOADDIR ARCHIVO: " + uploadDir);

        const fileExists = await ArchivosDAO.obtenerArchivosPorPath(uploadDir);

        if (fileExists.length > 0) {
            throw new Error('El archivo ya existe con ese nombre en la carpeta seleccionada');
        }

        try {
            const destPath = path.join('/srv/proyecto-nube/uploads/' + carpetaPath, randomName);

            await fs.rename(file.path, destPath); // correcto, devuelve promesa

            const mime_type = file.mimetype;
            const size = file.size;

            const nuevoArchivoId = await ArchivosDAO.guardarArchivo(user_id, original_name, randomName, mime_type, size, folder_id, destPath);

            return nuevoArchivoId;

        }
        catch (error) {
            console.error('Error al guardar el archivo:', error);
            throw new Error('Error al guardar el archivo');
        }
        
    }

    static async servirArchivos(file_id, user_id) {
        const file = await ArchivosDAO.obtenerArchivoPorId(file_id, user_id)

        if (!file) {
            throw new Error('No existe el archivo que se solicito');
        }

        const file_path = file.path
        const original_name = file.original_name

        if (!fs.access(file_path)) {
            throw new Error('No existe el archivo que se solicito');
        }

        return {file_path, original_name}
    }

}

module.exports = ArchivosNegocio;
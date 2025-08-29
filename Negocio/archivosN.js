const ArchivosDAO = require('../AccesoDatos/archivosAD')
const CarpetasDAO = require('../AccesoDatos/carpetasAD')
const fs = require('fs');
const path = require('path');

class ArchivosNegocio {

    static async guardarArchivo(user_id, original_name, folder_id, file) {

        if (user_id <= 0 || !original_name || folder_id <= 0) {
            throw new Error('Todos los campos son obligatorios');
        }

        const carpetaExistente = await CarpetasDAO.obtenerCarpetaporId(folder_id);

        if (!carpetaExistente) {
            throw new Error('La carpeta no existe');
        }

        const carpetaPath = carpetaExistente.path;

        const uploadDir = path.join('/srv/proyecto-nube/uploads/' + carpetaPath, original_name);

        const ext = path.extname(original_name);

        console.log("UPLOADDIR ARCHIVO: " + uploadDir);

        const fileExists = await ArchivosDAO.obtenerArchivosPorPath(uploadDir);

        if (fileExists.length > 0) {
            throw new Error('El archivo ya existe con ese nombre en la carpeta seleccionada');
        }

        try {
            const randomName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
            const destPath = path.join('/srv/proyecto-nube/uploads/' + carpetaPath, randomName);

            await fs.rename(file.path, destPath)

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

}

module.exports = ArchivosNegocio;
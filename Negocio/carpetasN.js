const CarpetasDAO = require('../AccesoDatos/carpetasAD')
const fs = require('fs');
const path = require('path');

class CarpetasNegocio {

    static async crearCarpeta(user_id, nombre, parent_id) {
        if (user_id == 0 || !nombre || parent_id == 0) {
            throw new Error('Todos los campos son obligatorios');
        }

        const carpetaExistente = await CarpetasDAO.obtenerCarpetaporId(parent_id);

        if (!carpetaExistente) {
            throw new Error('La carpeta padre no existe');
        }

        const carpetaPath = carpetaExistente.path

        const nuevoPath = path.join(carpetaPath, nombre);

        const uploadDir = path.join('/srv/proyecto-nube/uploads/' + carpetaPath, nombre);

        if (fs.existsSync(uploadDir)) {
            throw new Error('La carpeta ya existe en el sistema de archivos');
        }

        const nuevaCarpetaId = await CarpetasDAO.crearCarpeta(user_id, nombre, parent_id, nuevoPath);

        if (nuevaCarpetaId <= 0) {
            throw new Error('Error al crear la carpeta');
        }

        try {
            fs.mkdirSync(uploadDir, { recursive: true } );
        }
        catch (error) 
        {
            console.error('Error al crear el directorio de la carpeta:', error);
            throw new Error('Error al crear el directorio de la carpeta');
        }

    }   

}

module.exports = CarpetasNegocio;
const CarpetasDAO = require('../AccesoDatos/carpetasAD')
const ArchivosDAO = require('../AccesoDatos/archivosAD');
const fs = require('fs');
const path = require('path');

class CarpetasNegocio {

    static async crearCarpeta(user_id, nombre, parent_id) {
        if (user_id == 0 || !nombre || parent_id == undefined || parent_id == null) {
            throw new Error('Todos los campos son obligatorios');
        }

        if (parent_id == 0) {
            const response = await CarpetasDAO.obtenerCarpetasRoot(user_id)

            if (response && response.length > 0) {
                parent_id = response[0].id
            }
            else {
                throw new Error('No se encontro la carpeta root');
            }
            
        }

        const carpetaExistente = await CarpetasDAO.obtenerCarpetaporId(parent_id);

        if (!carpetaExistente) {
            throw new Error('La carpeta padre no existe');
        }

        const carpetaPath = carpetaExistente.path

        console.log("PATH: " + carpetaPath);

        const nuevoPath = path.join(carpetaPath, nombre);

        const uploadDir = path.join('/srv/proyecto-nube/uploads/' + carpetaPath, nombre);

        console.log("UPLOADDIR: " + uploadDir);

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

    static async obtenerCarpetas(user_id, parent_id) {
        if (user_id == 0) {
            throw new Error('Todos los campos son obligatorios');
        }

        let carpeta;
        let idCarpetaPadre;
    
        if (parent_id == undefined || parent_id == null || parent_id == 0) {

            idCarpetaPadre = await CarpetasDAO.obtenerCarpetasRoot(parseInt(user_id), null);

            if (!idCarpetaPadre || idCarpetaPadre.length === 0) {
                throw new Error('No se encontró la carpeta raíz para el usuario');
            }

            carpeta = await CarpetasDAO.obtenerCarpetas(parseInt(user_id), idCarpetaPadre[0].id);
        }
        else {

            carpeta = await CarpetasDAO.obtenerCarpetas(parseInt(user_id), parseInt(parent_id));

        }

    
        if (!carpeta) {
            throw new Error('No se encontraron carpetas');
        }

        const carpetaActualId = parent_id || idCarpetaPadre[0].id;

        const archivos = await ArchivosDAO.obtenerArchivosPorCarpeta(parseInt(user_id), parseInt(carpetaActualId));
    
        return { 
            carpetas: carpeta, 
            archivos: archivos 
        };
    }

}

module.exports = CarpetasNegocio;
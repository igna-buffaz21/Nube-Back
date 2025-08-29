const CarpetasDAO = require('../AccesoDatos/carpetasAD')

class CarpetasNegocio {

    static async crearCarpeta(user_id, nombre, parent_id) {
        if (user_id == 0 || !nombre || parent_id == 0) {
            throw new Error('Todos los campos son obligatorios');
        }

        const nuevaCarpetaId = await CarpetasDAO.crearCarpeta(user_id, nombre, parent_id);

        if (nuevaCarpetaId <= 0) {
            throw new Error('Error al crear la carpeta');
        }

        return { nuevaCarpetaId };
    }

}

module.exports = CarpetasNegocio;
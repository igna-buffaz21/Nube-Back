const CarpetasNegocio = require('../Negocio/carpetasN');

class CarpetasController {

    async crearCarpeta(req, res) {
        try {
            const { user_id, nombre, parent_id } = req.body;

            const resultado = await CarpetasNegocio.crearCarpeta(user_id, nombre, parent_id);

            res.status(201).json(resultado);
        }
        catch (error) {
            console.error('Error en el controlador al crear carpeta:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async obtenerCarpetas(req, res) {
        try {
            const { user_id, parent_id } = req.query;

            const carpeta = await CarpetasNegocio.obtenerCarpetas(user_id, parent_id);

            res.status(200).json(
                carpeta
            );
        }
        catch (error) {
            console.error('Error en el controlador al obtener carpetas:', error);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new CarpetasController();
const LogsN = require('../Negocio/loggerMongoN.js');

class LoggerMongoController {
    async obtenerLogsPorUsuario(req, res) {
        try {
            const { user_id } = req.query;

            const response = await LogsN.obtenerLogsPorUsuario(user_id);

            res.status(200).json(response);

        }
        catch (error) {
            console.error('Error en el controlador al obtener logs:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LoggerMongoController();
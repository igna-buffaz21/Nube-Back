const LogsDAO = require('../AccesoDatos/loggerMongoAD.js');
const UsuarioDAO = require('../AccesoDatos/usuariosAD.js')

class LogsN {
    static async obtenerLogsPorUsuario(userId) {

        const usuario = await UsuarioDAO.obtenerDatosUsuario(userId);

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        return await LogsDAO.obtenerLogsPorUsuario(userId);
    }
}

module.exports = LogsN;
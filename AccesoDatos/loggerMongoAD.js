const ActivityLog = require('../models/ActivityLog.js');

class LogsDAO {
    static async guardarLog({ userId, username, action, description, req, date }) {
        try {
            await ActivityLog.create({
                userId,
                username,
                action,
                description,
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                date
            })
        }
        catch (error) {
            console.error('❌ Error al guardar log:', error.message);
        }
    }
    
    static async obtenerLogsPorUsuario(userId) {
        try {
            return await ActivityLog.find({userId}).sort({date: -1});
        }
        catch (error) {
            console.error('❌ Error al obtener logs:', error.message);
            throw new Error('Error al obtener logs del usuario');
        }
    }
}

module.exports = LogsDAO;

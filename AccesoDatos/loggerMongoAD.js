const ActivityLog = require('../models/ActivityLog.js');

async function guardarLog({ userId, username, action, description, req, date }) {
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

module.exports = { guardarLog };
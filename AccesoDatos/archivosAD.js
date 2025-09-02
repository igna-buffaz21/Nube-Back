const pool = require('../config/db');

class ArchivosDAO {

    static async obtenerArchivosPorPath(path) {
        try {
            const [rows] = await pool.query('SELECT id FROM files WHERE path = ?', [path]);

            return rows;
        }
        catch (error) {
            throw error;
        }
    }

    static async guardarArchivo(user_id, original_name, stored_name, mime_type, size, folder_id, path) {
        try {
            const created_at = new Date() / 1000; 

            const [result] = await pool.query(
                'INSERT INTO files (user_id, original_name, stored_name, path, mime_type, size, created_at, folder_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [user_id, original_name, stored_name, path, mime_type, size, created_at, folder_id]
            );
            return result.insertId;
        }
        catch (error) {
            throw error;
        }
    }

    static async obtenerArchivosPorCarpeta(user_id, folder_id) {
        try {
            const [rows] = await pool.query('SELECT * FROM files WHERE user_id = ? AND folder_id = ?', [user_id, folder_id]);

            return rows;
        }
        catch (error) {
            console.error('Error al obtener archivos por carpeta:', error);
            throw error;
        }
    }
}

module.exports = ArchivosDAO;

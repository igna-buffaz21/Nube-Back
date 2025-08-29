const pool = require('../config/db');

class CarpetasDAO {

    static async obtenerTodasLasCarpetas() {
        try {
            const [rows] = await pool.query('SELECT * FROM folders');
            return rows;
        }
        catch (error) {
            console.error('Error al obtener carpetas:', error);
            throw error;
        }
    }

    static async obtenerCarpetaporId(id) {
        try {
            const [rows] = await pool.query('SELECT id, path FROM folders WHERE id = ?', [id]);

            return rows[0];
        }
        catch (error) {
            console.error('Error al obtener carpeta por ID:', error);
            throw error;
        }
    }

    static async crearCarpeta(user_id, nombre, parent_id, path) {
        try {
            const createdAt = Date.now() / 1000;
            
            const [result] = await pool.query(
                'INSERT INTO folders (user_id, name, parent_id, created_at, path) VALUES (?, ?, ?, ?, ?)',
                [user_id, nombre, parent_id, createdAt, path]
              );

              return result.insertId;
        }
        catch (error) {
            console.error('Error al crear carpeta:', error);
            throw error;
        }
    }
}

module.exports = CarpetasDAO;

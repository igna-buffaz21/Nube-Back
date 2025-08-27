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

    static async crearCarpeta(user_id, nombre, parent_id) {
        try {
            const createdAt = Date.now() / 1000;
            
            const [result] = await pool.query(
                'INSERT INTO folders (user_id, name, parent_id, created_at) VALUES (?, ?, ?, ?)',
                [user_id, nombre, parent_id, createdAt]
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

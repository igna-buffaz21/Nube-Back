const pool = require('../config/db');
const bcrypt = require('bcrypt');

class UsuariosDAO {

    static async obtenerTodosLosUsuarios() {
        try {
            const [rows] = await pool.query('SELECT * FROM user');
            return rows;
        }
        catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }


    static async crearUsuario(nombre, email, phone, password) {
        try {
            const passwordHash = await bcrypt.hash(password, 10);

            const createdAt = Date.now() / 1000; 
            const [result] = await pool.query(
                'INSERT INTO user (name, email, phone, password, created_at) VALUES (?, ?, ?, ?, ?)',
                [nombre, email, phone, passwordHash, createdAt]
            );

            return result.insertId;
        }
        catch (error) {
            console.error('Error al crear usuario:', error);
            throw error;
        }
    }

    static async obtenerUsuarioPorEmail(email) {
        try {
            const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
            return rows[0];
        }
        catch (error) {
            console.error('Error al obtener usuario por email:', error);
            throw error;
        }
    }

    static async iniciarSesion(email) {
        try {
            const [rows] = await pool.query('SELECT id, email, password FROM user WHERE email = ?', [email]);

            return rows[0] || null;
        }
        catch (error) {

        }
    }

    static async obtenerDatosUsuario(id) {
        try {
            const [rows] = await pool.query('SELECT email, name FROM user WHERE id = ?', [id])

            return rows[0];
        }
        catch (error) {
            console.error('Error al obtener datos del usuario por id:', error);
            throw error;
        }
    }
}

module.exports = UsuariosDAO;
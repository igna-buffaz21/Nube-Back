const UsuariosDAO = require('../AccesoDatos/usuariosAD');
const CarpetasDAO = require('../AccesoDatos/carpetasAD');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsuariosNegocio {
    static async obtenerTodosLosUsuarios() {
        try {
            const usuarios = await UsuariosDAO.obtenerTodosLosUsuarios();
            return usuarios;
        } 
        catch (error) {
            console.error('Error en la capa de negocio al obtener usuarios:', error);
            throw error;
        }
    }

    static async crearUsuario(nombre, email, phone, password) {

        if (!nombre || !email || !phone || !password) {
            throw new Error('Todos los campos son obligatorios');
        }

        const usuarioExistente = await UsuariosDAO.obtenerUsuarioPorEmail(email);

        if (usuarioExistente) {
            throw new Error('El email ya está en uso');
        }

        const nuevoUsuarioId = await UsuariosDAO.crearUsuario(nombre, email, phone, password);

        if (!nuevoUsuarioId || nuevoUsuarioId <= 0) {
            throw new Error('Error al crear el usuario');
        }

        await CarpetasDAO.crearCarpeta(nuevoUsuarioId, 'root' + String(nuevoUsuarioId), null, '/' + String(nuevoUsuarioId));

        const uploadDir = path.join('/srv/proyecto-nube/uploads', String(nuevoUsuarioId));

        try {
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
        }
        catch (error) 
        {
            console.error('Error al crear el directorio de usuario:', error);
            throw new Error('Error al crear el directorio de usuario');
        }

        return { nuevoUsuarioId };

    }

    static async iniciarSesion(email, password) {
        const user = await UsuariosDAO.iniciarSesion(email);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error('Credenciales incorrectas');
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return { token };
    }
}

module.exports = UsuariosNegocio;
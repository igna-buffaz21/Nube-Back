const UsuariosDAO = require('../AccesoDatos/usuariosAD');
const CarpetasDAO = require('../AccesoDatos/carpetasAD');
const fs = require('fs');
const path = require('path');

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

        await CarpetasDAO.crearCarpeta(nuevoUsuarioId, 'root' + String(nuevoUsuarioId), null, '/root' + String(nuevoUsuarioId));

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
}

module.exports = UsuariosNegocio;
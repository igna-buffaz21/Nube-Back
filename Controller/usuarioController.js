const UsuariosNegocio = require('../Negocio/usuariosN');

class UsuarioController {

    static async obtenerTodosLosUsuarios(req, res) {
        try {
            const usuarios = await UsuariosNegocio.obtenerTodosLosUsuarios();
            res.json(usuarios);
        } 
        catch (error) {
            console.error('Error en el controlador al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }

    static async crearUsuario(req, res) {
        try {
            const { nombre, email, phone, password } = req.body;

            const resultado = await UsuariosNegocio.crearUsuario(nombre, email, phone, password);
            
            res.status(201).json({ message: 'Usuario creado exitosamente', userId: resultado.nuevoUsuarioId });
        }
        catch (error) {
            console.error('Error en el controlador al crear usuario:', error);
            res.status(500).json({ error: error.message || 'Error al crear usuario' });
        }
    }
}

module.exports = UsuarioController;

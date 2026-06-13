import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

const quitarPassword = (usuario) => {
    const { contraseña, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword;
};

router.get('/all', async (req, res) => {
    try {
        const usersData = await User.find().select('-contraseña');

        res.status(200).json(usersData);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error al obtener usuarios');
    }
});

router.post('/register', async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña } = req.body;

        if (!nombre || !apellido || !email || !contraseña) {
            return res.status(400).json('Faltan datos obligatorios');
        }

        const emailExiste = await User.findOne({
            email: email.toLowerCase()
        });

        if (emailExiste) {
            return res.status(400).json('El email ya está registrado');
        }

        const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await User.create({
            nombre,
            apellido,
            email: email.toLowerCase(),
            contraseña: contraseñaHasheada,
            activo: true,
            admin: false
        });

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            user: quitarPassword(nuevoUsuario.toObject())
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        if (!email || !contraseña) {
            return res.status(400).json('Email y contraseña son obligatorios');
        }

        const usuario = await User.findOne({
            email: email.toLowerCase()
        });

        if (!usuario) {
            return res.status(404).json('Usuario no encontrado');
        }

        if (!usuario.activo) {
            return res.status(403).json('Usuario inactivo');
        }

        const passwordValida = await bcrypt.compare(
            contraseña,
            usuario.contraseña
        );

        if (!passwordValida) {
            return res.status(400).json('Contraseña incorrecta');
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email,
                admin: usuario.admin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            message: 'Login correcto',
            token,
            user: quitarPassword(usuario.toObject())
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al iniciar sesión');
    }
});

export default router;
import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

const filePath = './backend/data/usuarios.json';

const leerUsuarios = async () => {
    const fileUsers = await readFile(filePath, 'utf-8');
    return JSON.parse(fileUsers);
};

const guardarUsuarios = async (usuarios) => {
    await writeFile(filePath, JSON.stringify(usuarios, null, 2), 'utf-8');
};

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

router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id);

        const usersData = await leerUsuarios();

        const fileSales = await readFile('./backend/data/ventas.json', 'utf-8');
        const salesData = JSON.parse(fileSales);

        const userIndex = usersData.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json('Usuario no encontrado');
        }

        const userSales = salesData.some((s) => s.userId === userId);

        if (userSales) {
            return res.status(400).json(
                'No se puede eliminar el usuario porque tiene ventas asociadas'
            );
        }

        usersData.splice(userIndex, 1);

        await guardarUsuarios(usersData);

        res.status(200).json('Usuario eliminado correctamente');

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al eliminar el usuario');
    }
});

export default router;
import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const productsData = await Product.find();

        res.status(200).json(productsData);
    } catch (error) {
        console.error(error);
        res.status(500).json('Error al obtener los productos');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json('Producto no encontrado');
        }

        res.status(200).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al buscar el producto');
    }
});

router.post('/create', async (req, res) => {
    try {
        const { nombre, categoria, precio, imagen, descripcion, stock } = req.body;

        if (!nombre || !categoria || !precio) {
            return res.status(400).json('Nombre, categoría y precio son obligatorios');
        }

        const productToSave = await Product.create({
            nombre,
            categoria,
            precio,
            imagen,
            descripcion,
            stock
        });

        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: productToSave
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Error al crear el producto');
    }
});

router.put('/update/:id', async (req, res) => {
    try {

        const updatedData = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {
                new: true
            }
        );

        if (!product) {
            return res.status(404).json('Producto no encontrado');
        }

        res.status(200).json({
            message: 'Producto actualizado exitosamente',
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al actualizar el producto');
    }
});

export default router;

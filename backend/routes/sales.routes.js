import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import verifyToken from '../middlewares/auth.middleware.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Sale from '../models/Sale.js';

const router = Router();

router.post('/create', verifyToken, async (req, res) => {
    try {
        const { products } = req.body;

        const userId = req.user.id;

        const userExist = await User.findById(userId);

        if (!userExist) {
            return res.status(400).json('El usuario no existe');
        }

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json('Debe enviar al menos un producto');
        }

        const orderProducts = [];

        for (const item of products) {
            const productFound = await Product.findById(item.productId);

            if (!productFound) {
                return res.status(404).json(
                    `El producto con id ${item.productId} no existe`
                );
            }

            const quantity = item.quantity || 1;

            orderProducts.push({
                productId: productFound._id,
                name: productFound.nombre,
                category: productFound.categoria,
                quantity,
                price: productFound.precio,
                subtotal: productFound.precio * quantity
            });
        }

        const total = orderProducts.reduce((acc, product) => {
            return acc + product.subtotal;
        }, 0);

        const orderToSave = await Sale.create({
            userId,
            products: orderProducts,
            total
        });

        res.status(201).json({
            message: 'Orden creada exitosamente',
            order: orderToSave
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Error al crear la orden',
            error: error.message
        });
    }
});

export default router;

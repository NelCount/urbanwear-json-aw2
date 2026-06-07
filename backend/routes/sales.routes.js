import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/create', verifyToken, async (req, res) => {

    try {
        const newOrder = req.body;

        const fileUsers = await readFile('./backend/data/usuarios.json', 'utf-8');
        const usersData = JSON.parse(fileUsers);

        const fileProducts = await readFile('./backend/data/productos.json', 'utf-8');
        const productsData = JSON.parse(fileProducts);

        const fileSales = await readFile('./backend/data/ventas.json', 'utf-8');
        const salesData = JSON.parse(fileSales);

        if (!newOrder.userId) {
            return res.status(400).json('Debe enviar un ussuario');
        }

        const userExist = usersData.some((user) => user.id === newOrder.userId);

        if (!userExist) {
            return res.status(400).json('El usuario no existe');
        }

        if (!Array.isArray(newOrder.products) || newOrder.products.length === 0) {
            return res.status(400).json('Debe enviar al menos un producto');
        }

        const orderProducts = newOrder.products.map((item) => {

            const productFound = productsData.find((product) => product.id === item.productId);

            if (!productFound) {
                throw new Error(`El producto con id ${item.productId} no existe`);
            }

            const quantity = item.quantity || 1;

            return {
                productId: productFound.id,
                name: productFound.nombre,
                category: productFound.categoria,
                quantity: quantity,
                price: productFound.precio,
                subtotal: productFound.precio * quantity
            };
        });

        const total = orderProducts.reduce((acc, product) => {
            return acc + product.subtotal;
        }, 0);

        const lastID = salesData.length > 0 ? salesData[salesData.length - 1].id : 0;

        const orderToSave = {
            id: lastID + 1,
            userId: newOrder.userId,
            products: orderProducts,
            total: total,
            date: new Date().toISOString()
        };

        salesData.push(orderToSave);

        await writeFile('./backend/data/ventas.json', JSON.stringify(salesData, null, 2) , 'utf-8');

        res.status(201).json({
            message: 'Orden creada exitosamente',
            order: orderToSave
        });

    } catch (error) {
        res.status(500).json({
        message: 'Error al crear la orden',
        error: error.message
    });    
    }
});

export default router;

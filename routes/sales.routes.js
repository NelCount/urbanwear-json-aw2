import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const newSale = req.body;

        const fileUsers = await readFile('./usuarios.json', 'utf-8');
        const usersData = JSON.parse(fileUsers);

        const fileProducts = await readFile('./productos.json', 'utf-8');
        const productsData = JSON.parse(fileProducts);

        const fileSales = await readFile('./ventas.json', 'utf-8');
        const salesData = JSON.parse(fileSales);

        const userExists = usersData.some((u) => u.id === newSale.userId);

        if (!userExists) {
            return res.status(400).json('El usuario no existe');
        }

        const productExists = productsData.some((p) => p.id === newSale.productId);

        if (!productExists) {
            return res.status(400).json('El producto no existe');
        }

        const lastID = salesData.length > 0
            ? salesData[salesData.length - 1].id
            : 0;

        const saleToSave = {
            id: lastID + 1,
            ...newSale
        };

        salesData.push(saleToSave);

        await writeFile('./ventas.json', JSON.stringify(salesData, null, 2), 'utf-8');

        res.status(200).json({
            message: 'Venta creada correctamente',
            sale: saleToSave
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al crear la venta');
    }
});

export default router;

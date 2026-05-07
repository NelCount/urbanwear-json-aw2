import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const fileProducts = await readFile('./productos.json', 'utf-8');
        const productsData = JSON.parse(fileProducts);

        if (productsData.length) {
            res.status(200).json(productsData);
        } else {
            res.status(404).json( 'No se encontraron productos' );
        }
    } catch (error) {
        res.status(500).json( 'Error al obtener los productos' );
    }
});

router.get('/:id', async (req, res) => {

    try {
        const productId = Number(req.params.id);
        const fileProducts = await readFile('./productos.json', 'utf-8');
        const productsData = JSON.parse(fileProducts);
        const product = productsData.find((p) => p.id === productId);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json( 'Producto no encontrado' );
        }
    } catch (error) {
        res.status(500).json( 'Error al buscar el producto' );
    }
});

router.post('/create', async (req, res) => {

    try {
        const newProduct = req.body;

        const fileProducts = await readFile('./productos.json', 'utf-8');
        const productsData = JSON.parse(fileProducts);

        const lastID = productsData.length > 0 
            ? productsData[productsData.length - 1].id 
            : 0;

        const productToSave = {
            id: lastID + 1,
            ...newProduct
        };

        productsData.push(productToSave);

        await writeFile('./productos.json', JSON.stringify(productsData, null, 2), 'utf-8');

        res.status(201).json({
            message: 'Producto creado exitosamente',
            product: productToSave
        });
    } catch (error) {
        res.status(500).json( 'Error al crear el producto' );
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const productId = Number(req.params.id);

        const updatedData = req.body;

        const fileProducts = await readFile('./productos.json', 'utf-8');

        const productsData = JSON.parse(fileProducts);

        const index = productsData.findIndex((p) => p.id === productId);

        if (index !== -1) {
            productsData[index] = {
                ...productsData[index],
                ...updatedData
            };

            await writeFile('./productos.json', JSON.stringify(productsData, null, 2), 'utf-8');

            res.status(200).json({
                message: 'Producto actualizado exitosamente',
                product: productsData[index]
            });
        } else {
            res.status(404).json( 'Producto no encontrado' );
        }
    } catch (error) {
        console.error(error);
        res.status(500).json( 'Error al actualizar el producto' );
    } 
});

export default router;

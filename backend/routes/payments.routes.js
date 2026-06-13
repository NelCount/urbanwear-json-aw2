import { Router } from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const router = Router();

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

router.post('/create-preference', async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json('Debe enviar al menos un producto');
        }

        const items = products.map(product => {
            return {
                title: product.nombre,
                quantity: Number(product.quantity),
                unit_price: Number(product.precio),
                currency_id: 'ARS'
            };
        });

        const preference = new Preference(client);

        const result = await preference.create({
            body: {
                items,
                back_urls: {
                    success: 'http://localhost:3000/carrito.html',
                    failure: 'http://localhost:3000/carrito.html',
                    pending: 'http://localhost:3000/carrito.html'
                },
                
            }
        });

        res.status(201).json({
            preferenceId: result.id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al crear preferencia de pago');
    }
});

export default router;
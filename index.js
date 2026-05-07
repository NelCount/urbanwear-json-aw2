import express from 'express';
import productsRouter from './routes/products.routes.js';
import usersRouter from './routes/users.routes.js';
import salesRouter from './routes/sales.routes.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json('Servidor UrbanWear funcionando!');
});

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sales', salesRouter);

app.listen(port, () => {
    console.log(`Servidor levantado en puerto ${port}`);
});


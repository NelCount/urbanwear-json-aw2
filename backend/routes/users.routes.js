import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';

const router = Router();

router.delete('/delete/:id', async (req, res) => {
    try {
        const userId = Number(req.params.id);

        const fileUsers = await readFile('./backend/data/usuarios.json', 'utf-8');
        const usersData = JSON.parse(fileUsers);

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

        await writeFile('./backend/data/usuarios.json', JSON.stringify(usersData, null, 2), 'utf-8');

        res.status(200).json('Usuario eliminado correctamente');

    } catch (error) {
        console.error(error);
        res.status(500).json('Error al eliminar el usuario');
    }
});

export default router;
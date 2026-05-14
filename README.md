# UrbanWear - Aplicaciones Web 2

Proyecto fullstack desarrollado para la materia **Aplicaciones Web 2**.

UrbanWear es una tienda online de ropa urbana que permite listar productos, filtrarlos por categoría, agregarlos a un carrito y generar una orden de compra desde el frontend hacia el backend.

## Tecnologías utilizadas

- Node.js
- Express.js
- JavaScript
- TailwindCSS
- LocalStorage
- JSON como persistencia de datos

## Funcionalidades principales

- Listado dinámico de productos desde una API REST.
- Filtro de productos por categoría.
- Carrito de compras persistente con LocalStorage.
- Página de carrito con cálculo de total.
- Finalización de compra mediante petición POST al backend.
- Generación de órdenes de compra en `ventas.json`.
- Organización del proyecto separando frontend y backend.

## Estructura del proyecto

```txt
UrbanWear-json/
│
├── backend/
│   ├── data/
│   │   ├── productos.json
│   │   ├── usuarios.json
│   │   └── ventas.json
│   │
│   ├── routes/
│   │   ├── products.routes.js
│   │   ├── users.routes.js
│   │   └── sales.routes.js
│   │
│   └── index.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   │   ├── productos.js
│   │   └── carrito.js
│   │
│   ├── index.html
│   ├── productos.html
│   └── carrito.html
│
├── package.json
├── package-lock.json
└── README.md
```

## Endpoints principales

### Productos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/v1/products/all` | Lista todos los productos |
| GET | `/api/v1/products/:id` | Busca un producto por ID |
| POST | `/api/v1/products/create` | Crea un nuevo producto |
| PUT | `/api/v1/products/update/:id` | Actualiza un producto existente |

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| DELETE | `/api/v1/users/delete/:id` | Elimina un usuario si no tiene ventas asociadas |

### Ventas / Órdenes

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/v1/sales/create` | Crea una orden de compra con múltiples productos |

## Formato de orden de compra

Ejemplo de body enviado al backend:

```json
{
  "userId": 1,
  "products": [
    {
      "productId": 107,
      "quantity": 1
    },
    {
      "productId": 105,
      "quantity": 1
    }
  ]
}
```

## Cómo ejecutar el proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
npm run dev
```

Abrir en el navegador:

```txt
http://localhost:3000
```

## Autor

Nelson Sanchez

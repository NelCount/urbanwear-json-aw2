# UrbanWear - Aplicaciones Web 2

Proyecto fullstack desarrollado para la materia **Aplicaciones Web 2**.

UrbanWear es una tienda online de ropa urbana que permite listar productos, filtrarlos por categoría, agregarlos a un carrito, registrar usuarios, iniciar sesión y generar una orden de compra desde el frontend hacia el backend.

## Tecnologías utilizadas

- Node.js
- Express.js
- JavaScript
- TailwindCSS
- LocalStorage
- bcryptjs
- JSON como persistencia de datos

## Funcionalidades principales

- Listado dinámico de productos desde una API REST.
- Filtro de productos por categoría.
- Carrito de compras persistente con LocalStorage.
- Página de carrito con cálculo de total.
- Registro e inicio de sesión de usuarios.
- Contraseñas protegidas mediante hashing con bcryptjs.
- Visualización del usuario logueado en la barra de navegación.
- Cierre de sesión.
- Validación de usuario antes de finalizar una compra.
- Finalización de compra mediante petición POST al backend.
- Generación de órdenes de compra asociadas al usuario logueado en `ventas.json`.
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
│   │   ├── auth-navbar.js
│   │   ├── carrito.js
│   │   ├── login.js
│   │   ├── productos.js
│   │   └── register.js
│   │
│   ├── index.html
│   ├── carrito.html
│   ├── login.html
│   └── register.html
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
| GET | `/api/v1/users/all` | Lista usuarios sin exponer contraseñas |
| POST | `/api/v1/users/register` | Registra un nuevo usuario |
| POST | `/api/v1/users/login` | Valida credenciales e inicia sesión |
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

## Autenticación de usuarios

El sistema permite registrar usuarios desde la pantalla de Registro.

Al registrarse, la contraseña no se guarda en texto plano, sino que se protege mediante hashing con `bcryptjs`.

Luego, el usuario puede iniciar sesión desde la pantalla de Login. Cuando el inicio de sesión es correcto, la información del usuario se guarda en `localStorage` bajo la clave `usuarioLogueado`.

Esta sesión permite:

- Mostrar el saludo del usuario en la barra de navegación.
- Ocultar las opciones de Login y Registro.
- Mostrar la opción Cerrar sesión.
- Asociar la orden de compra al usuario logueado.
- Evitar finalizar una compra si no hay usuario autenticado.

## Prueba de usuarios

El sistema permite crear usuarios nuevos desde:

```txt
http://localhost:3000/register.html
```

También se puede usar un usuario de prueba, si ya se encuentra cargado en `usuarios.json`:

```txt
Email: j.bezos@email.com
Contraseña: jeff1234
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
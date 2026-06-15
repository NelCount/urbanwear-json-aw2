# UrbanWear 👕🛒

Proyecto Full Stack desarrollado para la materia **Aplicaciones Web 2** de la carrera **Analista de Sistemas y Desarrollo de Software - IES Siglo 21**.

UrbanWear es una tienda online de ropa urbana que permite visualizar productos, filtrarlos por categoría, registrarse e iniciar sesión, administrar un carrito de compras, generar órdenes de compra y realizar pagos mediante la integración de **Mercado Pago Checkout Pro (Sandbox)**.

---

# 🚀 Tecnologías utilizadas

## Frontend
- HTML5
- CSS3
- TailwindCSS
- JavaScript (Vanilla JS)
- LocalStorage

## Backend
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv

## Base de Datos
- MongoDB Atlas
- Mongoose

## Integraciones externas
- Mercado Pago Checkout Pro (Sandbox)

---

# ✨ Funcionalidades principales

### Usuarios
- Registro de usuarios.
- Inicio de sesión mediante autenticación JWT.
- Encriptación de contraseñas con bcryptjs.
- Persistencia de sesión mediante LocalStorage.

### Productos
- Listado dinámico de productos desde MongoDB.
- Filtrado de productos por categoría.
- Visualización de imágenes dinámicas.
- Consulta individual de productos.

### Carrito de compras
- Agregar productos al carrito.
- Persistencia del carrito mediante LocalStorage.
- Modificación de cantidades.
- Eliminación de productos.
- Cálculo automático del total de la compra.

### Ventas
- Generación de órdenes de compra.
- Asociación de compras al usuario autenticado.
- Persistencia de ventas en MongoDB.

### Pagos
- Integración con Mercado Pago Checkout Pro.
- Generación de preferencias de pago desde el backend.
- Apertura del Checkout oficial de Mercado Pago desde el carrito.
- Implementación en entorno Sandbox para pruebas.

---

# 🏗️ Arquitectura del proyecto

```text
Frontend (HTML + JavaScript + TailwindCSS)
                    ↓
        API REST (Node.js + Express.js)
                    ↓
       MongoDB Atlas (Mongoose ODM)
                    ↓
        Mercado Pago Checkout Pro
```

---

# 📁 Estructura del proyecto

```text
UrbanWear-json
│
├── backend
│   ├── config
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── seed
│   └── index.js
│
├── frontend
│   ├── assets
│   │   └── images
│   ├── js
│   ├── index.html
│   ├── carrito.html
│   ├── login.html
│   └── register.html
│
├── .env
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Instalación y ejecución

## Clonar el repositorio

```bash
git clone https://github.com/NelCount/urbanwear-json-aw2
```

## Ingresar al proyecto

```bash
cd UrbanWear-json
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

---

# 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta
MP_PUBLIC_KEY=tu_public_key
MP_ACCESS_TOKEN=tu_access_token
```

---

# 🌐 Endpoints principales

## Usuarios

### Obtener usuarios

```http
GET /api/v1/users/all
```

### Registrar usuario

```http
POST /api/v1/users/register
```

### Iniciar sesión

```http
POST /api/v1/users/login
```

---

## Productos

### Obtener productos

```http
GET /api/v1/products/all
```

### Obtener producto por ID

```http
GET /api/v1/products/:id
```

### Crear producto

```http
POST /api/v1/products/create
```

### Actualizar producto

```http
PUT /api/v1/products/update/:id
```

---

## Ventas

### Obtener ventas

```http
GET /api/v1/sales/all
```

### Crear venta

```http
POST /api/v1/sales/create
```

---

## Pagos

### Crear preferencia de pago

```http
POST /api/v1/payments/create-preference
```

---

# 💳 Integración con Mercado Pago

El proyecto integra **Mercado Pago Checkout Pro (Sandbox)**, permitiendo:

- Generar preferencias de pago desde el backend.
- Renderizar el botón oficial de Mercado Pago en el carrito.
- Abrir el Checkout Pro directamente desde la aplicación.
- Simular pagos en entorno de pruebas mediante credenciales Sandbox.

---

# 📈 Mejoras futuras

- Panel de administración.
- Gestión automática de stock.
- Historial de compras por usuario.
- Confirmación de pagos mediante Webhooks.
- Recuperación de contraseña.
- Deploy en producción.
- Panel de métricas y reportes de ventas.

---

# 👨‍💻 Autor

**Nelson**

Proyecto académico desarrollado para la materia **Aplicaciones Web 2** de la carrera **Analista de Sistemas y Desarrollo de Software** - **IES Siglo 21**.

Desarrollado utilizando tecnologías Full Stack modernas: **Node.js, Express, MongoDB, JWT y Mercado Pago Checkout Pro**.
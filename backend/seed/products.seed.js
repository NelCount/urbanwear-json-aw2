import 'dotenv/config';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const products = [
    // REMERAS
    {
        nombre: "Remera Oversize Essential",
        categoria: "Remeras",
        precio: 22000,
        imagen: "/assets/images/products/remera-oversize-essential.jpg",
        descripcion: "Remera oversize de algodón premium color negro.",
        stock: 20,
        activo: true
    },
    {
        nombre: "Remera Street White",
        categoria: "Remeras",
        precio: 21000,
        imagen: "/assets/images/products/remera-street-white.jpg",
        descripcion: "Remera urbana blanca de corte relajado.",
        stock: 18,
        activo: true
    },
    {
        nombre: "Remera Urban Black",
        categoria: "Remeras",
        precio: 23500,
        imagen: "/assets/images/products/remera-urban-black.jpg",
        descripcion: "Diseño minimalista con estampa frontal.",
        stock: 15,
        activo: true
    },
    {
        nombre: "Remera Graphic City",
        categoria: "Remeras",
        precio: 24500,
        imagen: "/assets/images/products/remera-graphic-city.jpg",
        descripcion: "Remera estampada inspirada en el streetwear.",
        stock: 12,
        activo: true
    },
    {
        nombre: "Remera Basic Sand",
        categoria: "Remeras",
        precio: 20000,
        imagen: "/assets/images/products/remera-basic-sand.jpg",
        descripcion: "Remera básica color arena.",
        stock: 22,
        activo: true
    },

    // BUZOS
    {
        nombre: "Buzo Urban Grey",
        categoria: "Buzos",
        precio: 42000,
        imagen: "/assets/images/products/buzo-urban-grey.jpg",
        descripcion: "Buzo frisado con capucha color gris.",
        stock: 10,
        activo: true
    },
    {
        nombre: "Buzo Essential Black",
        categoria: "Buzos",
        precio: 45000,
        imagen: "/assets/images/products/buzo-essential-black.jpg",
        descripcion: "Buzo negro premium con bolsillo frontal.",
        stock: 14,
        activo: true
    },
    {
        nombre: "Buzo Street Navy",
        categoria: "Buzos",
        precio: 43000,
        imagen: "/assets/images/products/buzo-street-navy.jpg",
        descripcion: "Buzo azul marino estilo urbano.",
        stock: 9,
        activo: true
    },
    {
        nombre: "Buzo Oversize Cream",
        categoria: "Buzos",
        precio: 47000,
        imagen: "/assets/images/products/buzo-oversize-cream.jpg",
        descripcion: "Buzo oversize color crema.",
        stock: 8,
        activo: true
    },
    {
        nombre: "Buzo Signature Wear",
        categoria: "Buzos",
        precio: 49000,
        imagen: "/assets/images/products/buzo-signature-wear.jpg",
        descripcion: "Buzo premium UrbanWear.",
        stock: 11,
        activo: true
    },

    // CAMPERAS
    {
        nombre: "Campera Bomber Olive",
        categoria: "Camperas",
        precio: 78000,
        imagen: "/assets/images/products/campera-bomber-olive.jpg",
        descripcion: "Bomber verde militar liviana.",
        stock: 8,
        activo: true
    },
    {
        nombre: "Campera Denim Black",
        categoria: "Camperas",
        precio: 85000,
        imagen: "/assets/images/products/campera-denim-black.jpg",
        descripcion: "Campera de denim negro premium.",
        stock: 7,
        activo: true
    },
    {
        nombre: "Campera Urban Wind",
        categoria: "Camperas",
        precio: 69000,
        imagen: "/assets/images/products/campera-urban-wind.jpg",
        descripcion: "Rompeviento urbano impermeable.",
        stock: 10,
        activo: true
    },
    {
        nombre: "Campera Street Puffer",
        categoria: "Camperas",
        precio: 92000,
        imagen: "/assets/images/products/campera-street-puffer.jpg",
        descripcion: "Campera inflable estilo streetwear.",
        stock: 5,
        activo: true
    },
    {
        nombre: "Campera Vaquera Fina",
        categoria: "Camperas",
        precio: 85000,
        imagen: "/assets/images/products/campera-vaquera-fina.jpg",
        descripcion: "Denim liviano de alta calidad.",
        stock: 20,
        activo: true
    },

    // PANTALONES
    {
        nombre: "Cargo Beige Premium",
        categoria: "Pantalones",
        precio: 52000,
        imagen: "/assets/images/products/cargo-beige-premium.jpg",
        descripcion: "Cargo de gabardina premium.",
        stock: 12,
        activo: true
    },
    {
        nombre: "Cargo Black Street",
        categoria: "Pantalones",
        precio: 54000,
        imagen: "/assets/images/products/cargo-black-street.jpg",
        descripcion: "Cargo negro estilo urbano.",
        stock: 10,
        activo: true
    },
    {
        nombre: "Jogger Urban Grey",
        categoria: "Pantalones",
        precio: 45000,
        imagen: "/assets/images/products/jogger-urban-grey.jpg",
        descripcion: "Jogger cómodo para uso diario.",
        stock: 15,
        activo: true
    },
    {
        nombre: "Jogger Essential Black",
        categoria: "Pantalones",
        precio: 47000,
        imagen: "/assets/images/products/jogger-essential-black.jpg",
        descripcion: "Jogger negro premium.",
        stock: 14,
        activo: true
    },
    {
        nombre: "Denim Relaxed Fit",
        categoria: "Pantalones",
        precio: 59000,
        imagen: "/assets/images/products/denim-relaxed-fit.jpg",
        descripcion: "Jean relaxed fit moderno.",
        stock: 9,
        activo: true
    },

    // ZAPATILLAS
    {
        nombre: "Urban Runner White",
        categoria: "Zapatillas",
        precio: 89000,
        imagen: "/assets/images/products/urban-runner-white.jpg",
        descripcion: "Zapatillas urbanas blancas.",
        stock: 10,
        activo: true
    },
    {
        nombre: "Street Motion Black",
        categoria: "Zapatillas",
        precio: 95000,
        imagen: "/assets/images/products/street-motion-black.jpg",
        descripcion: "Diseño moderno y deportivo.",
        stock: 8,
        activo: true
    },
    {
        nombre: "Urban Flex Grey",
        categoria: "Zapatillas",
        precio: 87000,
        imagen: "/assets/images/products/urban-flex-grey.jpg",
        descripcion: "Máxima comodidad urbana.",
        stock: 11,
        activo: true
    },
    {
        nombre: "Runner Essential Navy",
        categoria: "Zapatillas",
        precio: 91000,
        imagen: "/assets/images/products/runner-essential-navy.jpg",
        descripcion: "Zapatillas deportivas casuales.",
        stock: 6,
        activo: true
    },
    {
        nombre: "Street High Top",
        categoria: "Zapatillas",
        precio: 98000,
        imagen: "/assets/images/products/street-high-top.jpg",
        descripcion: "Zapatillas caña alta urbanas.",
        stock: 7,
        activo: true
    },

    // ACCESORIOS
    {
        nombre: "Gorra Urban Black",
        categoria: "Accesorios",
        precio: 18000,
        imagen: "/assets/images/products/gorra-urban-black.jpg",
        descripcion: "Gorra negra con logo bordado.",
        stock: 20,
        activo: true
    },
    {
        nombre: "Mochila Street Pack",
        categoria: "Accesorios",
        precio: 45000,
        imagen: "/assets/images/products/mochila-street-pack.jpg",
        descripcion: "Mochila urbana resistente.",
        stock: 8,
        activo: true
    },
    {
        nombre: "Riñonera Essential",
        categoria: "Accesorios",
        precio: 24000,
        imagen: "/assets/images/products/rinonera-essential.jpg",
        descripcion: "Riñonera compacta urbana.",
        stock: 12,
        activo: true
    },
    {
        nombre: "Beanie Urban Grey",
        categoria: "Accesorios",
        precio: 15000,
        imagen: "/assets/images/products/beanie-urban-grey.jpg",
        descripcion: "Gorro tejido color gris.",
        stock: 15,
        activo: true
    },
    {
        nombre: "Cinturon Tactical Black",
        categoria: "Accesorios",
        precio: 19000,
        imagen: "/assets/images/products/cinturon-tactical-black.jpg",
        descripcion: "Cinturón táctico urbano.",
        stock: 10,
        activo: true
    }
];

export default products;

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log('Productos cargados correctamente');
        process.exit();

    } catch (error) {
        console.error('Error al cargar productos:', error);
        process.exit(1);
    }
};

seedProducts();
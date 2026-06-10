import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    imagen: {
        type: String,
        required: false
    },

    descripcion: {
        type: String,
        required: false
    },

    stock: {
        type: Number,
        default: 0
    },

    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
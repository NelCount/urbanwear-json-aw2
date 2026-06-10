import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            category: String,
            quantity: {
                type: Number,
                default: 1
            },
            price: Number,
            subtotal: Number
        }
    ],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: 'created'
    }
}, {
    timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);

export default Sale;
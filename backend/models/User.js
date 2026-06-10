import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    contraseña: {
        type: String,
        required: true
    },

    activo: {
        type: Boolean,
        default: true
    },

    admin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'deliveryagent'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


export const userModel = mongoose.model('users', userSchema);


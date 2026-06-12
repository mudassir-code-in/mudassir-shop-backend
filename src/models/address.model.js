import mongoose from 'mongoose';



const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    fullname: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
});


export const addressModel = mongoose.model('addresses', addressSchema);
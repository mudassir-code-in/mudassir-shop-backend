import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true
    },

    products: [
        {
            productid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products", 
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number, 
                required: true
            }
        }
    ],

   
    addressid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
        required: true
    },

    
    orderid: {
        type: String,
        required: true,
        unique: true
    },

    isDelivered: {
        type: Boolean,
        default: false
    }, 
    
    expecteddelivery: {
        type: Date,
        required: true
    }
}, { 
    timestamps: true 
});

export const orderModel = mongoose.model("orders", orderSchema);
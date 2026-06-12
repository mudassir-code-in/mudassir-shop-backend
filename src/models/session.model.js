import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'user id is required']
    },
    refreshTokenHash: {
        type: String,
        required: [true, 'refreshTokenHash is required']
    },
    ip: {
        type: String,
        required: [true, 'ip address is required']
    },
    userAgent: {
        type: String,
        required: [true, 'user agent is required']
    },
    revoked: {
        type: Boolean,
        default: false
    }
},{timestamps: true},);


sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });


export const sessionModel = mongoose.model('sessions', sessionSchema);

import express from 'express';
import { register, verifyEmail, login, logout, refreshToken } from '../controllers/auth.controller.js';



export const authRouter = express.Router();


authRouter.post('/register', register);

authRouter.post('/verify-email', verifyEmail);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.post('/refresh-token', refreshToken);




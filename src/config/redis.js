import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

// 1. Redis client banayein
export const redisClient = createClient({
    url: process.env.REDIS_URI
});


export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis connected successfully');
    } catch (error) {
        console.error('Redis connection error:', error);
    }
};



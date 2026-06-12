import ImageKit from '@imagekit/nodejs';
import crypto from 'crypto';


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export async function uploadToImageKit(buffer) {


    const uniqueFileName = `${crypto.randomUUID()}.jpeg`;


    const result = await imagekit.files.upload({
        file: buffer.toString('base64'),       
        fileName: uniqueFileName
    });

    return result; 
}
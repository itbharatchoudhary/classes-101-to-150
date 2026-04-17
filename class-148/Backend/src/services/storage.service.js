import ImageKit from '@imagekit/nodejs';
import { config } from '../config/config.js';

const client = new ImageKit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

export const uploadFile = async (buffer, fileName, folder = "snitch") => {
    const result = await client.files.upload({
        file: buffer.toString("base64"),
        fileName,
        folder
    });
    return result;
}
import { cloudinaryUploadImage } from '@/utils/config/cloudinaryConfig';
import fs from 'fs';

export default async (files: Express.Multer.File[]) => {
    const imageLinks = [];

    for (const file of files) {
        const image: any = await cloudinaryUploadImage(file.path);
        imageLinks.push(image.url);
        fs.unlinkSync(file.path);
    }

    return imageLinks;
};

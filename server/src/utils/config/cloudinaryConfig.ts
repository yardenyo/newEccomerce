import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUploadImage = async (fileToUpload: any) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(fileToUpload, (error: any, result: any) => {
            if (error) reject(error);
            resolve({
                url: result.url,
                resource_type: 'auto',
            });
        });
    });
};

export { cloudinaryUploadImage };

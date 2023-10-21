import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

const imageUploadPath = path.join(__dirname, '../public/images');

if (!fs.existsSync(imageUploadPath)) {
    try {
        fs.mkdirSync(imageUploadPath, { recursive: true });
    } catch (error) {
        console.error('Error creating image upload directory:', error);
    }
}

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageUploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.jpeg`);
    },
});

const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        const errorMessage: any = new Error(
            'Not an image! Please upload only images.',
        );
        errorMessage.statusCode = 400;
        cb(errorMessage, false);
    }
};

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 2000000 },
});

const imageResizeMiddleware =
    (outputPath: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.files) return next();

        try {
            await Promise.all(
                (req.files as Express.Multer.File[]).map(
                    async (file: Express.Multer.File) => {
                        const subdirectoryPath = path.join(
                            imageUploadPath,
                            outputPath,
                        );
                        const destinationPath = path.join(
                            subdirectoryPath,
                            file.filename,
                        );

                        if (!fs.existsSync(subdirectoryPath)) {
                            try {
                                fs.mkdirSync(subdirectoryPath, {
                                    recursive: true,
                                });
                            } catch (error) {
                                console.error(
                                    'Error creating subdirectory:',
                                    error,
                                );
                            }
                        }

                        await sharp(file.path)
                            .resize(300, 300)
                            .toFormat('jpeg')
                            .jpeg({ quality: 90 })
                            .toFile(destinationPath);

                        fs.unlinkSync(file.path);
                    },
                ),
            );

            (req.files as Express.Multer.File[]).forEach((file) => {
                file.path = path.join(
                    imageUploadPath,
                    outputPath,
                    file.filename,
                );
            });

            next();
        } catch (error) {
            next(error);
        }
    };

const productImageResize = imageResizeMiddleware('products');
const blogImageResize = imageResizeMiddleware('blogs');

export { uploadPhoto, productImageResize, blogImageResize };

import BrandModel from '@/resources/brand/brand.model';
import CategoryModel from '@/resources/category/category.model';
import Product from '@/resources/product/product.interface';
import productModel from '@/resources/product/product.model';
import User from '@/resources/user/user.interface';
import userModel from '@/resources/user/user.model';
import cloudinaryUploader from '@/utils/helpers/cloudinaryUploader.helper';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import PostBody from '@/utils/interfaces/postbody.interface';
import slugify from 'slugify';

class ProductService {
    private product = productModel;

    public async createProduct(body: Product): Promise<Product> {
        const { brand, category } = body;
        try {
            const brandExists = await BrandModel.findById(brand);
            if (!brandExists) throw new Error();

            const categoryExists = await CategoryModel.findById(category);
            if (!categoryExists) throw new Error();

            const product = await this.product.create({
                ...body,
                slug: slugify(body.title, { lower: true }),
            });
            return product;
        } catch (error) {
            throw new Error('Error creating product');
        }
    }

    public async getAllProducts(body: PostBody): Promise<Product[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const products = await this.product
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return products;
        } catch (error) {
            throw new Error('Error retrieving products');
        }
    }

    public async getProductById(id: string): Promise<Product> {
        try {
            const product = await this.product.findById(id);
            if (!product) throw new Error();
            return product;
        } catch (error) {
            throw new Error('Error retrieving product');
        }
    }

    public async updateProduct(id: string, body: Product): Promise<Product> {
        try {
            const newProduct = await this.product.findByIdAndUpdate(id, body, {
                new: true,
            });
            if (!newProduct) throw new Error();
            return newProduct;
        } catch (error) {
            throw new Error('Error updating product');
        }
    }

    public async deleteProductById(id: string): Promise<void> {
        try {
            const deletedItem = await this.product.findByIdAndDelete(id);
            if (!deletedItem) throw new Error();
        } catch (error) {
            throw new Error('Error deleting product');
        }
    }

    public async deleteAllProducts(): Promise<void> {
        try {
            await this.product.deleteMany();
        } catch (error) {
            throw new Error('Error deleting products');
        }
    }

    public async addProductToWishlist(body: any): Promise<User> {
        try {
            const product = await this.product.findById(body.productId);
            if (!product) throw new Error();

            const user = await userModel.findByIdAndUpdate(
                body.user._id,
                {
                    $addToSet: { wishlist: product._id },
                },
                { new: true },
            );

            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error adding product to wishlist');
        }
    }

    public async removeProductFromWishlist(body: any): Promise<User> {
        try {
            const product = await this.product.findById(body.productId);
            if (!product) throw new Error();

            const user = await userModel.findByIdAndUpdate(
                body.user._id,
                {
                    $pull: { wishlist: product._id },
                },
                { new: true },
            );

            if (!user) throw new Error();
            return user;
        } catch (error) {
            throw new Error('Error removing product from wishlist');
        }
    }

    public async removeAllProductsFromWishlist(id: string): Promise<void> {
        try {
            await this.product.updateMany(
                {},
                {
                    $pull: { wishlist: id },
                },
            );
        } catch (error) {
            throw new Error('Error emptying wishlist');
        }
    }

    public async getUserWishlist(body: any): Promise<Product[]> {
        try {
            const user = await userModel.findById(body.user._id);
            if (!user) throw new Error();

            const products = await this.product.find({
                _id: { $in: user.wishlist },
            });

            return products;
        } catch (error) {
            throw new Error('Error retrieving user wishlist');
        }
    }

    public async addProductRating(body: any): Promise<Product> {
        try {
            const user = await userModel.findById(body.user._id);
            if (!user) throw new Error();

            const productExists = await this.product.findOne({
                _id: body.productId,
                'ratings.postedBy': body.user._id,
            });
            if (productExists) throw new Error();

            const product = await this.product.findByIdAndUpdate(
                body.productId,
                {
                    $addToSet: {
                        ratings: {
                            postedBy: body.user._id,
                            comment: body.comment,
                            star: body.star,
                        },
                    },
                },
                { new: true },
            );

            if (!product) throw new Error();
            return product;
        } catch (error) {
            throw new Error('Error adding product rating');
        }
    }

    public async uploadProductImages(
        productId: string,
        files: Express.Multer.File[],
    ): Promise<Product> {
        try {
            const product = await this.product.findById(productId);
            if (!product) throw new Error();

            const imageLinks = await cloudinaryUploader(files);

            product.images = product.images.concat(imageLinks);
            await product.save();

            return product;
        } catch (error) {
            throw new Error('Error uploading product images');
        }
    }
}

export default ProductService;

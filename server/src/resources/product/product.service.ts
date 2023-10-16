import productModel from '@/resources/product/product.model';
import Product from '@/resources/product/product.interface';
import slugify from 'slugify';

class ProductService {
    private product = productModel;

    public async createProduct(body: Product): Promise<Product> {
        try {
            const product = await this.product.create({
                ...body,
                slug: slugify(body.title, { lower: true }),
            });
            return product;
        } catch (error) {
            throw new Error('Error creating product');
        }
    }

    public async getAllProducts(): Promise<Product[]> {
        try {
            const products = await this.product.find();
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
            await this.product.findByIdAndDelete(id);
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

    public async searchProducts(query: any): Promise<Product[]> {
        try {
            const products = await this.product.find(query);
            return products;
        } catch (error) {
            throw new Error('Error searching products');
        }
    }
}

export default ProductService;

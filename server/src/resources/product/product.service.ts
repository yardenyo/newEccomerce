import productModel from '@/resources/product/product.model';
import Product from '@/resources/product/product.interface';

class ProductService {
    private product = productModel;

    public async create(
        title: string,
        slug: string,
        description: string,
        price: number,
        category: string,
        brand: string,
        quantity: number,
        sold: number,
        images: string[],
        color: string,
        ratings: { star: number; postedBy: string }[],
    ): Promise<Product> {
        try {
            const product = await this.product.create({
                title,
                slug,
                description,
                price,
                category,
                brand,
                quantity,
                sold,
                images,
                color,
                ratings,
            });
            return product;
        } catch (error) {
            throw new Error('Error creating product');
        }
    }
}

export default ProductService;

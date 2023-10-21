import Cart from '@/resources/cart/cart.interface';
import CartModel from '@/resources/cart/cart.model';
import ProductModel from '@/resources/product/product.model';
import UserModel from '@/resources/user/user.model';

class CartService {
    private cart = CartModel;
    private user = UserModel;
    private product = ProductModel;

    public async addProductToCart(
        userId: string,
        products: Array<{ productId: string; quantity: number; color: string }>,
    ): Promise<Cart> {
        try {
            let existingCart = await this.cart.findOne({ orderedBy: userId });

            if (!existingCart) {
                existingCart = new this.cart({
                    orderedBy: userId,
                    products: [],
                    cartTotal: 0,
                    totalAfterDiscount: 0,
                });
                await existingCart.save();

                const user = await this.user.findById(userId);
                if (!user) throw new Error();

                user.cart = existingCart._id;
                await user.save();
            }

            for (const { productId, quantity, color } of products) {
                const productInStock = await this.product.findOne({
                    _id: productId,
                    color: color,
                });

                if (!productInStock) {
                    throw new Error();
                }

                if (productInStock.quantity < quantity) {
                    throw new Error();
                }

                const cartProduct = existingCart.products.find(
                    (cartItem: any) =>
                        cartItem.productId.equals(productId) &&
                        cartItem.color === color,
                );

                if (cartProduct) {
                    if (
                        cartProduct.quantity + quantity >
                        productInStock.quantity
                    ) {
                        throw new Error();
                    }
                    cartProduct.quantity += quantity;
                } else {
                    const cartProductToAdd = {
                        productId: productInStock._id,
                        quantity,
                        color,
                        price: productInStock.price,
                    };

                    existingCart.products.push(cartProductToAdd as any);
                }

                existingCart.cartTotal += productInStock.price * quantity;
                existingCart.totalAfterDiscount +=
                    productInStock.price * quantity;
            }

            await existingCart.save();

            return existingCart;
        } catch (error: any) {
            throw new Error('Error adding product to cart');
        }
    }

    public async removeProductFromCart(
        userId: string,
        products: Array<{ productId: string; quantity: number; color: string }>,
    ): Promise<Cart> {
        try {
            const existingCart = await this.cart.findOne({ orderedBy: userId });

            if (!existingCart) {
                throw new Error();
            }

            for (const { productId, quantity, color } of products) {
                const productInStock = await this.product.findOne({
                    _id: productId,
                    color: color,
                });

                if (!productInStock) {
                    throw new Error();
                }

                const cartProduct = existingCart.products.find(
                    (cartItem: any) =>
                        cartItem.productId.equals(productId) &&
                        cartItem.color === color,
                );

                if (!cartProduct) {
                    throw new Error();
                }

                if (cartProduct.quantity < quantity) {
                    throw new Error();
                }

                if (cartProduct.quantity === quantity) {
                    existingCart.products = existingCart.products.filter(
                        (cartItem: any) =>
                            !cartItem.productId.equals(productId) ||
                            cartItem.color !== color,
                    );
                } else {
                    cartProduct.quantity -= quantity;
                }

                existingCart.cartTotal -= productInStock.price * quantity;
                existingCart.totalAfterDiscount -=
                    productInStock.price * quantity;
            }

            await existingCart.save();

            return existingCart;
        } catch (error: any) {
            throw new Error('Error removing product from cart');
        }
    }

    public async getUserCart(userId: string): Promise<Cart> {
        try {
            const cart = await this.cart
                .findOne({ orderedBy: userId })
                .populate(
                    'products.productId',
                    '_id title description price category brand quantity sold images color ratings',
                )
                .exec();

            if (!cart) {
                throw new Error();
            }

            return cart;
        } catch (error: any) {
            throw new Error('Error getting user cart');
        }
    }
}

export default CartService;

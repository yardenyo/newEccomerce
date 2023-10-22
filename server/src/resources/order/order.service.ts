import Order from '@/resources/order/order.interface';
import OrderModel from '@/resources/order/order.model';
import cartModel from '@/resources/cart/cart.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';
import createSession from '@/utils/config/stripeConfig';
import Product from '@/resources/product/product.interface';
import User from '@/resources/user/user.interface';

class OrderService {
    private order = OrderModel;
    private cart = cartModel;

    public async createOrder(user: User) {
        try {
            const cart = await this.cart.findOne({ orderedBy: user._id });
            if (!cart) throw new Error();

            const session = await createSession(cart.products, user);
            return session;
        } catch (error) {
            throw new Error('Error creating order');
        }
    }
}

export default OrderService;

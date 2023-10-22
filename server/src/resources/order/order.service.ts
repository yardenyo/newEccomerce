import cartModel from '@/resources/cart/cart.model';
import OrderModel from '@/resources/order/order.model';
import User from '@/resources/user/user.interface';
import createSession from '@/utils/config/stripeConfig';

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

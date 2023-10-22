import Stripe from 'stripe';
import Product from '@/resources/product/product.interface';
import User from '@/resources/user/user.interface';

const createSession = async (products: Product[], user: User) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2023-10-16',
    });

    const lineItems = await Promise.all(
        products.map(async (product) => {
            const unitAmount = Math.round(product.price * 100);
            return {
                price_data: {
                    currency: 'usd',
                    unit_amount: unitAmount / product.quantity,
                    product_data: {
                        name: product.name,
                        ...(product.images && {
                            images: [product.images[0]],
                        }),
                    },
                },
                quantity: product.quantity,
            };
        }),
    );

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
        customer_email: user.email,
        client_reference_id: user._id.toString(),
        allow_promotion_codes: true,
    });

    return session;
};

export default createSession;

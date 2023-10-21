
import Order from '@/resources/order/order.interface';
import OrderModel from '@/resources/order/order.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class OrderService {
    private order = OrderModel;
}

export default OrderService;

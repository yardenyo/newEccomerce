import { selectCart } from "@/features/cart/cartSlice";
import { Sidebar } from "primereact/sidebar";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "primereact/divider";
import { useRemoveProductFromCartMutation } from "@/features/cart/cartApiSlice";
import useToast from "@/hooks/useToast";
import Helpers from "@/helpers/app.helpers";
import { ErrorResponse } from "@/types";
import { setCart } from "@/features/cart/cartSlice";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const CartSidebar = ({ visible, setVisible }: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const cart = useSelector(selectCart);
  const [removeFromCart, { isLoading }] = useRemoveProductFromCartMutation();

  const customHeader = (
    <Fragment>
      <h2 style={{ marginBottom: 0 }}>Cart</h2>
    </Fragment>
  );

  const firstLetterUppercase = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleRemoveFromCart = async (
    productId: string,
    color: string,
    quantity: number
  ) => {
    try {
      const response = await removeFromCart({
        products: [{ productId, color, quantity }],
      }).unwrap();
      const { data, message } = Helpers.handleAxiosSuccess(response);
      dispatch(setCart(data));
      toast.toastSuccess(message);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  return (
    <Sidebar
      visible={visible}
      onHide={() => setVisible(false)}
      header={customHeader}
      position="right"
    >
      <div className="w-full flex flex-col">
        {isLoading && (
          <div className="loader-overlay absolute z-40 left-0 top-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-20">
            <div className="loader">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          </div>
        )}
        <div className="wrapper w-full h-[85vh] flex flex-col justify-between">
          <ul className="flex flex-col space-y-2 mt-4">
            {cart && cart.products.length > 0 ? (
              cart.products.map((item) => (
                <li key={item.productId}>
                  <div className="flex items-center space-x-4 w-full text-sm">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                    <div className="flex flex-col w-full space-y-1">
                      <div className="name-price-wrapper flex flex-row justify-between w-full font-semibold">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </div>
                      <div className="color-remove-wrapper flex flex-row justify-between w-full">
                        <span>Color: {firstLetterUppercase(item.color)}</span>
                        <i
                          className="pi pi-trash cursor-pointer"
                          onClick={() =>
                            handleRemoveFromCart(
                              item.productId,
                              item.color,
                              item.quantity
                            )
                          }
                        ></i>
                      </div>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <Divider />
                </li>
              ))
            ) : (
              <div className="text-2xl font-semibold text-center">
                No products in cart
              </div>
            )}
          </ul>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span>${cart && cart.cartTotal}</span>
            </div>
            <button className="btn btn-primary">Checkout</button>
            <button className="btn btn-secondary">View Cart</button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default CartSidebar;

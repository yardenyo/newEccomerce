import { useDispatch, useSelector } from "react-redux";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/features/products/productsApiSlice";
import { useAddProductToCartMutation } from "@/features/cart/cartApiSlice";
import { ErrorResponse, Product } from "@/types";
import useToast from "@/hooks/useToast";
import Helpers from "@/helpers/app.helpers";
import { Colors } from "@/enums";
import { setCart } from "@/features/cart/cartSlice";
import { selectWishlist, setWishlist } from "@/features/wishlist/wishlistSlice";
import ProductList from "@/components/Products/ProductList";

type ProductContentProps = {
  title?: string;
  tag?: string;
  products: Product[];
};

const ProductContent = ({ title, tag, products }: ProductContentProps) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const toast = useToast();
  const [addToCart, { isLoading: addToCartLoading }] =
    useAddProductToCartMutation();
  const [addToWishlist, { isLoading: addToWishlistLoading }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removeFromWishlistLoading }] =
    useRemoveFromWishlistMutation();
  const isStateLoading =
    addToCartLoading || addToWishlistLoading || removeFromWishlistLoading;

  const handleAddToCart = async (productId: string, color: Colors) => {
    try {
      const response = await addToCart({
        products: [{ productId, color, quantity: 1 }],
      }).unwrap();
      const { data, message } = Helpers.handleAxiosSuccess(response);
      dispatch(setCart(data));
      toast.toastSuccess(message);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addToWishlist({ productId }).unwrap();
      const { data, message } = Helpers.handleAxiosSuccess(response);
      dispatch(setWishlist(data));
      toast.toastSuccess(message);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await removeFromWishlist({ productId }).unwrap();
      const { data, message } = Helpers.handleAxiosSuccess(response);
      dispatch(setWishlist(data));
      toast.toastSuccess(message);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  return (
    <div className="container mx-auto py-4 flex flex-col space-y-4 px-8 xl:px-0">
      <div className="title flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <ProductList
        products={products}
        wishlist={wishlist}
        tag={tag || ""}
        isStateLoading={isStateLoading}
        handleAddToCart={handleAddToCart}
        handleAddToWishlist={handleAddToWishlist}
        handleRemoveFromWishlist={handleRemoveFromWishlist}
      />
    </div>
  );
};

export default ProductContent;

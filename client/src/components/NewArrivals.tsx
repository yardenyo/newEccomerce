import {
  useGetAllProductsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "@/features/products/productsApiSlice";
import { useAddProductToCartMutation } from "@/features/cart/cartApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import NoImage from "@/assets/images/noimage.png";
import { ErrorResponse, Product } from "@/types";
import useToast from "@/hooks/useToast";
import Helpers from "@/helpers/app.helpers";
import { useState, useEffect } from "react";
import { Colors } from "@/enums";

const NewArrivals = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: 5,
  };
  const user = useSelector(selectCurrentUser);
  const { data: response } = useGetAllProductsQuery(payload);
  const toast = useToast();
  const [addToCart, { isLoading: addToCartLoading }] =
    useAddProductToCartMutation();
  const [addToWishlist, { isLoading: addToWishlistLoading }] =
    useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: removeFromWishlistLoading }] =
    useRemoveFromWishlistMutation();
  const [wishlistProducts, setWishlistProducts] = useState<string[]>([]);
  const products = response?.data || [];
  const isStateLoading =
    addToCartLoading || addToWishlistLoading || removeFromWishlistLoading;

  useEffect(() => {
    if (user) {
      setWishlistProducts(user.wishlist);
    }
  }, [user]);

  const handleAddToCart = async (productId: string, color: Colors) => {
    try {
      const response = await addToCart({
        products: [{ productId, color, quantity: 1 }],
      }).unwrap();
      const { message } = Helpers.handleAxiosSuccess(response);
      toast.toastSuccess(message);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      const response = await addToWishlist({ productId }).unwrap();
      const { message } = Helpers.handleAxiosSuccess(response);
      toast.toastSuccess(message);
      setWishlistProducts([...wishlistProducts, productId]);
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await removeFromWishlist({ productId }).unwrap();
      const { message } = Helpers.handleAxiosSuccess(response);
      toast.toastSuccess(message);
      setWishlistProducts(wishlistProducts.filter((id) => id !== productId));
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    }
  };

  const numberOfStars = (totalRating: number) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < totalRating) {
        stars.push(
          <span key={i}>
            <i className="pi pi-star-fill"></i>
          </span>
        );
      } else {
        stars.push(
          <span key={i}>
            <i className="pi pi-star"></i>
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="container mx-auto py-4 flex flex-col space-y-4 px-8 xl:px-0">
      <div className="title flex justify-between items-center">
        <h1 className="text-2xl font-bold">Newest Arrivals</h1>
        <div className="link">Explore More</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.map((product: Product, index: number) => (
          <div key={product._id + index} className="bg-white group relative">
            <img
              src={product.images[0] || NoImage}
              alt={product.slug}
              className="object-contain w-full"
            />
            <div className="py-4">
              <h2 className="text-xl font-bold mb-2 flex items-center space-x-1">
                {numberOfStars(4)}
              </h2>
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-700 font-semibold text-base">
                {product.description}
              </p>
              <p className="text-gray-700 font-semibold text-base">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="absolute top-2 left-2 tag tag-primary">New</div>

            <button
              className="absolute top-2 right-2 tag-circle tag-primary opacity-0 group-hover:opacity-100"
              disabled={isStateLoading}
              onClick={() =>
                wishlistProducts.includes(product._id)
                  ? handleRemoveFromWishlist(product._id)
                  : handleAddToWishlist(product._id)
              }
            >
              <i
                className={`pi ${
                  wishlistProducts.includes(product._id)
                    ? "pi-heart-fill"
                    : "pi-heart"
                }`}
              ></i>
            </button>

            <button
              className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-3/4 btn btn-primary opacity-0 group-hover:opacity-100"
              disabled={isStateLoading}
              onClick={() =>
                handleAddToCart(product._id, product.color as Colors)
              }
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;

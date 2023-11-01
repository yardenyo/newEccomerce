import {
  useGetAllProductsQuery,
  useAddToCartMutation,
  useAddToWishlistMutation,
} from "@/features/products/productsApiSlice";
import NoImage from "@/assets/images/noimage.png";
import { ErrorResponse, Product } from "@/types";
import useToast from "@/hooks/useToast";
import { useState } from "react";

const NewArrivals = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: 4,
  };
  const { data: response } = useGetAllProductsQuery(payload);
  const toast = useToast();
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [isLoading, setIsLoading] = useState(false);
  const products = response?.data || [];

  const handleAddToCart = async (productId: string) => {
    try {
      setIsLoading(true);
      await addToCart(productId).unwrap();
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      setIsLoading(true);
      await addToWishlist(productId).unwrap();
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      toast.toastError(error.data.message);
    } finally {
      setIsLoading(false);
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
    <div className="container mx-auto py-4">
      <div className="title flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Newest Arrivals</h1>
        <div className="link">Explore More</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

            <div
              className="absolute top-2 right-2 tag-circle tag-primary opacity-0 group-hover:opacity-100"
              onClick={() => handleAddToWishlist(product._id)}
            >
              <i className="pi pi-heart"></i>
            </div>

            <button
              className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-3/4 btn btn-primary opacity-0 group-hover:opacity-100"
              onClick={() => handleAddToCart(product._id)}
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

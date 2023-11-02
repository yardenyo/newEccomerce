import React from "react";
import { Colors } from "@/enums";
import { Product } from "@/types";
import NoImage from "@/assets/images/noimage.png";

interface ProductProps {
  product: Product;
  wishlist: string[];
  isStateLoading: boolean;
  handleAddToCart: (productId: string, color: Colors) => void;
  handleAddToWishlist: (productId: string) => void;
  handleRemoveFromWishlist: (productId: string) => void;
  numberOfStars: (totalRating: number) => JSX.Element[];
}

const Product: React.FC<ProductProps> = ({
  product,
  wishlist,
  isStateLoading,
  handleAddToCart,
  handleAddToWishlist,
  handleRemoveFromWishlist,
  numberOfStars,
}) => {
  return (
    <div className="bg-white group relative">
      <div style={{ position: "relative" }}>
        <img
          src={product.images[0] || NoImage}
          alt={product.slug}
          className="object-contain w-full"
        />
        <div className="absolute top-2 left-2 tag tag-primary">New</div>

        <button
          className="absolute top-2 right-2 tag-circle tag-primary opacity-0 group-hover:opacity-100"
          disabled={isStateLoading}
          onClick={() =>
            wishlist.includes(product._id)
              ? handleRemoveFromWishlist(product._id)
              : handleAddToWishlist(product._id)
          }
        >
          <i
            className={`pi ${
              wishlist.includes(product._id) ? "pi-heart-fill" : "pi-heart"
            }`}
          ></i>
        </button>

        <button
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 btn btn-primary opacity-0 group-hover:opacity-100"
          disabled={isStateLoading}
          onClick={() => handleAddToCart(product._id, product.color as Colors)}
        >
          Add to Cart
        </button>
      </div>

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
    </div>
  );
};

export default Product;

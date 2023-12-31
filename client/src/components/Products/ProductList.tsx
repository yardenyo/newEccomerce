import React from "react";
import { Colors } from "@/enums";
import { Product as ProductType } from "@/types";
import Product from "@/components/Products/Product";

interface ProductListProps {
  products: Product[];
  wishlist: string[];
  tag: string;
  isStateLoading: boolean;
  handleAddToCart: (productId: string, color: Colors) => void;
  handleAddToWishlist: (productId: string) => void;
  handleRemoveFromWishlist: (productId: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  wishlist,
  tag,
  isStateLoading,
  handleAddToCart,
  handleAddToWishlist,
  handleRemoveFromWishlist,
}) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-8">
      {products.map((product: ProductType, index: number) => (
        <div key={product._id} className="flex justify-center">
          <Product
            key={product._id + index}
            product={product}
            wishlist={wishlist}
            tag={tag}
            isStateLoading={isStateLoading}
            handleAddToCart={handleAddToCart}
            handleAddToWishlist={handleAddToWishlist}
            handleRemoveFromWishlist={handleRemoveFromWishlist}
            numberOfStars={numberOfStars}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;

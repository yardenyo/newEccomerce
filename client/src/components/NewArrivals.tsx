import { useGetAllProductsQuery } from "@/features/products/productsApiSlice";
import { Product } from "@/types";

const NewArrivals = () => {
  const { data: response } = useGetAllProductsQuery({});
  const products = response?.data || [];

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
      <h1 className="text-2xl font-bold mb-4">New Arrivals</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product, index: number) => (
          <div key={product._id + index} className="bg-white group relative">
            <img
              src={product.images[0]}
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

            <div className="absolute top-2 right-2 tag-circle tag-primary opacity-0 group-hover:opacity-100">
              <i className="pi pi-heart"></i>
            </div>

            <button className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 w-3/4 btn btn-primary opacity-0 group-hover:opacity-100">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;

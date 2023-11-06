import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApiSlice";
import NoImage from "@/assets/images/noimage.png";
import { Category } from "@/types";

const Categories = () => {
  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
  };
  const { data: response } = useGetAllCategoriesQuery(payload);
  const categories = response?.data || [];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="container mx-auto flex flex-col space-y-4 px-8 md:px-0">
      <div className="title">
        <h1 className="text-2xl font-bold">Shop Collection</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category: Category) => (
          <div
            key={category._id}
            className="relative bg-[#f3f5f7] rounded-lg shadow-lg hover:transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <div className="flex flex-col justify-center items-center h-96">
              <img
                src={category.image || NoImage}
                alt={category.name}
                className="object-contain w-3/4"
              />
            </div>
            <div className="text-wrapper absolute bottom-4 left-4 flex flex-col">
              <div className="text-2xl font-bold">
                {capitalizeFirstLetter(category.name)}
              </div>
              <div className="link">
                Collection{" "}
                <i className="pi pi-arrow-right text-xs underline"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

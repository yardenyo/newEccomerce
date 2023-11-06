import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApiSlice";
import NoImage from "@/assets/images/noimage.png";
import { ErrorResponse } from "@/types";

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
    <div className="container mx-auto flex flex-col space-y-4">
      <div className="title">
        <h1 className="text-2xl font-bold">Shop Collection</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category) => (
          <div key={category._id} className="relative bg-[#f3f5f7]">
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
                Collection <i className="pi pi-arrow-right"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

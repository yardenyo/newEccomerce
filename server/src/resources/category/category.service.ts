import Category from '@/resources/category/category.interface';
import CategoryModel from '@/resources/category/category.model';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import PostBody from '@/utils/interfaces/postbody.interface';

class CategoryService {
    private category = CategoryModel;

    public async createCategory(categoryData: Category): Promise<Category> {
        try {
            const createdCategory = this.category.create(categoryData);
            return createdCategory;
        } catch (error) {
            throw new Error('Error creating category');
        }
    }

    public async getAllCategories(body: PostBody): Promise<Category[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const categories = await this.category
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return categories;
        } catch (error) {
            throw new Error('Error retrieving categories');
        }
    }

    public async getCategoryById(id: string): Promise<Category> {
        try {
            const category = await this.category.findById(id);
            if (!category) throw new Error();

            return category;
        } catch (error) {
            throw new Error('Error retrieving category');
        }
    }

    public async updateCategory(
        id: string,
        categoryData: Category,
    ): Promise<Category> {
        try {
            const category = await this.category.findByIdAndUpdate(
                id,
                categoryData,
                { new: true },
            );
            if (!category) throw new Error();

            return category;
        } catch (error) {
            throw new Error('Error updating category');
        }
    }

    public async deleteCategory(id: string): Promise<Category> {
        try {
            const category = await this.category.findByIdAndDelete(id);
            if (!category) throw new Error();

            return category;
        } catch (error) {
            throw new Error('Error deleting category');
        }
    }

    public async deleteAllCategories(): Promise<void> {
        try {
            await this.category.deleteMany({});
        } catch (error) {
            throw new Error('Error deleting categories');
        }
    }
}

export default CategoryService;

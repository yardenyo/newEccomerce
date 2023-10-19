import BlogCategory from '@/resources/blogCategory/blogCategory.interface';
import BlogCategoryModel from '@/resources/blogCategory/blogCategory.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';

class BlogCategoryService {
    private blogCategory = BlogCategoryModel;

    public async createBlogCategory(
        blogCategoryData: BlogCategory,
    ): Promise<BlogCategory> {
        try {
            const createdBlogCategory =
                this.blogCategory.create(blogCategoryData);
            return createdBlogCategory;
        } catch (error) {
            throw new Error('Error creating blogCategory');
        }
    }

    public async getAllBlogCategories(body: PostBody): Promise<BlogCategory[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const blogCategories = await this.blogCategory
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return blogCategories;
        } catch (error) {
            throw new Error('Error retrieving blogCategories');
        }
    }

    public async getBlogCategoryById(id: string): Promise<BlogCategory> {
        try {
            const blogCategory = await this.blogCategory.findById(id);
            if (!blogCategory) throw new Error();

            return blogCategory;
        } catch (error) {
            throw new Error('Error retrieving blogCategory');
        }
    }

    public async updateBlogCategory(
        id: string,
        blogCategoryData: BlogCategory,
    ): Promise<BlogCategory> {
        try {
            const blogCategory = await this.blogCategory.findByIdAndUpdate(
                id,
                blogCategoryData,
                { new: true },
            );
            if (!blogCategory) throw new Error();

            return blogCategory;
        } catch (error) {
            throw new Error('Error updating blogCategory');
        }
    }

    public async deleteBlogCategory(id: string): Promise<BlogCategory> {
        try {
            const blogCategory = await this.blogCategory.findByIdAndDelete(id);
            if (!blogCategory) throw new Error();

            return blogCategory;
        } catch (error) {
            throw new Error('Error deleting blogCategory');
        }
    }

    public async deleteAllBlogCategories(): Promise<void> {
        try {
            await this.blogCategory.deleteMany({});
        } catch (error) {
            throw new Error('Error deleting blogCategory');
        }
    }
}

export default BlogCategoryService;

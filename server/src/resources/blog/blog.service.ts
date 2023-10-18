
import Blog from '@/resources/blog/blog.interface';
import BlogModel from '@/resources/blog/blog.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class BlogService {
    private blog = BlogModel;

    public async createBlog(body: Blog): Promise<Blog> {
        try {
            const blog = await this.blog.create({
                ...body,
                slug: slugify(body.title, { lower: true }),
            });
            return blog;
        } catch (error) {
            throw new Error('Error creating blog');
        }
    }

    public async getAllBlogs(body: PostBody): Promise<Blog[]> {
        try {
            const { sort, skip, limit, searchFilter } =
                await ConvertResponse(body);

            const blogs = await this.blog
                .find(searchFilter)
                .sort(sort)
                .skip(skip)
                .limit(limit);

            return blogs;
        } catch (error) {
            throw new Error('Error retrieving blogs');
        }
    }

    public async getBlogById(id: string): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();
            return blog;
        } catch (error) {
            throw new Error('Error retrieving blog');
        }
    }

    public async updateBlog(id: string, body: Blog): Promise<Blog> {
        try {
            const newBlog = await this.blog.findByIdAndUpdate(id, body, {
                new: true,
            });
            if (!newBlog) throw new Error();
            return newBlog;
        } catch (error) {
            throw new Error('Error updating blog');
        }
    }

    public async deleteBlogById(id: string): Promise<void> {
        try {
            await this.blog.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error deleting blog');
        }
    }

    public async deleteAllBlogs(): Promise<void> {
        try {
            await this.blog.deleteMany();
        } catch (error) {
            throw new Error('Error deleting blogs');
        }
    }
}

export default BlogService;

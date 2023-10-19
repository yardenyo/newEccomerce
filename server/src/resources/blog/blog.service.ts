import Blog from '@/resources/blog/blog.interface';
import BlogModel from '@/resources/blog/blog.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class BlogService {
    private blog = BlogModel;

    public async createBlog(blogData: Blog, userId: string): Promise<Blog> {
        try {
            const slug = slugify(blogData.title, { lower: true });
            const blog = await this.blog.create({
                ...blogData,
                slug,
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
}

export default BlogService;

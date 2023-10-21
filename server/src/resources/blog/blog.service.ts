import Blog from '@/resources/blog/blog.interface';
import User from '@/resources/user/user.interface';
import BlogModel from '@/resources/blog/blog.model';
import userModel from '@/resources/user/user.model';
import roleModel from '@/resources/role/role.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';
import Roles from '@/utils/enums/roles.enums';
import { cloudinaryUploadImage } from '@/utils/config/cloudinaryConfig';
import fs from 'fs';

class BlogService {
    private blog = BlogModel;

    public async createBlog(blogData: Blog, userId: string): Promise<Blog> {
        try {
            const slug = slugify(blogData.title, { lower: true });
            let author = userId;

            if (blogData.author) {
                const authorData = await userModel.findById(blogData.author);
                if (!authorData) throw new Error();
                author = authorData._id;
            }

            const blog = await this.blog.create({
                ...blogData,
                author,
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

    public async getBlogById(id: string): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();

            blog.views += 1;
            await blog.save();

            return blog;
        } catch (error) {
            throw new Error('Error retrieving blog');
        }
    }

    public async updateBlog(
        id: string,
        blogData: Blog,
        user: User,
    ): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();

            const userRole = await roleModel.findById(user.role);
            if (!userRole) throw new Error();

            if (
                userRole.name !== Roles.ADMIN &&
                user._id.toString() !== blog.author.toString()
            )
                throw new Error();

            const updatedBlog = await this.blog.findByIdAndUpdate(
                id,
                {
                    ...blogData,
                    ...(blogData.title && {
                        slug: slugify(blogData.title, { lower: true }),
                    }),
                },
                { new: true },
            );

            if (!updatedBlog) throw new Error();

            return updatedBlog;
        } catch (error) {
            throw new Error('Error updating blog');
        }
    }

    public async deleteBlog(id: string, user: User): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();

            const userRole = await roleModel.findById(user.role);
            if (!userRole) throw new Error();

            if (
                userRole.name !== Roles.ADMIN &&
                user._id.toString() !== blog.author.toString()
            )
                throw new Error();

            const deletedBlog = await this.blog.findByIdAndDelete(id);
            if (!deletedBlog) throw new Error();

            return deletedBlog;
        } catch (error) {
            throw new Error('Error deleting blog');
        }
    }

    public async deleteAllBlogs(): Promise<void> {
        try {
            await this.blog.deleteMany({});
        } catch (error) {
            throw new Error('Error deleting blogs');
        }
    }

    public async likeBlog(id: string, user: User): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();

            const userRole = await roleModel.findById(user.role);
            if (!userRole) throw new Error();

            if (userRole.name === Roles.ADMIN) throw new Error();

            const userLiked = blog.likes.includes(user._id.toString());
            const userDisliked = blog.dislikes.includes(user._id.toString());

            if (userLiked) {
                blog.likes = blog.likes.filter(
                    (like) => like.toString() !== user._id.toString(),
                );
                blog.isLiked = false;
            } else {
                blog.likes.push(user._id);
                blog.isLiked = true;
            }

            if (userDisliked) {
                blog.dislikes = blog.dislikes.filter(
                    (dislike) => dislike.toString() !== user._id.toString(),
                );
                blog.isDisliked = false;
            }

            await blog.save();

            return blog;
        } catch (error) {
            throw new Error('Error liking blog');
        }
    }

    public async dislikeBlog(id: string, user: User): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();

            const userRole = await roleModel.findById(user.role);
            if (!userRole) throw new Error();

            if (userRole.name === Roles.ADMIN) throw new Error();

            const userLiked = blog.likes.includes(user._id.toString());
            const userDisliked = blog.dislikes.includes(user._id.toString());

            if (userDisliked) {
                blog.dislikes = blog.dislikes.filter(
                    (dislike) => dislike.toString() !== user._id.toString(),
                );
                blog.isDisliked = false;
            } else {
                blog.dislikes.push(user._id);
                blog.isDisliked = true;
            }

            if (userLiked) {
                blog.likes = blog.likes.filter(
                    (like) => like.toString() !== user._id.toString(),
                );
                blog.isLiked = false;
            }

            await blog.save();

            return blog;
        } catch (error) {
            throw new Error('Error disliking blog');
        }
    }

    public async uploadBlogImages(
        id: string,
        files: Express.Multer.File[],
    ): Promise<Blog> {
        try {
            const blog = await this.blog.findById(id);
            if (!blog) throw new Error();

            const imageLinks = [];

            for (const file of files) {
                const image: any = await cloudinaryUploadImage(file.path);
                imageLinks.push(image.url);
                fs.unlinkSync(file.path);
            }

            blog.images = blog.images.concat(imageLinks);
            await blog.save();

            return blog;
        } catch (error) {
            throw new Error('Error uploading blog images');
        }
    }
}

export default BlogService;

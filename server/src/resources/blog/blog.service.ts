import Blog from '@/resources/blog/blog.interface';
import BlogModel from '@/resources/blog/blog.model';
import PostBody from '@/utils/interfaces/postbody.interface';
import ConvertResponse from '@/utils/helpers/convertresponse.helper';
import slugify from 'slugify';

class BlogService {
    private blog = BlogModel;
}

export default BlogService;

import Joi from 'joi';

const createBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    views: Joi.number().default(0),
    isLiked: Joi.boolean().default(false),
    isDisliked: Joi.boolean().default(false),
    likes: Joi.array().items(Joi.string()),
    dislikes: Joi.array().items(Joi.string()),
    image: Joi.string().default(
        'https://thumbs.dreamstime.com/z/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=992',
    ),
    author: Joi.string(),
});

const updateBlog = Joi.object({});

export default { createBlog, updateBlog };

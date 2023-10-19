import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import AuthController from '@/resources/auth/auth.controller';
import UserController from '@/resources/user/user.controller';
import RoleController from '@/resources/role/role.controller';
import ProductController from '@/resources/product/product.controller';
import BlogController from '@/resources/blog/blog.controller';

validateEnv();

const app = new App(
    [
        new AuthController(),
        new UserController(),
        new RoleController(),
        new ProductController(),
        new BlogController(),
    ],
    Number(process.env.PORT),
);

app.listen();

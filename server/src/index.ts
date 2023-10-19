import "dotenv/config";
import "module-alias/register";
import App from "./app";
import validateEnv from "@/utils/validateEnv";
import AuthController from "@/resources/auth/auth.controller";
import UserController from "@/resources/user/user.controller";
import RoleController from "@/resources/role/role.controller";
import ProductController from "@/resources/product/product.controller";
import BlogController from "@/resources/blog/blog.controller";
import categoryController from "@/resources/category/category.controller";
import blogCategoryController from "@/resources/blogCategory/blogCategory.controller";
import brandController from "@/resources/brand/brand.controller";

validateEnv();

const app = new App(
  [
    new AuthController(),
    new UserController(),
    new RoleController(),
    new ProductController(),
    new BlogController(),
    new categoryController(),
    new blogCategoryController(),
    new brandController(),
  ],
  Number(process.env.PORT),
);

app.listen();

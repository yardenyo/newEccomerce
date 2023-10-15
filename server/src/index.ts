import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';
import AuthController from '@/resources/auth/auth.controller';

validateEnv();

const app = new App(
    [new PostController(), new AuthController()],
    Number(process.env.PORT),
);

app.listen();

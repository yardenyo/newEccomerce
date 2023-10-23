import ErrorMiddleware from '@/middleware/error.middleware';
import NotFoundMiddleware from '@/middleware/notFound.middleware';
import redisClient from '@/utils/config/redisConfig';
import Controller from '@/utils/interfaces/controller.interface';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeRedisConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initialize404Handling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(
            cors({ origin: process.env.CLIENT_URL, credentials: true }),
        );
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(cookieParser());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private initialize404Handling(): void {
        this.express.use(NotFoundMiddleware);
    }

    private initializeDatabaseConnection(): void {
        mongoose.connect(process.env.MONGODB_URI as string);
    }

    private initializeRedisConnection(): void {
        redisClient.connect();
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;

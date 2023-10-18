import { createClient } from 'redis';
import { promisify } from 'util';

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

const setAsync = promisify(redisClient.set).bind(redisClient);
const getAsync = promisify(redisClient.get).bind(redisClient);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.log(err.message);
});

redisClient.on('ready', () => {
    console.log('Redis is ready');
});

redisClient.on('end', () => {
    console.log('Redis connection ended');
});

process.on('SIGINT', () => {
    redisClient.quit();
});

export default redisClient;
export { setAsync, getAsync };

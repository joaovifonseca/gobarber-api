import { RedisOptions } from 'ioredis';

interface ICacheconfig {
    driver: 'redis';

    config: {
        redis: RedisOptions;
    };
}

export default {
    driver: 'redis',

    config: {
        redis: {
            host: 'localhost',
            port: 6379,
            password: undefined,
        }
    }
} as ICacheconfig;
import Redis from 'ioredis';

// Define the options interface for Redis configuration
interface RedisOptions {
  host: string;
  port: number;
  password?: string;
  db?: number;
}

// Function to get Redis connection options
function getOptions(): RedisOptions {
  const redisOptions: RedisOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  };

  if (process.env.REDIS_PASSWORD) {
    redisOptions.password = process.env.REDIS_PASSWORD;
  }

  if (process.env.REDIS_DB) {
    redisOptions.db = parseInt(process.env.REDIS_DB, 10);
  }

  return redisOptions;
}

// Redis client singleton implementation
const redisClient = (function () {
  let instance: Redis | undefined;

  function createInstance(): Redis {
    const client = new Redis(getOptions());

    client.on('connect', () =>
      console.log('server/lib: redis connected successfully')
    );
    client.on('error', error =>
      console.log(`error connecting to redis server: ${error}`, 'error')
    );

    return client;
  }

  return {
    getInstance: function (): Redis {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export { redisClient };

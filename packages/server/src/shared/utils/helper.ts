import _ from 'lodash';
import { redisClient as redis } from './redisClient';

const omitEmpty = obj => {
  return _.pickBy(obj, value => {
    return value !== null && value !== undefined && value !== '';
  });
};

const setRedisKey = async (key, value, expiryTime) => {
  const redisClient = redis.getInstance();
  await redisClient.set(key, value, 'EX', expiryTime);
};

const checkIfRedisKeyExists = async (key) => {
  const redisClient = redis.getInstance();
  return redisClient?.get(key);
};

export {
  omitEmpty,
  checkIfRedisKeyExists,
  setRedisKey
};

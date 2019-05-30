const Promise = require('bluebird')
const redisPackage = require('redis')
const config = require('../config')

/**
 * @description Redis init.
 */
Promise.promisifyAll(redisPackage.RedisClient.prototype)
Promise.promisifyAll(redisPackage.Multi.prototype)

const redisClientCreator = () => redisPackage.createClient({
  port: config.REDIS.PORT,
  host: config.REDIS.HOST,
  password: config.REDIS.PASSWORD
})

const Redis = redisClientCreator()

// Can't Pub/Sub On Same Client
const RedisPub = redisClientCreator()
const RedisSub = redisClientCreator()

module.exports = {
  Redis,
  RedisPub,
  RedisSub
}
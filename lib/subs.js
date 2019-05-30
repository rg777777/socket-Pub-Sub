const { RedisSub} = require('./redis')
const config = require('../config')

const subscribeToChannel = () => {
  RedisSub.subscribe(config.REDIS.PROJECT_QUEUE)

    return RedisSub.on('message', (channel, message) => {
      console.log('channel', channel, message)
    })
}
subscribeToChannel()
module.exports = {
  subscribeToChannel
}
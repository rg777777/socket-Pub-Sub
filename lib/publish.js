const {RedisPub} = require('./redis')
const Promise = require('bluebird')
const config = require('../config')

const testObj = {
  "state": "ready",
  "status": "ok",
  "user_id": 1
}

const states = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
]

const publishToChannel = () => {
  return Promise.each(states, state => {
    return Promise.delay(2000).then(() => {
      console.log('publishToChannel: ', state)
      const _obj = Object.assign({}, testObj, {state})
      return RedisPub.publishAsync(config.REDIS.PROJECT_QUEUE, JSON.stringify(_obj))
    })
  }, {concurrency: 1}).then(publishToChannel)
}

publishToChannel()
module.exports = {
  publishToChannel
}
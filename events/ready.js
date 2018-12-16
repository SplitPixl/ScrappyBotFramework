const Event = require('../classes/event.js')
const logger = require('../utils/logger.js')
const fs = require('fs-extra')

let context
let bot

module.exports = class ReadyEvent extends Event {
  constructor(ctx) {
    super({type: 'ready'})
    context = ctx
    bot = ctx.bot
  }

  async run() {
    logger.log(`Ready as @${bot.user.username}#${bot.user.discriminator} (${bot.user.id})`)
    logger.log(`Running shard(s): ${bot.shards.map((shard) => shard.id).join(', ')}`)

    await fs.readdir('./init').then((files) => {
      files.filter((file) => file.endsWith('.js')).forEach((file) => {
        let name = file.substring(0, file.length - 3)
        logger.log(`Running init script: ${name}`)
        try {
          require(`../init/${file}`)(context)
        } catch (err) {
          console.error(err)
        }
      })
    })
  }
}

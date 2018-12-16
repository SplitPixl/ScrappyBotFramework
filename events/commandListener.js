const Event = require('../classes/event.js')
const config = require('../config.js')
const logger = require('../utils/logger.js')

let bot
let commands

function formatArguments(primArgs, cmd) {
  primArgs.shift()
  let args = {}
  cmd.args.forEach((arg, index) => {
    args[arg.label] = primArgs[index]
  })
  args.__ = primArgs

  return args
}

function canRun(message) {
  let authorIsNotSelf = message.author.id !== bot.user.id
  let authorIsNotBot = !message.author.bot
  let correctPrefix = message.content.startsWith(config.prefix)

  return authorIsNotSelf && authorIsNotBot && correctPrefix
}

module.exports = class CommandEvent extends Event {
  constructor(ctx) {
    super({type: 'messageCreate'})
    bot = ctx.bot
    commands = ctx.commands
  }

  async run(message, channel) {
    if (canRun(message)) {
      let primArgs = message.content.replace(config.prefix, '').split(' ')

      if (commands.has(primArgs[0])) {
        let cmd = commands.get(primArgs[0])
        let args = formatArguments(primArgs, cmd)
        let ctx = {
          message,
          args,
          channel,
          commands,
          bot
        }

        // aliases
        ctx.msg = ctx.message
        ctx.reply = (text) => message.channel.createMessage(text)

        logger.cmd(ctx)

        await cmd.run(ctx).catch((err) => {
          logger.error(err)
        })
      }
    }
  }
}

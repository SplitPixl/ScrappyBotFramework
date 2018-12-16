const chalk = require('chalk')

const logTags = {
  log: '[ I ]',
  cmd: '[CMD]',
  warn: '[/!\\]',
  err: '[/!\\]'
}

module.exports = {
  log: (input) => {
    console.log(`${chalk.bgBlue.black(logTags.log)} ${input}`)
  },
  cmd: (ctx) => {
    let guildName = ctx.message.channel.guild ? ctx.message.channel.guild.name : 'Direct Msg'
    let channelName = `#${ctx.message.channel.name || ''}`
    let userName = `${ctx.message.author.username}#${ctx.message.author.discriminator}`
    let content = ctx.message.content

    console.log(`${chalk.bgGreen.black(logTags.cmd)} ${chalk.yellow(guildName)} - ${chalk.green(channelName)} | ${chalk.blue(userName)} > ${content}`)
  },
  warn: (input) => {
    console.error(`${chalk.bgYellow.black(logTags.warn)} ${input}`)
  },
  error: (err) => {
    if (err && err instanceof Error) {
      console.error(`${chalk.bgRed.black(logTags.err)} ${err.name}: ${err.message}`)
      console.error(err.stack)
    } else {
      console.log(`${chalk.bgRed.black(logTags.err)} ${err}`)
    }
  }
}

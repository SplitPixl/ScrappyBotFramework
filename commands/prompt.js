const Command = require('../classes/command.js')

const Readable = require('readable-url')
const prompter = new Readable(true, 2, ' ')

function getTime(args) {
  if (args.timer !== 'notimer') {
    return parseInt(args.timer, 10) || 120
  }

  return null
}

function generateTimeString(time) {
  if (time) {
    return ` in ${time} seconds.`
  }

  return '.'
}

module.exports = class PromptCommand extends Command {
  constructor(name) {
    super({
      desc: 'Sends you a prompt',
      args: [{label: 'timer'}]
    }, name)
  }

  async run(ctx) {
    let time = getTime(ctx.args)
    let timestr = generateTimeString(time)

    await ctx.reply(`You have to draw **"${prompter.generate()}"**${timestr}`)

    if (time) {
      setTimeout(() => {
        ctx.reply('Time is up!')
      }, time * 1000)
    }
  }
}

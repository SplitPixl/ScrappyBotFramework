const Command = require('../classes/command.js')
const config = require('../config.js')

function getCmds(ctx) {
  let commandArr = Array.from(ctx.commands.values())

  return commandArr.map((command) => `${config.prefix}${command.name} - ${command.desc || 'No description.'}`)
}

module.exports = class HelpCommand extends Command {
  constructor(name) {
    super({
      desc: 'Get a list of commands, or help about a command.',
      args: [{label: 'command'}]
    }, name)
  }

  async run(ctx) {
    if (ctx.args.command && ctx.commands.has(ctx.args.command)) {
      let command = ctx.commands.get(ctx.args.command)

      await ctx.reply(command.usage || 'No command usage text.')
    } else {
      let commandsInfo = getCmds(ctx)

      await ctx.reply(`\`\`\`\n${commandsInfo.join('\n')}\n\`\`\``)
    }
  }
}

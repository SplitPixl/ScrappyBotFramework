const Command = require('../classes/command.js')

module.exports = class EvalCommand extends Command {
  constructor(name) {
    super({
      desc: 'Evaluates code',
      args: [
        {
          label: 'code',
          required: true
        }
      ]
    }, name)
  }

  async run(ctx) {
    try {
      await ctx.reply(`\`\`\`\n${eval(ctx.args.__.join(' '))}\n\`\`\``)
    } catch (err) {
      await ctx.reply(`\`\`\`diff\n${err.stack.split('\n').map((line) => `- ${line}`)
        .join('\n')}\n\`\`\``)
    }
  }
}

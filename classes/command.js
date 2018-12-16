const config = require('../config.js')

module.exports = class Command {
  constructor(info, name) {
    this.name = info.name || name
    this.desc = info.desc
    this.aliases = info.aliases
    this.args = info.args || []
  }

  get usage() {
    let argsFormatted = this.args.map((arg) => {
      if (arg.required) {
        return `<${arg.label}>`
      }

      return `[${arg.label}]`
    })

    return (
      `${config.prefix}${this.name} - ${this.desc}\n\n` +
      `Syntax: \`${config.prefix}${this.name} ${argsFormatted.join(' ')}\``
    )
  }

  async run(ctx) {
    await ctx.reply('default')
  }
}

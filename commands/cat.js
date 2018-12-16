const Command = require('../classes/command.js')
const axios = require('axios')

module.exports = class CatCommand extends Command {
  constructor(name) {
    super({desc: 'Sends a cat'}, name)
  }

  async run(ctx) {
    await axios
      .get('http://aws.random.cat/meow')
      .then(async (res) => {
        await ctx.reply(res.data.file)
      })
      .catch(async (err) => {
        await ctx.reply(`:warning: Could not get a cat image for you. \`(${err.message})\``)
      })
  }
}

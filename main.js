const config = require('./config.js')
const logger = require('./utils/logger.js')
const fs = require('fs-extra')
const Eris = require('eris')

let bot = new Eris(config.token)
let commands = new Map()

let ctx = {
  bot,
  commands
}

fs.readdir('./commands').then((files) => {
  files.filter((file) => file.endsWith('.js')).forEach((file) => {
    try {
      let name = file.substring(0, file.lastIndexOf('.'))
      let CommandClass = require(`./commands/${file}`)
      let cmd = new CommandClass(name)
      let definedName = cmd.name || name

      commands.set(definedName, cmd)
      logger.log(`Loaded command: ${definedName}`)
    } catch (err) {
      logger.error(err)
    }
  })
})

fs.readdir('./events').then((files) => {
  files.filter((file) => file.endsWith('.js')).forEach((file) => {
    try {
      let name = file.substring(0, file.length - 3)
      let EvntClass = require(`./events/${file}`)
      let evnt = new EvntClass(ctx)

      bot.on(evnt.type, evnt.run)
      logger.log(`Loaded event: ${evnt.name || name}`)
    } catch (err) {
      logger.error(err)
    }
  })
})

bot.connect()

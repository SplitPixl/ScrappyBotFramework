require('dotenv').config()

module.exports = {
  'token': process.env.BOT_TOKEN,
  'prefix': process.env.BOT_PREFIX,
  'admins': process.env.BOT_ADMINS ? process.env.BOT_ADMINS.split(',') : null
}

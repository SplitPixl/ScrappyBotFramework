module.exports = class Event {
  constructor(info) {
    this.name = info.name
    this.desc = info.desc
    this.type = info.type
  }

  async run(data) {
    await console.log(data)
  }
}

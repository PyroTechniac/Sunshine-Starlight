const path = require("path")
const SunshineClient = require("../structures/Client")
const StarlightClient = require("../structures/Client")
const config = require('../config')
const SequelizeProvider = require("../providers/Sequelize")
const client = new SunshineClient({
    commandPrefix: config.bots.sunshine.prefix,
    owner: config.bots.sunshine.owners.split(","),
    disableEveryone: true,
    unknownCommandResponse: false,
    disabledEvents: ['TYPING_START']
})
const bot = new StarlightClient({
    commandPrefix: config.bots.starlight.prefix,
    owner: config.bots.starlight.owners.split(','),
    disableEveryone: true,
    unknownCommandResponse: false,
    disabledEvents: ['TYPING_START']
})
client.registry
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, '../commands'))
bot.registry
    .registerDefaults()
    .registerGroups([
        ['admin', 'Administrative'],
        ['util', 'Utility']
    ])
    .registerCommandsIn(path.join(__dirname, '../commands'))
client.setProvider(new SequelizeProvider(client.database)).catch(console.error)
bot.setProvider(new SequelizeProvider(bot.database)).catch(console.error)
module.exports = bot
module.exports = client

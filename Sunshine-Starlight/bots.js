const config = require("./config")
const bot = require("./server/client-bot")
const client = require("./server/client-bot")
//Sunshine is client, Starlight is bot
const discordjs = require('discord.js')
async function dualLogin(starBot, sunClient) {
    await starBot.login(config.bots.starlight.token)
    await sunClient.login(config.bots.sunshine.token)
}

const originalMembersFunction = discordjs.MessageMentions.members;
discordjs.MessageMentions.members = (function (originalMembersFunction) {
    return function (...args) {
        if (this._members) return this._members
        if (!this.guild) return null
        this._members = new Collection();
        let matches;
        while ((matches = this.constructor.USERS_PATTERN.exec(this._content)) !== null) {
            const member = this.guild.members.get(matches[1])
            if (member) this._members.set(member.id, member)
        }
        return this._members
    }
}(originalMembersFunction))
client.on("commandError", (command, error) => console.error('[SUNSHINE COMMAND ERROR]', command.name, error))
bot.on("commandError", (command, error) => console.error('[STARLIGHT COMMAND ERROR]', command.name, error))
dualLogin(bot, client)
process.on('unhandledRejection', (err) => {
    console.error('[FATAL] Unhandled promise rejection:', err)
    process.exit(1)
})
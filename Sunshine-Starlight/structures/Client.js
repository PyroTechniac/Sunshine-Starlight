const { CommandoClient } = require("discord.js-commando")
const SunshineSQLite = require("./SunshineDatabase")
const StarlightSQLite = require("./StarlightDatabase")
class SunshineClient extends CommandoClient {
    constructor(options) {
        super(options)
        this.database = SunshineSQLite.db
        SunshineSQLite.start()
    }
}
class StarlightClient extends CommandoClient {
    constructor(options) {
        super(options)
        this.database = StarlightSQLite.db
        StarlightSQLite.start()
    }
}
module.exports = SunshineClient
module.exports = StarlightClient
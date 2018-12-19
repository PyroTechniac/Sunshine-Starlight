const Sequelize = require("sequelize")
const config = require("../config")
const db = new Sequelize(config.db.username, config.db.password, config.db.host, { logging: false, operatorsAliases: false, storage: 'sunshine.sqlite', dialect: config.db.dialect })
class SunshineSQLite {
    static get db() {
        return db
    }
    static async start() {
        try {
            await db.authenticate()
            await db.sync()
        } catch (error) {
            console.error('[DATABASE] Unable to connect to database', error)
            setTimeout(() => SunshineSQLite.start(), 5000)
        }
    }
}
module.exports = SunshineSQLite
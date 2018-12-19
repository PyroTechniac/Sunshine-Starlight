require("dotenv").config()
const convict = require("convict")
const fs = require("fs")
const config = convict({
    env: {
        doc: "The application environment",
        format: ['prod', 'dev', 'test'],
        default: "dev",
        env: "NODE_ENV",
        arg: 'env'
    },
    bots: {
        starlight: {
            name: {
                doc: "Starlight's name",
                format: String,
                default: "Starlight",
                env: "NAME_STAR",
                arg: "name-star"
            },
            token: {
                doc: "Starlight's token",
                format: (val) => {
                    if (!/^[a-zA-Z0-9._-]{59}$/.test(val)) throw new Error('Invalid Discord token');
                },
                default: "",
                sensitive: true,
                env: "TOKEN_STAR",
                arg: 'token-star'
            },
            owners: {
                doc: "Starlight's owners, separated by commas",
                format: String,
                default: "",
                sensitive: true,
                env: "OWNERS_STAR",
                arg: "owners-star"
            },
            prefix: {
                doc: "Starlight's command prefix",
                format: String,
                default: ">",
                env: "PREFIX_STAR",
                arg: 'prefix-star'
            }
        },
        sunshine: {
            name: {
                doc: "Sunshine's name",
                format: String,
                default: "Sunshine",
                env: "NAME_SUN",
                arg: "name-sun"
            },
            token: {
                doc: "Sunshine's token",
                format: (val) => {
                    if (!/^[a-zA-Z0-9._-]{59}$/.test(val)) throw new Error('Invalid Discord token');
                },
                default: "",
                sensitive: true,
                env: "TOKEN_SUN",
                arg: "token-sun"
            },
            owners: {
                doc: "Sunshine's owners, separated by commas",
                format: String,
                default: "",
                sensitive: true,
                env: "OWNERS_SUN",
                arg: "owners-sun"
            },
            prefix: {
                doc: "Sunshine's command prefix",
                format: String,
                default: "//",
                env: "PREFIX_SUN",
                arg: "prefix-sun"
            }
        }
    },
    db: {
        host: {
            doc: "Database host",
            format: String,
            default: "localhost",
            env: "DB_HOST",
            arg: "host"
        },
        username: {
            doc: "Database username",
            format: String,
            default: "username",
            sensitive: true,
            env: "DB_USERNAME",
            arg: "username"
        },
        password: {
            doc: "Database password",
            format: String,
            default: "password",
            sensitive: true,
            env: "DB_PASSWORD",
            arg: "password"
        },
        dialect: {
            doc: "Database dialect",
            format: String,
            default: "sqlite",
            env: "DB_DIALECT",
            arg: "dialect"
        }
    }
})
const env = config.get('env')
const configFilePath = `./config/${env}.json`
if (fs.existsSync(configFilePath)) config.loadFile(configFilePath)
config.validate({ allowed: 'strict' })
module.exports = config.getProperties()
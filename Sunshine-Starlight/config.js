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
                format: String,
                default: "",
                sensitive: true
                env: "TOKEN_STAR",
                arg: 'token-star'
            }
        },
        sunshine: {
            name: {
                doc: "Sunshine's name"
            }
        }
    }
})
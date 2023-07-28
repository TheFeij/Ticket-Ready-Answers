const winston = require("winston")
require("winston-transport")
require("winston-mongodb")



/**
 * Function to add transports to winston
 */
module.exports = function(){
    // Adding console, file and mongodb transports to winston
    winston.add(new winston.transports.Console())
    winston.add(new winston.transports.File({filename: "logsFile.log"}))
    winston.add(new winston.transports.MongoDB({
        db: process.env.NODE_ENV === "test" ? process.env.DB_TESTS : process.env.DB,
        level: "info"
    }))
}

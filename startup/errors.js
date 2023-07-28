const winston = require("winston")



/**
 * Function to add two listeners for uncaughtExceptions
 * and unhandledRejections
 */
module.exports = function(){
    // Catching uncaught exceptions in the app outside the scope of express
    // (exceptions in the scope of express will be handled by a middleware function)
    process.on("uncaughtException", (ex) => {
        winston.error(ex.message, ex)
        process.exit(1)
    })

    // Catching unhandled promise rejections in the app outside the scope of express
    // (rejections in the scope of express will be handled by a middleware function)
    process.on("unhandledRejection", (ex) => {
        winston.error(ex.message, ex)
        process.exit(1)
    })
}

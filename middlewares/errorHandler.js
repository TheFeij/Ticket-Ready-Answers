const winston = require("winston");



/**
 * Middleware function to wrap all route handlers in a try-catch block
 * to handle exceptions and errors, so that we don't have to repeat the
 * try-catch pattern in all our route handlers.
 *
 * @param {function} routeHandler - Function that handles an endpoint (route handler).
 * @return {function(*, *, *)} - A new async function to be used as a wrapped route handler.
 */
module.exports = function(routeHandler){
    return async (req, res) => {
        try {
            routeHandler(req, res)
        } catch (exception){
            winston.error(exception.message, exception)
        }
    }
}
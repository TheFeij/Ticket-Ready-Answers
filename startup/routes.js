const express = require("express")



/**
 * Function to set up Express application with routers and JSON middleware.
 *
 * @param {Object} app - The Express application instance.
 */
module.exports = function(app){
    // Json middleware function. It is not a route handler
    // but added it here, so the code becomes cleaner
    app.use(express.json())

    // TO DO: add route handlers to the app
}

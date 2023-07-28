const express = require("express")
const app = express()
const winston = require("winston")
const fs = require("fs")
const https = require("https")



// Load environment variables from the .env file using 'dotenv' package
require("dotenv").config()
// TO DO: Require a startup function to add routes to the express app
// TO DO: Require a startup function to set up logging settings for winston package
// TO DO: Require a startup function to set up error handling
// TO DO: Require a startup function to set up the database



// Set the port number from environment variables. If not defined, set it to 3000
const PORT = process.env.PORT || 3000

/**
 * I recommend using HTTPS instead of HTTP for a more secure connection but that requires
 * ssl key and certificate, so if you have your own key and certificate, Place them in the
 * ssl folder with names key.pem and cert.pem, And set a variable environment HTTPS=true in
 * the .env file to use HTTPS
 */
if(process.env.HTTPS){
    // Loading the SSL key and certificate from the 'ssl' directory
    const httpsOptions = {
        key: fs.readFileSync("./ssl/key.pem"),
        cert: fs.readFileSync('./ssl/cert.pem')
    };

    // Creating an HTTPS server that uses the SSL key and certificate,
    // and points to the Express app
    https
        .createServer(httpsOptions, app)
        .listen(PORT, ()=>{
            winston.info(`HTTPS server listening on port ${PORT}...`)
        })
} else {
    // Starting an HTTP server on the defined port
    app.listen(PORT, ()=>{
        winston.info(`HTTP server listening on port ${PORT}...`)
    })
}
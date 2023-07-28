const mongoose = require("mongoose")
const winston = require("winston")



/**
 * Function to connect to the MongoDB server using Mongoose.
 *
 * @return {Promise<void>} - A Promise that resolves when the connection to
 * the database is established.
 */
module.exports = async function(){
    // checking the environment and deciding which database to connect to
    // if in test environment connect to the test database
    await mongoose.connect(
        process.env.NODE_ENV === "test" ? process.env.DB_TESTS : process.env.DB)

    winston.info("Connected to mongodb...")
}

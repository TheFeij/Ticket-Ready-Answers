const {Category} = require("../models/category")
const errorHandler = require("../middlewares/errorHandler")
const {Template, validateTemplate} = require("../models/template");
const express = require("express")
const router = express.Router()
const _ = require("lodash")



/**
 * route handler to create a new template
 */
router.post("/", errorHandler(async (req, res) => {
    // Checking if the body of the request is undefined or not
    if(req.body === undefined)
        return res.status(400).send("No object found in the body")

    // Validating client's template information
    const {error} = validateTemplate(
        _.pick(req.body, ["title", "description", "category"]))
    if(error){
        res.status(400).send(error.details[0].message)
    }

    // Finding the category specified by the client
    const category = await Category.findOne({name: req.body.category})
    if(!category){
        return res.status(404).send("Category not found")
    }

    // Creating a new template
    const template = new Template({
        title: req.body.title,
        description: req.body.description,
        category: category._id
    })

    // Saving the template to the database
    await template.save()

    // Sending a message to the client
    res.send("Template added successfully!")
}))



module.exports = router

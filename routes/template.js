const {Category} = require("../models/category")
const errorHandler = require("../middlewares/errorHandler")
const {Template, validateTemplate} = require("../models/template");
const express = require("express")
const router = express.Router()
const _ = require("lodash")



/**
 * Route handler to create a new template
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

    // Sending the created template to the client
    res.json(template)
}))

/**
 * Route handler to edit an existing template
 * this method edits the whole template, so if for example client wants to
 * only change the title of the template. client should send the whole template
 * information including title, description and category name but sending the old
 * description and category name so only the title changes
 */
router.put("/", errorHandler(async (req, res) => {
    // Checking if the body of the request is undefined or not
    if(req.body === undefined)
        return res.status(400).send("No object found in the body")

    // Validating client's new template information
    const {error} = validateTemplate(
        _.pick(req.body, ["title", "description", "category"]))
    if(error){
        res.status(400).send(error.details[0].message)
    }

    // Finding the template specified by the client
    const template = await Template.findById(req.query.id)
    if(!template){
        return res.status(404).send("template not found")
    }

    // Finding the category specified by the client
    const category = await Category.findOne({name: req.body.category})
    if(!category){
        return res.status(404).send("Category not found")
    }

    // Editing the information
    template.title = req.body.title
    template.description = req.body.description
    template.category = category._id

    // Saving the template to the database
    await template.save()

    // Sending the edited template to the client
    res.json(template)
}))


module.exports = router

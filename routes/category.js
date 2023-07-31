const {validateCategory, Category} = require("../models/category")
const errorHandler = require("../middlewares/errorHandler")
const express = require("express")
const router = express.Router()
const _ = require("lodash")



/**
 * route handler to create a new category
 */
router.post("/", errorHandler(async (req, res) => {
    // Checking if the body of the request is undefined or not
    if(req.body === undefined)
        return res.status(400).send("No category object found in the body")

    // Validating client's category information
    const {error} = validateCategory(
        _.pick(req.body, ["name", "parent"]))
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const parentCategory = await Category.findById(req.body.parent)
    if(!parentCategory){
        return res.status(404).send("parent category not found")
    }

    // Creating a new category
    const category = new Category({
        name: req.body.name,
        parent: req.body.parent,
    })

    // Saving the category to the database
    await category.save()

    // Sending the category to the client
    res.json(category)
}))

/**
 * Route handler to edit an existing category
 * this route handler receives updated information of category in req.body
 * and the id of the category to be deleted in the req.query.id
 * this method edits the whole category information, so if for example client wants to
 * only change the name of the category. client should send the whole category
 * information including name and parent id of the category but sending the current
 * parent id so only the title changes
 */
router.put("/", errorHandler(async (req, res) => {
    // Checking if the body of the request is undefined or not
    if(req.body === undefined)
        return res.status(400).send("No object found in the body")

    // Checking if the query parameter id is defined or not
    if(req.query.id === undefined)
        return res.status(400).send("No category id provided")

    // Validating client's new category information
    const {error} = validateCategory(
        _.pick(req.body, ["name", "parent"]))
    if(error){
        res.status(400).send(error.details[0].message)
    }

    // Finding the category specified by the client
    const category = await Category.findById(req.query.id)
    if(!category){
        return res.status(404).send("Category not found")
    }

    // Finding the parent category specified by the client
    const parent = await Category.findById(req.body.parent)
    if(!parent){
        return res.status(404).send("Parent category not found")
    }

    // Editing the information
    category.name = req.body.name
    category.parent = req.body.parent

    // Saving the category to the database
    await category.save()

    // Sending the edited category to the client
    res.json(category)
}))



module.exports = router

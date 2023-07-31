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



module.exports = router

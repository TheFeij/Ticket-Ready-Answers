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
        return res.status(400).send("No template object found in the body")

    // Validating client's category information
    const {error} = validateCategory(
        _.pick(req.body, ["name", "parent"]))
    if(error){
        res.status(400).send(error.details[0].message)
    }

    let parentCategory
    if(req.body.parent === undefined){
        parentCategory = null
    } else {
        // Finding the parent category specified by the client
        parentCategory = await Category.findOne({name: req.body.parent})
        if(!parentCategory){
            return res.status(404).send("parent category not found")
        }
    }


    // Creating a new category
    const category = new Category({
        name: req.body.name,
        subCategories: parentCategory ? parentCategory._id : null,
    })

    // Saving the category to the database
    await category.save()

    // Sending a message to the client
    res.send("Category added successfully!")
}))



module.exports = router

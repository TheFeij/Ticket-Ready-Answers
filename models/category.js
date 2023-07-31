const mongoose = require("mongoose")
const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)



// Defining category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 64
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
    }
})

// Creating the category model using categorySchema
const Category = mongoose.model("category", categorySchema)



/**
 * Validates the category object received from the client when adding a new category.
 *
 * @param {Object} category - The category object to be validated.
 * @return {Joi.ValidationResult<any>} - The validation result using the Joi schema.
 */
function validateCategory(category){
    const schema = new Joi.object({
        name: Joi
            .string()
            .required()
            .min(1)
            .max(64),
        parent: Joi
            .objectId()
            .default(null)
    })

    return schema.validate(category)
}

/**
 * Recursively constructs the full tree of categories starting from the specified category ID.
 *
 * @param {string} categoryId - The ID of the category to start building the tree from.
 * @returns {Promise<Object>} A promise that resolves to an object representing the category and its subcategories
 *                            The object has the following properties:
 *                            - id: The ID of the category.
 *                            - name: The name of the category.
 *                            - children: An array of nested category objects (subcategories).
 * @throws {Error} If there's an issue with the database query or connection.
 */
async function getFullTree(categoryId) {
    // Find the category with the provided categoryId in the database.
    const category = await Category.findById(categoryId)

    // If the category doesn't exist, return null as there's no tree to build.
    if (!category) {
        return null
    }

    // Find all subcategories of the current category.
    const subCategories = await Category.find({ parent: categoryId })

    // Recursively construct the tree for each subcategory.
    const subCategoryTree = await Promise.all(
        subCategories.map((subCategory) => getFullTree(subCategory._id))
    )

    // Construct the object representing the category and its children (subcategories).
    return {
        id: category._id,
        name: category.name,
        children: subCategoryTree,
    }
}

/**
 * Retrieves all root categories (categotries with no parent) from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of root categories.
 * @throws {Error} If there's an issue with the database query or connection.
 */
async function getRoots() {
    return Category.find({ parent: null })
}

/**
 * Retrieves all categories and constructs their full hierarchical tree.
 *
 * @returns {Promise<Array>} A promise that resolves to an array representing the full tree of categories.
 *                          Each element in the array represents a root category and its nested subcategories.
 * @throws {Error} If there's an issue with the database query or connection.
 */
async function getAllCategories(){
    const rootCategories = await getRoots()
    if (rootCategories.length === 0) {
        return []
    } else {
        return await Promise.all(
            rootCategories.map((rootCategory) => getFullTree(rootCategory._id))
        )
    }
}



module.exports.Category = Category
module.exports.validateCategory = validateCategory
module.exports.getAllCategories = getAllCategories

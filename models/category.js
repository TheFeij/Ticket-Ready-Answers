const mongoose = require("mongoose")
const Joi = require("joi")



// Defining category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 64
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }]
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
            .string()
            .default(null)
            .min(1)
            .max(64),
    })

    return schema.validate(category)
}



module.exports.Category = Category
module.exports.validateCategory = validateCategory

const mongoose = require("mongoose")
const Joi = require("joi")



// Defining product schema
const templateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 128
    },
    description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1024
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

// Creating the product model using productSchema
const Template = mongoose.model("template", templateSchema)



/**
 * Validates the template object received from the client when adding a new template.
 *
 * @param {Object} template - The template object to be validated.
 * @return {Joi.ValidationResult<any>} - The validation result using the Joi schema.
 */
function validateTemplate(template){
    const schema = new Joi.object({
        title: Joi
            .string()
            .required()
            .min(1)
            .max(128),
        description: Joi
            .string()
            .required()
            .min(1)
            .max(1024),
        category: Joi
            .string()
            .required()
            .min(1)
            .max(64),
    })

    return schema.validate(template)
}



module.exports.Template = Template
module.exports.validateTemplate = validateTemplate

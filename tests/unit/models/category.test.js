const mongoose = require("mongoose")
const {validateCategory} = require("../../../models/category")



describe("validateCategory", () => {
    it.each([
        {
            name: "name",
            parent: new mongoose.mongo.ObjectId().toString()
        },
        {
            name: "name",
        },
    ])("should return the input object if it is valid", (category) => {
        // validating category object
        const result = validateCategory(category)

        // expect result.value to match the original category
        expect(result.value).toMatchObject(category)
        // expect result.error to be undefined
        expect(result.error).toBeUndefined()
    })

    it.each([
        {},
        null,
        {
            parent: new mongoose.mongo.ObjectId().toString()
        },
        {
            name: "",
            parent: new mongoose.mongo.ObjectId().toString()
        },
        {
            name: "a".repeat(65),
            parent: new mongoose.mongo.ObjectId().toString()
        },
        {
            name: "name",
            parent: "invalid category id"
        }
    ])("should return an error object if input object is not valid", (category) => {
        // validate category object
        const result = validateCategory(category)

        // expect to have a defined error property in the result
        expect(result.error).toBeDefined()
    })
})
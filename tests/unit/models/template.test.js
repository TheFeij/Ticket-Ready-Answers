const mongoose = require("mongoose")
const {validateTemplate} = require("../../../models/template")



describe("validateTemplate", () => {
    it("should return the input object if it is valid", () => {
        const template = {
            title: "title",
            description: "description",
            category: new mongoose.mongo.ObjectId().toString()
        }

        // validating template object
        const result = validateTemplate(template)

        // expect result.value to match the original template
        expect(result.value).toMatchObject(template)
        // expect result.error to be undefined
        expect(result.error).toBeUndefined()
    })

    it.each([
        {},
        null,
        {
            description: "description",
            category: new mongoose.mongo.ObjectId().toString()
        },
        {
            title: "title",
            category: new mongoose.mongo.ObjectId().toString()
        },
        {
            title: "title",
            description: "description",
        },
        {
            title: "",
            description: "description",
            category: new mongoose.mongo.ObjectId().toString()
        },
        {
            title: "title",
            description: "",
            category: new mongoose.mongo.ObjectId().toString()
        },
        {
            title: "title",
            description: "description",
            category: "invalid category id"
        },
        {
            title: "a".repeat(129),
            description: "description",
            category: new mongoose.mongo.ObjectId().toString()
        },
        {
            title: "title",
            description: "a".repeat(1025),
            category: new mongoose.mongo.ObjectId().toString()
        },
    ])("should return an error object if input object is not valid", (template) => {
        // validate template object
        const result = validateTemplate(template)

        // expect to have a defined error property in the result
        expect(result.error).toBeDefined()
    })
})

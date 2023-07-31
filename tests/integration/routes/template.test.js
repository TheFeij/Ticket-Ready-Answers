const request = require("supertest")
const {Category} = require("../../../models/category");
const {Template} = require("../../../models/template");
const mongoose = require("mongoose");




let server



describe("/products", () => {
    beforeEach(async () => {
        server = require("../../../index")
    })
    afterEach(async () => {
        server.close()
        await Category.deleteMany()
        await Template.deleteMany()
    })


    describe("POST /", () => {
        it("should return 400 if no template is provided", async () => {
            // Sending the request without providing a body
            const result = await request(server).post("/template")

            // Expecting the result to be 400
            expect(result.status).toBe(400)
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
        ])("should return 400 if input object is not valid", async (template) => {
            // Sending the request without providing a body
            const result = await request(server)
                .post("/template")
                .send(template)

            // Expecting the result to be 400
            expect(result.status).toBe(400)
        })

        it("should return 404 if the category is not found", async () => {
            // Creating a template object. category property is set to a new objectId
            // since our test DB is empty now, this category should not be found
            const template = {
                title: "title",
                description: "description",
                category: new mongoose.mongo.ObjectId().toString()
            }

            // Sending the request without providing a body
            const result = await request(server)
                .post("/template")
                .send(template)

            // Expecting the result to be 400
            expect(result.status).toBe(404)
        })

        it("should return 200 and the template must be saved to the database if template is valid", async () => {
            const category = new Category({
                name: "category"
            })

            await category.save()

            // Creating a template object. category property is set to the category._id
            // since we defined the category and saved it to the database this should be
            // a valid template and should be saved to the database
            const template = {
                title: "title",
                description: "description",
                category: category._id
            }

            // Sending the request without providing a body
            const result = await request(server)
                .post("/template")
                .send(template)

            // Expecting the result to be 400
            expect(result.status).toBe(200)

            // Check to see if the template is saved or not
            const savedTemplate = await Template.findOne({title: template.title})
            expect(savedTemplate).toMatchObject(template)
        })
    })
})
const Joi = require("joi");

const addStorySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required().min(10).max(500)
});

const updateStorySchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
}).or('title', 'description')

module.exports = {
    addStorySchema,
    updateStorySchema
}
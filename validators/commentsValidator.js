const Joi = require("joi");

const addCommentSchema = Joi.object({
    storyId: Joi.string().required(),
    chapterId: Joi.string().required(),
    content: Joi.string().required()
});

const removeCommentSchema = Joi.object({
    storyId: Joi.string().required(),
    chapterId: Joi.string().required(),
});
module.exports = {
    addCommentSchema,
    removeCommentSchema
}
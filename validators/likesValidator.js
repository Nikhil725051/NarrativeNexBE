const Joi = require("joi");

const addOrRemoveLikeSchema = Joi.object({
    storyId: Joi.string().required(),
    chapterId: Joi.string().required()
});

// const removeLikeSchema = Joi.object({
//     storyId: Joi.string().required(),
//     chapterId: Joi.string().required(),
// });
module.exports = {
    addOrRemoveLikeSchema,
    // removeLikeSchema
}
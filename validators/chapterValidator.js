const Joi = require("joi");

const addChapterSchema = Joi.object({
    storyId: Joi.string().required(),
    content: Joi.string().required().min(1000),
    chapterTitle: Joi.string().required(),
    
});

const updateChapterSchema = Joi.object({
    content: Joi.string(),
})

module.exports = {
   addChapterSchema,
   updateChapterSchema
}
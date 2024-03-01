const storyRouter = require('express').Router();
const { getAllStories, getStory, updateStory, deleteStory, addStory } = require('../controllers/storyController');
const validateRequest = require('../utils/validation');
const verifyUser = require("../utils/verify");
const { addStorySchema, updateStorySchema } = require('../validators/storyValidator');

//Get all stories
storyRouter.get('/', verifyUser, getAllStories);

//Create story
storyRouter.post('/create', verifyUser, validateRequest(addStorySchema), addStory);

//Update story
storyRouter.put('/updateStory', verifyUser, validateRequest(updateStorySchema), updateStory);

//Delete story
storyRouter.delete('/deleteStory', verifyUser, deleteStory);

module.exports = storyRouter
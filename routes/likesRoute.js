const likesRouter = require('express').Router();
const { getLikes, addOrRemoveLike } = require('../controllers/likesController');
require('../controllers/storyController');
const validateRequest = require('../utils/validation');
const verifyUser = require("../utils/verify");
const { addOrRemoveLikeSchema } = require('../validators/likesValidator');
require('../validators/storyValidator');

//Get all likes
likesRouter.get('/', verifyUser, getLikes);

//Add like
likesRouter.post('/addOrRemoveLike', verifyUser, validateRequest(addOrRemoveLikeSchema), addOrRemoveLike);

// //Remove like
// likesRouter.delete('/removeLike', verifyUser,validateRequest(removeLikeSchema), removeLike);

module.exports = likesRouter
const commentsRouter = require('express').Router();
const { getComments, addComment, removeComment } = require('../controllers/commentsController');
require('../controllers/likesController');
require('../controllers/storyController');
const validateRequest = require('../utils/validation');
const verifyUser = require("../utils/verify");
const { removeCommentSchema, addCommentSchema } = require('../validators/commentsValidator');
require('../validators/likesValidator');
const { addStorySchema } = require('../validators/storyValidator');
require('../validators/storyValidator');

//Get all comments
commentsRouter.post('/', verifyUser, getComments);

//Add comment
commentsRouter.post('/addComment', verifyUser, validateRequest(addCommentSchema), addComment);

//Remove comment
commentsRouter.delete('/removeComment', verifyUser,validateRequest(removeCommentSchema), removeComment);

module.exports = commentsRouter
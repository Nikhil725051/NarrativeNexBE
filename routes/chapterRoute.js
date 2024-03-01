const chapterRouter = require('express').Router();
const { getAllChapters, addChapter, updateChapter, getChapters } = require('../controllers/chapterController');
require('../controllers/storyController');
const validateRequest = require('../utils/validation');
const verifyUser = require("../utils/verify");
const { addChapterSchema, updateChapterSchema } = require('../validators/chapterValidator');
require('../validators/storyValidator');

//Add chapter
chapterRouter.post('/addChapter', verifyUser, validateRequest(addChapterSchema), addChapter);

//Get chapters
chapterRouter.post('/', verifyUser, getChapters);

//Update chapter
chapterRouter.put('/updateChapter', verifyUser, validateRequest(updateChapterSchema), updateChapter);

module.exports = chapterRouter
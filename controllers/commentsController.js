const { Chapter, Story, Sequelize, Like, Comment, User } = require("../models");
const createError = require("../utils/error");
const addComment = async (req, res, next) => {
  try {
    //Add a comment
    await Comment.create({
      storyId: req.body.storyId,
      chapterId: req.body.chapterId,
      userId: req.userId,
      content: req.body.content
    });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      message: "Comment added successfully!",
      payload: {},
    });
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "username", "email"],
        },
      ],
      where: {
        chapterId: req.body.chapterId,
      },
    });

    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const removeComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: { storyId: req.body.storyId, chapterId: req.body.chapterId },
    });
    if (!comment) {
      throw createError({
        statusCode: 404,
        message: "Either story or chapter doesn't exist.",
      });
    }
    await Comment.destroy({
      where: { storyId: req.body.storyId, chapterId: req.body.chapterId },
    });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      message: "Comment removed successfully!",
      payload: {},
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addComment,
  getComments,
  removeComment
};

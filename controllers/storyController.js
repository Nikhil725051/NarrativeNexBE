const { Story, Chapter, Like, Comment, Sequelize, User } = require("../models");
const createError = require("../utils/error");
const addStory = async (req, res, next) => {
  try {
    //Add a new story
    const newStory = await Story.create({
      title: req.body.title,
      description: req.body.description,
      authorId: req.userId,
    });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      storyId: newStory.id,
      title: newStory.title,
      description: newStory.description,
    });
  } catch (err) {
    next(err);
  }
};

const getAllStories = async (req, res, next) => {
  try {
    const allStories = await Story.findAll({
      attributes: [
        "id",
        "title",
        "description",
        [Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likeCount"],
        [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"],
      ],
      include: [
        {
          model: Like,
          attributes: [],
        },
        { model: Comment, attributes: [] },
      ],
      group: ["Story.id"],
    });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json(allStories);
  } catch (err) {
    next(err);
  }
};

const updateStory = async (req, res, next) => {
  try {
    const story = await Story.findOne({ where: { id: req.body.storyId } });
    if (!story) {
      throw createError({
        statusCode: 404,
        message: "Requested story doesn't exist.",
      });
    }
    const { title, description } = req.body;
    let updateFields = {};
    if (title) {
      updateFields.title = title;
    }
    if (description) {
      updateFields.description = description;
    }
    await Story.update(updateFields, { where: { id: req.body.storyId } });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      message: "story updated successfully!",
      payload: null,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStory = async (req, res, next) => {
  try {
    const story = await Story.findOne({ where: { id: req.body.storyId } });
    if (!story) {
      throw createError({
        statusCode: 404,
        message: "Story doesn't exist.",
      });
    }
    await Story.destroy({ where: { id: req.body.storyId } });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      message: "Story deleted successfully!",
      payload: null,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addStory,
  getAllStories,
  updateStory,
  deleteStory,
};

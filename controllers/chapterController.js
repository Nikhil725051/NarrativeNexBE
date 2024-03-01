const { Chapter, Story, Sequelize, Likes, User } = require("../models");
const createError = require("../utils/error");
const addChapter = async (req, res, next) => {
  try {
    //Add a new chapter
    const newChapter = await Chapter.create({
      storyId: req.body.storyId,
      contributorId: req.userId,
      chapterTitle: req.body.chapterTitle,
      content: req.body.content,
    });
    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      message: "Chapter added successfully!",
      payload: {
        chapterId: newChapter.id,
        content: newChapter.content,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getChapters = async (req, res, next) => {
  try {
    const story = await Story.findByPk(req.body.storyId);
    if (!story) {
      throw createError({
        statusCode: 404,
        message: "Requested story doesn't exist.",
      });
    }
    let chapters = await story.getChapters({
      attributes: {
        include: [
          // [
          //   Sequelize.literal(
          //     '(SELECT COUNT(*) FROM "Likes" WHERE "Likes"."chapterId" = "Chapter"."id")'
          //   ),
          //   "likesCount",
          // ],
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM "Comments" WHERE "Comments"."chapterId" = "Chapter"."id")'
            ),
            "commentsCount",
          ],
          [
            Sequelize.literal(
              '(SELECT ARRAY_AGG("userId") FROM "Likes" WHERE "Likes"."chapterId" = "Chapter"."id")'
            ),
            "likedBy",
          ],
        ],
      },
      include: [
        {
          model: User,
          attributes: ['name', 'username'],
        },
      ],
    });
    chapters = chapters.map(chapter => chapter.get({ plain: true }));
    chapters = chapters.map(chapter => ({
      ...chapter,
      likedBy: chapter.likedBy || [], // If likedBy is null, set it to an empty array
    }));

    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      story: story,
      chapters: chapters,
    });
  } catch (err) {
    next(err);
  }
};

const updateChapter = async (req, res, next) => {
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

module.exports = {
  addChapter,
  updateChapter,
  getChapters,
};

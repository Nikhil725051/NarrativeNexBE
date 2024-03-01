const { Chapter, Story, Sequelize, Like } = require("../models");
const createError = require("../utils/error");
const addOrRemoveLike = async (req, res, next) => {
  try {
    //Check if the user has already liked
    var message = "";
    const userLike = await Like.findOne({
      where: {
        userId: req.userId,
        chapterId: req.body.chapterId,
      },
    });
    //If user has already liked the chapter then remove the like else add the like
    if (userLike) {
      await Like.destroy({
        where: {
          userId: req.userId,
          chapterId: req.body.chapterId,
        },
      });
      message = "Like removed successfully!";
    } else {
      //Add a like
      await Like.create({
        storyId: req.body.storyId,
        chapterId: req.body.chapterId,
        userId: req.userId,
      });
      message = "Like added successfully!";
    }

    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json({
      message: message,
      payload: {},
    });
  } catch (err) {
    next(err);
  }
};

const getLikes = async (req, res, next) => {
  try {
    const likes = Like.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });

    //Send the response
    res.status(200).setHeader("Content-Type", "application/json");
    res.json(likes);
  } catch (err) {
    next(err);
  }
};

// const removeLike = async (req, res, next) => {
//   try {
//     const like = await Like.findOne({
//       where: { storyId: req.params.storyId, chapterId: req.params.chapterId },
//     });
//     if (!like) {
//       throw createError({
//         statusCode: 404,
//         message: "Either story or chapter doesn't exist.",
//       });
//     }
//     await Like.destroy({
//       where: { storyId: req.params.storyId, chapterId: req.params.chapterId },
//     });
//     //Send the response
//     res.status(200).setHeader("Content-Type", "application/json");
//     res.json({
//       message: "Like removed successfully!",
//       payload: {},
//     });
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  addOrRemoveLike,
  getLikes,
  // removeLike,
};

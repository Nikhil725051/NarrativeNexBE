"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chapter.belongsTo(models.Story, {
        foreignKey: "storyId",
        onDelete: "CASCADE",
        allowNull: false,
      });
      Chapter.belongsTo(models.User, {
        foreignKey: "contributorId",
      });
      Chapter.hasMany(models.Like, {
        foreignKey: "chapterId",
        allowNull: false,
      });
      Chapter.hasMany(models.Comment, {
        foreignKey: "chapterId",
        allowNull: false,
      });
      Chapter.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: "chapterId",
        otherKey: "userId",
      });
      Chapter.belongsToMany(models.Story, {
        through: models.Like,
        foreignKey: "chapterId",
        otherKey: "storyId",
      });
      Chapter.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: "chapterId",
        otherKey: "userId",
      });
      Chapter.belongsToMany(models.Story, {
        through: models.Comment,
        foreignKey: "chapterId",
        otherKey: "userId",
      });
    }
  }
  Chapter.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      chapterTitle: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Chapter",
    }
  );
  return Chapter;
};

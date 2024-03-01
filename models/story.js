"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.belongsTo(models.User, { foreignKey: "authorId" });
      Story.hasMany(models.Chapter, {
        foreignKey: "storyId",
        onDelete: "CASCADE",
        allowNull: false,
      });
      Story.hasMany(models.Like, {
        foreignKey: "storyId",
        allowNull: false,
      });
      Story.hasMany(models.Comment, {
        foreignKey: "storyId",
        allowNull: false,
      });
      Story.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: "storyId",
        otherKey: "userId",
      });
      Story.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: "storyId",
        otherKey: "userId",
      });
      Story.belongsToMany(models.User, {
        through: models.Chapter,
        foreignKey: "storyId",
        otherKey: "contributorId",
      });
    }
  }
  Story.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "Story",
    }
  );
  return Story;
};

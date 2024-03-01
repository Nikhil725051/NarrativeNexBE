"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Story, { foreignKey: "authorId" });
      User.hasMany(models.Chapter, {
        foreignKey: "contributorId",
      });
      User.hasMany(models.Like, {
        foreignKey: "userId",
        allowNull: false,
      });
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        allowNull: false,
      });
      User.belongsToMany(models.Story, {
        through: models.Like,
        foreignKey: "userId",
        otherKey: "storyId",
      });
      User.belongsToMany(models.Story, {
        through: models.Comment,
        foreignKey: "userId",
        otherKey: "storyId",
      });
      User.belongsToMany(models.Chapter, {
        through: models.Like,
        foreignKey: "userId",
        otherKey: "chapterId",
      });
      User.belongsToMany(models.Chapter, {
        through: models.Comment,
        foreignKey: "userId",
        otherKey: "chapterId",
      });
      User.belongsToMany(models.Story, {
        through: models.Chapter,
        foreignKey: "contributorId",
        otherKey: "storyId",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

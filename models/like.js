"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Story, {
        foreignKey: "storyId",
        allowNull: false,
      });
      Like.belongsTo(models.Chapter, {
        foreignKey: "chapterId",
        allowNull: false,
      });
      Like.belongsTo(models.User, {
        foreignKey: "userId",
        allowNull: false,
      });
    }
  }
  Like.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};

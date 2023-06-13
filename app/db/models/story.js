'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.belongsTo(models.user, {
        foreignKey: 'userId',
      });
      Story.belongsTo(models.gunung, {
        foreignKey: 'gunungId',
      });
    }
  }
  Story.init(
    {
      userId: DataTypes.INTEGER,
      caption: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      gunungId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'story',
    }
  );
  return Story;
};

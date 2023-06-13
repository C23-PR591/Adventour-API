'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feedback.belongsTo(models.gunung, {
        foreignKey: 'gunungId',
      });
      Feedback.belongsTo(models.user, {
        foreignKey: 'userId',
      });
    }
  }
  Feedback.init(
    {
      userId: DataTypes.INTEGER,
      gunungId: DataTypes.INTEGER,
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          min: 1,
          max: 5,
        },
      },
      review: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'feedback',
    }
  );
  return Feedback;
};

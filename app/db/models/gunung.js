'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gunung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gunung.init(
    {
      daerah: DataTypes.STRING,
      nama: DataTypes.STRING,
      ketinggian: DataTypes.INTEGER,
      lokasi: DataTypes.STRING,
      trek: DataTypes.STRING,
      jalur: DataTypes.STRING,
      simaksi: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      rating: DataTypes.FLOAT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'gunung',
    }
  );
  return Gunung;
};

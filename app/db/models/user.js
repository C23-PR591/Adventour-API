'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      nama: DataTypes.STRING,
      jenisKelamin: DataTypes.ENUM(['Laki-Laki', 'Perempuan']),
      umur: DataTypes.INTEGER,
      domisili: DataTypes.STRING,
      pengalaman: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return User;
};

'use strict';

const moment = require('moment');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  History.init({
    userId: DataTypes.INTEGER,
    data: {
      type: DataTypes.TEXT,
      get(value) {
        return JSON.parse(this.getDataValue(value));
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      get(value) {
        return moment(this.getDataValue(value)).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
'use strict';
require('dotenv').config();

const counterbookSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('bookscounteer', {
    idbook: {type: DataTypes.INTEGER, required: true, unique: true },
    counter: { type: DataTypes.INTEGER, required: true}
  });
  return model;
}

module.exports = counterbookSchema;
'use strict';
require('dotenv').config();


const superSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('roomschema1', {
    classroom:{type: DataTypes.STRING, allowNull: true , unique: true},

  });
  return model;
}

module.exports = superSchema;
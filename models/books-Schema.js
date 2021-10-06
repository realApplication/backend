
'use strict';
require('dotenv').config();


const bookSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('boook', {
    title: { type: DataTypes.STRING, allowNull: false},
    author: { type: DataTypes.STRING, allowNull: false},
    image:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.STRING, allowNull: false},
 
  });
  return model;
}

module.exports = bookSchema;
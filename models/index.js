'use strict';
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const bookSchema = require('./books-Schema');
const pickedSchema = require('./picked-Schema');
const counterSchemaa = require('./counter-Schema')
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/samah-abujwaied'

let sequelize = new Sequelize(DATABASE_URL,);
const userModel = require('./student-Schema')
const supervisorMOdelTest = require('./supervisor-Schema')
const superModel = require('./room-Schema')

const bookSchemas =bookSchema(sequelize, DataTypes)
const userModels=userModel(sequelize, DataTypes)
const pickedSchemas=pickedSchema(sequelize, DataTypes)
const counterSchemas=counterSchemaa(sequelize, DataTypes)
const superSchemas = superModel(sequelize, DataTypes)
//const supervisor=supervisorMOdel(sequelize,DataTypes)

// userModels.hasMany(bookSchemas, { foreignKey: 'customerId', sourceKey: 'id'});
// bookSchemas.belongsTo(userModels, { foreignKey: 'customerId', targetKey: 'id'});

// userModels.hasMany(pickedSchemas, { foreignKey: 'userId', sourceKey: 'id'});
// pickedSchemas.belongsTo(userModels, { foreignKey: 'userId', targetKey: 'id'});


module.exports = {
    db: sequelize,
    students: userModels,
    supervisorTest : supervisorMOdelTest(sequelize,DataTypes),
    books: bookSchemas,
    pickedSchema: pickedSchemas,
    counterSchema:counterSchemas,
    superSchema:superSchemas
};








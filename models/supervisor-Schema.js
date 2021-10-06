'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('supertest', {
    email: { type: DataTypes.STRING, required: true, unique: true ,validate: { isEmail: true} },
    userName: { type: DataTypes.STRING, required: true },
    password: { type: DataTypes.STRING, required: true },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });
  model.authenticateBasic = async function (username, password) {
    console.log("username , password // supervisor schema" , username , password)
    const user = await this.findOne({ where: { email:username } });
    console.log("password , user.paswword / supervisor schema",password , user.password )
    const valid = await bcrypt.compare(password, user.password);
  
    if (valid) { return user; }
    throw new Error('Invalid User>>>>');
  };

  return model;
}

module.exports =userModel;

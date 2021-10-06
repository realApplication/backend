'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('signup', {
    email: { type: DataTypes.STRING, required: true, unique: true ,validate: {  isEmail: true} },
    userName: { type: DataTypes.STRING, required: true },
    password: { type: DataTypes.STRING, required: true },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ email: this.email }, SECRET);
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
  model.authenticateBasic = async function (email, password) {
    const user = await this.findOne({ where: { email:email } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      console.log("_______>",parsedToken);
      console.log("--------------->",parsedToken.email);
      const user = this.findOne({where: { email: parsedToken.email } });
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };



  return model;
}

module.exports =userModel;

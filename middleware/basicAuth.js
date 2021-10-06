'use strict';

const base64 = require('base-64')


module.exports = (UserSchema) => (req, res, next) => {
     console.log("req.headers['authorization']",req.headers['authorization']);
    if (!req.headers['authorization']) {
        next('No Authorization info');
        return;
    }

    let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', encoded(username:password)]
    console.log("HEADERS--------------->" , basicHeaderParts)
    let encoded = basicHeaderParts.pop();
    let decoded = base64.decode(encoded); // username:password
    let [email, password] = decoded.split(":"); // rawan test@1234
   
    // is this user ok?
    console.log("[email,password]//basic Auth" , email , password)
    UserSchema.authenticateBasic(email, password).then(validUser=> {
        req.user = validUser;
        next();
    }).catch(err=> next('invalid users'));
}
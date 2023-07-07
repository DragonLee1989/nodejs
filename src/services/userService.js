import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLoginService = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmailService(email);
      if (isExist) {
        // check again user already exist
        let user = await db.User.findOne({
          where: { email: email }, // kiem tra emailUser == email o DB ko?
          attributes: ["email", "password", "roleid"],
          raw: true,
        });
        if (user) {
          // compare password su dung https://www.npmjs.com/package/bcryptjs
          // bcrypt.compareSync("B4c0/\/", hash); // true
          let checkPass = await bcrypt.compareSync(password, user.password);
          if (checkPass) {
            userData.errCode = 0;
            userData.errMessage = "Password OK";
            console.log("handleUserLoginService: ", user);
            delete user.password;
            userData.user = user;
          } else {
            // return error
            userData.errCode = 3;
            userData.errMessage = "Your Password wrong!";
          }
        } else {
          // return error
          userData.errCode = 2;
          userData.errMessage = "Your User isnt exist in systems";
        }
      } else {
        // return error
        userData.errCode = 1;
        userData.errMessage = "Your Email isnt exist in systems";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

// check email of user trong DB co ton tai ko?
let checkUserEmailService = (emailUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: emailUser }, // kiem tra emailUser == email o DB ko?
      });
      if (user) {
        // user # undefine
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId == "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
          // raw: only display user array
          // raw: true,
        });
      }
      if (userId && userId != "ALL") {
        users = await db.User.findOne({
          where: { id: userId }, // kiem tra emailUser == email o DB ko?
          attributes: {
            exclude: ["password"],
          },
          // raw: true,
        });
      }
      // console.log(users);
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLoginService: handleUserLoginService,
  getAllUsers: getAllUsers,
};

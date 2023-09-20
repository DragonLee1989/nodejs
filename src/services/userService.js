import db from "../models/index";
import bcrypt from "bcryptjs";

// ham hash password
const salt = bcrypt.genSaltSync(10);

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

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email da ton tai hay chua?
      let checkEmail = await checkUserEmailService(data.email);
      if (checkEmail) {
        resolve({
          errCode: 1,
          errMessage: "Email User on API da ton tai. Su dung Email khac!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          gender: data.gender == "1" ? true : false,
          roleid: data.roleid,
          phoneNumber: data.phoneNumber,
        });
        resolve({
          errCode: 0,
          errMessage: "Created New User on API",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

// hashUserPassword: ma hoa "password" cua User truoc khi => DB
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Delete User Info API voi id = " + userId);
      let user = await db.User.findOne({
        where: { id: userId },
      });
      console.log(user);
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "Dont Exist User on Delete API",
        }); // thoat ra ko tra ket qua <=> ham return
      }

      // TypeError: user.destroy is not a function
      // xoa "query": {"raw": true}, trong file config.json thi het loi tren
      // nguyen nhan do "user" => ep kieu "raw" ve kieu object
      // await user.destroy(); => chi hieu kieu CLI khac kieu object
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "Deleted User on API",
      }); // thoat ra ko tra ket qua <=> ham return
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Update User Info API voi id = " + data.id);
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Dang nhap ID User on Edit API",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Updated User on API",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Khong co User on Edit API",
        });
      }
    } catch (error) {
      reject("Loi updateUserData on Edit API: " + reject);
    }
  });
};

module.exports = {
  handleUserLoginService: handleUserLoginService,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
};

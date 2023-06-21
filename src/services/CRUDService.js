import bcrypt from "bcryptjs";
import db from "../models/index";
// ham hash password
const salt = bcrypt.genSaltSync(10);

// createNewUser
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve("Created a new User");
    } catch (error) {
      reject(error);
    }
  });

  // console.log("CLIENT => CONTROLLER => SERVICE: ");
  // console.log(data);
  // console.log(hashPasswordFromBcrypt);
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

// getAllUser
let getAllUser = async () => {
  // Promise: ham xu ly bat dong bo
  // resolve <=> return
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        // raw: only display user array
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(reject);
    }
  });
};

let getUserInfoById = (userId) => {
  // Promise: ham xu ly bat dong bo
  // resolve <=> return
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        console.log("User found by Id = " + userId);
        resolve(user);
      } else {
        console.log("User not found by Id = " + userId);
      }
    } catch (error) {
      reject(reject);
    }
  });
};

let updateUserData = (data) => {
  // Promise: ham xu ly bat dong bo
  // resolve <=> return
  return new Promise(async (resolve, reject) => {
    try {
      console.log("User can Update Info voi id = " + data.id);
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        await user.save();

        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve();
      }
    } catch (error) {
      reject("Loi updateUserData: " + reject);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("User can Delete Info voi id = " + userId);
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        resolve(); // thoat ra ko tra ket qua <=> ham return
      } else {
        resolve(); // thoat ra ko tra ket qua
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};

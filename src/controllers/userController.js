import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  // check email exist
  // compare password
  // return infoUser

  // !email: kiem tra "email" co null, empty => "", undefined
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing login parameter!",
    });
  }
  let userData = await userService.handleUserLoginService(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    infoUser: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  // id = "ALL" or id
  let id = req.query.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Vui long nhap ID ",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users: users,
  });
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
};

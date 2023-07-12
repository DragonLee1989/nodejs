import db from "../models/index";
import userService from "../services/userService";

let handleLogin = async (req, res) => {
  // su dung "body" de lay tat ca thong tin Client post len Server
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
  // su dung "query" de lay tham so "params" theo url: id = "ALL" or id
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

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  // console.log(message);
  return res.status(200).json({ message });
};
let handleDeleteUser = async (req, res) => {
  let id = req.body.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Vui long nhap ID ",
    });
  }
  let message = await userService.deleteUser(id);
  // console.log(message);
  return res.status(200).json({ message });
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let user = await userService.updateUserData(data);
  return res.status(200).json(user);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
};

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

module.exports = {
  handleLogin: handleLogin,
};

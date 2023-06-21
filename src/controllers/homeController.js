import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log(data);

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("./crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  // console.log(message);
  return res.send("POST CRUD");
};

let findAllCRUD = async (req, res) => {
  let users = await CRUDService.getAllUser();
  // console.log(users);
  return res.render("./showCRUD.ejs", {
    usersTable: users,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    console.log(userData);
    return res.render("./editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not Found!");
  }

  // console.log(req.query.id);
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("./showCRUD.ejs", {
    usersTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  console.log("DELETE USER with ID = " + id);
  if (id) {
    await CRUDService.deleteUserById(id);
    return res.send("User Deleted with ID = " + id);
  } else {
    return res.send("User not Found!");
  }
};
// object: {
//  key: '',
//  value: ''
// }
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  findAllCRUD: findAllCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};

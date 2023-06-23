import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

// to run process.env
require("dotenv").config();

let app = express();

// "cors": only run api theo domain
app.use(cors({ origin: true }));

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
// server vao tat ca route
initWebRouters(app);

// connect to database mysql
connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
  // callback
  console.log("Backend Nodejs: " + port);
});

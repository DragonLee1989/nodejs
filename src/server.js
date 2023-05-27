import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRouters from "./route/web"

// to run process.env
require('dotenv').config(); 

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);

// server vao tat ca route
initWebRouters(app);

let port = process.env.PORT;

app.listen(port, () => {
    // callback
    console.log("Backend Nodejs: " + port);
})
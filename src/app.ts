import express, { NextFunction, Router } from "express";
const app = express();

import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectDB from "./utils/connectDatabase";
import * as pageRouter from "./manager/pageRouter";
import logger from "./utils/logger";
import apiRouter from "./manager/apiRouter";
import accountRouter from "./manager/accountRouter";

import cookieParser from "cookie-parser"


import checkAuth from './manager/checkAuth'

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());

app.get("/", pageRouter.loginPage);
app.get("/login", pageRouter.loginPage);
app.get("/calendar", checkAuth, pageRouter.calendarPage);
app.get("/list", checkAuth, pageRouter.listPage);
app.get("/note", checkAuth, pageRouter.notePage);
app.get("/pomodoro", checkAuth, pageRouter.pomodoroPage);
app.get("/planner", checkAuth, pageRouter.plannerPage);

app.use("/account/", accountRouter);

app.use("/api/", apiRouter);

app.get("*", pageRouter.error404);

app.listen(3000, async () => {
  await connectDB();
  logger.info("Project Running");
});

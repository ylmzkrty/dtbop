import { NextFunction, Request, Response } from "express";
import { listNote } from "../database/note.models";

export const loginPage = async (req: Request, res: Response) => {
  let alert = null;

  if (req.query.error) {
    alert = `Hata: ${req.query.message}`;
  }

  res.render("login", { alert });
};

export const calendarPage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("calendar", {});
};

export const listPage = async (req: Request, res: Response) => {
  res.render("list", {});
};

export const notePage = async (req: Request, res: Response) => {
  const note = await listNote()
  res.render("note", { note });
};

export const plannerPage = async (req: Request, res: Response) => {
  res.render("planner", {});
};
export const pomodoroPage = async (req: Request, res: Response) => {
  res.render("pomodoro", {});
};

export const error404 = async (req: Request, res: Response) => {
  res.status(404).send('Page Not Found. <a href="/">Return Home Page</a>');
};

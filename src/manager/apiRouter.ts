import { Request, Response, Router } from "express";
import { createNote, deleteNote, listNote } from "../database/note.models";
import { createPlan, listPlan, deleteAllPlan } from "../database/planner.models";
import {
  createTask,
  deleteTask,
  listTask,
  deleteAllTask,
} from "../database/task.models";
const router = Router();

router
  .route("/task")
  .delete(async (req: Request, res: Response) => {
    const { index, all } = req.body;
    if (all) {
      res.status(200).end();
      return deleteAllTask();
    }

    const list = await (await listTask()).splice(index, 1);
    if (list.length < 1) return res.status(201);
    deleteTask(list[0].task);
    res.status(200).end();
  })
  .get(async (req: Request, res: Response) => {
    const data = await listTask();
    return res.status(200).end(JSON.stringify(data));
  })
  .post((req: Request, res: Response) => {
    const { task, type } = req.body;
    if(!task) return;
    createTask(task);
    return res.status(200);
  });

router
  .route("/note")
  .delete(async (req: Request, res: Response) => {
    const { id } = req.body;
    await deleteNote(id);
    res.status(200).redirect('/note')
  })
  .get(async (req: Request, res: Response) => {
    const data = await listNote();
    return res.status(200).end(JSON.stringify(data));
  })
  .post((req: Request, res: Response) => {
    const body = req.body;
    createNote(body);
    res.status(200).redirect('/note');
    
  });

  router
  .route("/planner")
  .delete(async (req: Request, res: Response) => {
   deleteAllPlan()
  })
  .get(async (req: Request, res: Response) => {
    const data = await listPlan();
    return res.status(200).end(JSON.stringify(data));
  })
  .post((req: Request, res: Response) => {
    const body = req.body;
    createPlan(body);
    res.status(200).redirect('/note');
    
  });

export default router;

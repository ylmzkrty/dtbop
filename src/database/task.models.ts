import mongoose from "mongoose";

export interface textDocument extends mongoose.Document {
  task: string;
  addedDate: Date;
}

const accountSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },

  addedDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const taskModel = mongoose.model<textDocument>("Task", accountSchema);

export default taskModel;

const createTask = async (task: string) => {
  const doc = new taskModel({
    task: task,
    addedDate: new Date(),
  });
  doc.save();

  return doc;
};

const listTask = async () => {
  const taskList = await taskModel.find({});
  return taskList;
};

const deleteTask = async (task: string) => {
  return taskModel
    .deleteOne({ task: task })
    .catch((e) => console.log(`Error: ${e}`));
};

const deleteAllTask = async () => {
  return taskModel.deleteMany({}).catch((e) => console.log(`Error: ${e}`));
};

export { createTask, listTask, deleteTask, deleteAllTask };

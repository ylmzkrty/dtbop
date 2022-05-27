import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  updated: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const noteModel = mongoose.model("Note", accountSchema);

export default noteModel;

const createNote = async (data: any) => {
  
  const doc = new noteModel({
    title: data.title,
    body: data.textarea,
    id: Date.now(),
    updated: new Date(),
  });
  doc.save();

  return doc;
};

const listNote = async () => {
  const noteList = await noteModel.find({});
  return noteList;
};

const deleteNote = async (id: string) => {
  return noteModel
    .deleteOne({ id: id })
    .catch((e) => console.log(`Error: ${e}`));
};

export { createNote, listNote, deleteNote };

import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

const plannerModel = mongoose.model("Planner", accountSchema);

export default plannerModel;

const createPlan = async (data: any) => {
  const doc = new plannerModel({
    id: data.id,
    color: data.color,
    icon: data.icon
  });
  doc.save();

  return doc;
};

const listPlan = async () => {
  const planList = await plannerModel.find({});
  return planList;
};

const deleteAllPlan = async () => {
  return plannerModel
    .deleteMany({})
    .catch((e) => console.log(`Error: ${e}`));
};

export { createPlan, listPlan, deleteAllPlan };

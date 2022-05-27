import mongoose from "mongoose";
import log from "./logger";

function connectDB() {
  return mongoose
    .connect(process.env.MONGODB_URI as string, {})
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}

export default connectDB;


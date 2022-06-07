import mongoose, { Schema } from "mongoose";
import DateService from "../helpers/DateService";

const Feedback = Schema({
  content: { type: String, maxLength: 500, required: true },
  updatedTime: { type: Number, default: DateService.now() },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model("Feedback", Feedback);

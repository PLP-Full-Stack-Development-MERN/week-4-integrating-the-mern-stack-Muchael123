import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  dueDate: { type: Date },
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;

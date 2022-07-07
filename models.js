import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

const exercisesSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Exercises = model("exercises", exercisesSchema);

export const User = model("user", userSchema);

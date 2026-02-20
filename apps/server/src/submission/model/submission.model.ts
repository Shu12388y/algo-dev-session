import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: "question",
  },
  status:{
    type:String,
    default:'QUEUED'
  },
  source_code:{
    type:String,
  },
  language:{
    type:String,
  },
  stdOutput: {
    type: String,
  },
  stdErr: {
    type: String,
  },
  exceptedOutput: {
    type: String,
  },
});

export const Submission =
  mongoose.models.submission || mongoose.model("submission", submissionSchema);

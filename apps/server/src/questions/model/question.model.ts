import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  input_test_case: {
    type: String,
    required: true,
  },
  input_test_expected_output_case: {
    type: String,
    required: true,
  },
  input_case: {
    type: String,
    required: true,
  },
  output_case: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

export const Questions =
  mongoose.models.question || mongoose.model("question", questionSchema);

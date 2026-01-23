import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["SUPERADMIN", "ADMIN", "MODERATOR"],
      default: "SUPERADMIN",
    },
  },
  { timestamps: true },
);

export const admin =
  mongoose.models.admin || mongoose.model("Admin", adminSchema);

import express from "express";
import { execute_code, generateFile } from "./execute.js";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from code judge" });
});

app.post("/run", async (req, res) => {
  try {
    const { language, code } = req.body;
    const code_path = generateFile({
      language: parseInt(language),
      code,
    });

    if (code_path.jobID == null) {
      return;
    }
    const execute_output_info = await execute_code({
      filepath: code_path.file_path,
      jobid: code_path.jobID,
    });

    res.status(200).json({ message: "submitted", data: execute_output_info });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3030, () => {
  console.log("Code judge is on");
});

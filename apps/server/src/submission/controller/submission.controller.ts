import { Request, Response } from "express";
import { Queues } from "@repo/queues/queues";
import { ENV } from "@/src/utils/env.js";
import { SubmissionRepositary } from "../repo/submission.repository.js";

export class SubmissionController extends SubmissionRepositary {
  public async run(req: Request, res: Response) {
    try {
      const data = await req.body;
      const { source_code, language, questionid } = data;
      if (!source_code || !language || !questionid) {
        res
          .status(402)
          .json({ message: "Source code and language is required" });
        return;
      }

      const supported_language = ["python", "c", "cpp", "java", "javascript"];
      if (!supported_language.includes(language)) {
        res.status(404).json({ message: "langauge not supported" });
        return;
      }
      const queue = Queues("language-queue", ENV.REDIS!);
      const submission = {
        source_code,
        language,
        questionId: questionid,
      };
      const info = await this.createSubmission(submission);
      switch (language) {
        case "c":
          queue.add("c-route", {
            source_code,
            language,
            questionid,
          });
          break;
        case "cpp":
          queue.add("cpp-route", {
            source_code,
            language,
            questionid,
          });
          break;
        case "javascript":
          queue.add("js-route", {
            source_code,
            language,
            questionid,
          });
          break;

        case "java":
          queue.add("java-route", {
            source_code,
            language,
            questionid,
          });
          break;

        case "python":
          queue.add("python-route", {
            source_code,
            language,
            questionid,
          });
          break;
        default:
          break;
      }

      res.status(200).json({ message: "success", data: info.data });
      return;
    } catch (error) {
      res.status(500).json({ message: String(error) });
      return;
    }
  }

  public async submit(req: Request, res: Response) {
    try {
      const data = await req.body;
      const { source_code, language, questionid } = data;
      if (!source_code || !language || !questionid) {
        res
          .status(402)
          .json({ message: "Source code and language is required" });
        return;
      }

      const supported_language = ["python", "c", "cpp", "java", "javascript"];
      if (!supported_language.includes(language)) {
        res.status(404).json({ message: "langauge not supported" });
        return;
      }
      const queue = Queues("language-queue", ENV.REDIS!);
      const submission = {
        source_code,
        language,
        questionId: questionid,
      };
      const info = await this.createSubmission(submission);
      switch (language) {
        case "c":
          queue.add("c-route", {
            source_code,
            language,
            questionid,
          });
          break;
        case "cpp":
          queue.add("cpp-route", {
            source_code,
            language,
            questionid,
          });
          break;
        case "javascript":
          queue.add("js-route", {
            source_code,
            language,
            questionid,
          });
          break;

        case "java":
          queue.add("java-route", {
            source_code,
            language,
            questionid,
          });
          break;

        case "python":
          queue.add("python-route", {
            source_code,
            language,
            questionid,
          });
          break;
        default:
          break;
      }

      res.status(200).json({ message: "success", data: info.data });
      return;
    } catch (error) {
      res.status(500).json({ message: String(error) });
      return;
    }
  }

  public async webhook(req: Request, res: Response) {
    try {
      const data = await req.body;
      const { stdOutput, stdErr, exceptedOutput, submissionid } = data;
      await this.updateSubmission(submissionid, {
        stdOutput,
        stdErr,
        exceptedOutput,
      });
      res.status(200).json({ message: "success" });
      return;
    } catch (error) {
      res.status(500).json({ message: String(error) });
      return;
    }
  }
}

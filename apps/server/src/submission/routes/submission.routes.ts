import { Router } from "express";
import { SubmissionController } from "../controller/submission.controller.js";
import {
  check_secret_token,
  protected_route,
} from "../../middlewares/middleware.js";
export const submissionRouter: Router = Router();

const submissionController = new SubmissionController();

submissionRouter.post("/run", protected_route, submissionController.run);
submissionRouter.post("/submit", submissionController.submit);
submissionRouter.post("/webhook", submissionController.webhook);
submissionRouter.get("/submission/:id", submissionController.submission);

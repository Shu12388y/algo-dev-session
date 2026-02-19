import { Router } from "express";
import { SubmissionController } from "../controller/submission.controller.js";
import { check_secret_token } from "../../middlewares/middleware.js";
import { verify_JWT_token } from "../../utils/jwt-helper.js";
export const submissionRouter: Router = Router();

const submissionController = new SubmissionController();

submissionRouter.post("/run", submissionController.run);
submissionRouter.post("/submit", verify_JWT_token, submissionController.submit);
submissionRouter.post(
  "/webhook",
  check_secret_token,
  submissionController.webhook,
);

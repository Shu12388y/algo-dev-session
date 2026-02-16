import { Router } from "express";
import { SubmissionController } from "../controller/submission.controller.js";
export const submissionRouter:Router =  Router();


const submissionController = new SubmissionController();

submissionRouter.post("/run",submissionController.run);
submissionRouter.post("/run",submissionController.submit);
submissionRouter.post("/webhook",submissionController.webhook);


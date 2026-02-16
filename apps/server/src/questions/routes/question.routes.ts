import { Router } from "express";
import { QuestionController } from "../controller/question.controller.js";

export const questionRouter: Router = Router();

const questionController = new QuestionController();

questionRouter.post("/question", questionController.CreateQuestion);
questionRouter.get("/questions", questionController.getQuestions);
questionRouter.get("/question/:id", questionController.getQuestion);

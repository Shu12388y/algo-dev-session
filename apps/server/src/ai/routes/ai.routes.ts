import { Router } from "express";
import {AIController} from "../controller/ai.controller.js"


export const aiRouter:Router = Router();
const aiController = new AIController();
aiRouter.get('/generatequestion',aiController.generateQuestion);
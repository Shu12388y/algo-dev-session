import { QuestionReposistory } from "../repo/question.repo.js";
import { question_validator } from "../validator/question.validator.js";
import { Response, Request } from "express";


const questionRepo = new QuestionReposistory();
export class QuestionController {
  public async CreateQuestion(req: Request, res: Response) {
    try {
      const data = req.body;
      const validate = question_validator.safeParse(data);
      if (validate.error) {
        res.status(401).json({ message: validate.error.message });
        return;
      }
      const info = await questionRepo.createQuestion(validate.data);
      res.status(201).json({ message: info.message });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: String(error) });
      return;
    }
  }

  public async getQuestions(req: Request, res: Response) {
    try {
      const info = await questionRepo.Questions();
      res.status(200).json({ message: info.message, data: info.data });
      return;
    } catch (error) {
      res.status(500).json({ message: String(error) });
      return;
    }
  }

  public async getQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const info = await questionRepo.Question(id as string);
      res.status(200).json({ message: info.message, data: info.data });
      return;
    } catch (error) {
      res.status(500).json({ message: String(error) });
      return;
    }
  }
}

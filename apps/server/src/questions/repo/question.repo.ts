import { Questions } from "../model/question.model.js";

export class QuestionReposistory {
  /**
   * Questions
   */
  public async Questions() {
    try {
      const info = await Questions.find().sort({
        createdAt: -1,
      });
      return {
        data: info,
        message: "success",
        status: 1,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  /**
   * Question
   */
  public async Question(title: string) {
    try {
      const info = await Questions.findOne({
        // @ts-ignore
        title: title,
      });
      if (!info) {
        return {
          data: null,
          message: "Not Found",
          status: -1,
        };
      }
      return {
        data: info,
        message: "success",
        status: 1,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async createQuestion(obj: any) {
    try {
      await Questions.create(obj);
      return {
        data: null,
        message: "created",
        status: 1,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}

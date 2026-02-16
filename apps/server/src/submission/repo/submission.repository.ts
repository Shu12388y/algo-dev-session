import { Submission } from "../model/submission.model.js";

export class SubmissionRepositary {
  /**
   * createSubmission
   */
  public async createSubmission(obj: any) {
    try {
      const submission = await Submission.create(obj);
      return {
        status: 1,
        message: "success",
        // @ts-ignore
        data: submission._id || "",
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async getSubmission(id: string) {
    try {
      // @ts-ignore
      const info = await Submission.findById(id);
      return {
        data: info,
        message: "success",
        status: -1,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async updateSubmission(id: string, obj: any) {
    try {
      // @ts-ignore
      const info = await Submission.findByIdAndUpdate(id, {
        stdOutput: obj.stdOutput,
        stdErr: obj.stdErr,
        exceptedOutput: obj.exceptedOutput,
      });
      return {
        data: info,
        message: "success",
        status: -1,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}

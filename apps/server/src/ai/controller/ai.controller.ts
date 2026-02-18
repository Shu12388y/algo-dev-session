import { GoogleGenAI } from "@google/genai";
import { Response, Request } from "express";
import { ENV } from "@/src/utils/env.js";

export class AIController {

  /**
   * generateQuestion
   */
  public async generateQuestion(req: Request, res: Response) {
    try {
       
      const ai = new GoogleGenAI({
        apiKey: ENV.GEMINI,
      });
      const response = await ai.models.generateContent({
        contents: `Give me one data structure and algo question.
            The response should be in this format
            {
                title:"TWO SUM"
                content:"## In this question you have to find two numbers where 
                sum of two number is k.
                ## Input:
                    - n number of test case
                    - k target number
                    - arr list of array

                ## output:
                    - n =1
                    - k = 7
                    - arr = [2,4,5,6,7,3]
                    return [0,2]"
            }
        `,
        model: "gemini-2.0-flash",
      });

      res.status(200).json({ message: response.text });
      return;
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: String(error) });
      return;
    }
  }
}

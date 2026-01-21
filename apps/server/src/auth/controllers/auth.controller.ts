import { authValidator } from "../validator/auth.validator.js";
import { Request, Response } from "express";
import { AuthRepository } from "../repo/auth.repo.js";
export class AuthController extends AuthRepository {
  public async signup(req: Request, res: Response) {
    try {
      const { firstname, lastname, email, password } = req.body;
      if (!firstname || !email || !password) {
        res
          .status(401)
          .json({ message: "Firstname, email, password is required" });
      }
      const userInfo = authValidator.safeParse({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password,
      });
      if (userInfo.error) {
        res.status(401).json({ message: userInfo.error.message });
      }
      const user = await this.signupUser(userInfo.data);
      res.status(201).json({ message: user.data });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

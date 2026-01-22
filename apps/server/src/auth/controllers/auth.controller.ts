import { authValidator } from "../validator/auth.validator.js";
import { AuthRepository } from "../repo/auth.repo.js";
export class AuthController{
  public async signup({
    firstname,
    lastname,
    email,
    password,
  }: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    try {
      if (!firstname || !email || !password) {
        return {
          status: 401,
          message: "Firstname, email, password is required",
          data: "",
        };
      }
      const userInfo = authValidator.safeParse({
        email: email,
        firstname: firstname,
        lastname: lastname || "",
        password: password,
      });
      if (userInfo.error) {
        return {
          status: 401,
          message: userInfo.error.message,
          data: "",
        };
      }
      const user = await new AuthRepository().signupUser(userInfo.data);
      return {
        status: user.status,
        message: user.message,
        data: user.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: "",
      };
    }
  }
}

import {
  authValidator,
  signinAuthValidator,
} from "../validator/auth.validator.js";
import { AuthRepository } from "../repo/auth.repo.js";
import jwt from "jsonwebtoken";
export class AuthController extends AuthRepository {
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
      const user = await this.signupUser(userInfo.data);
      return {
        status: user.status,
        message: user.message,
        data: user.data,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }

  public async signin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      if (!email || !password) {
        return {
          status: 401,
          message: "Email and password required",
          data: null,
        };
      }

      const validator = signinAuthValidator.safeParse({
        email,
        password,
      });

      if (validator.error) {
        return {
          status: 401,
          message: validator.error.message,
          data: null,
        };
      }

      const user = await this.signInUser(validator.data);

      if (user.status === -1) {
        return {
          status: 401,
          message: user.message,
          data: null,
        };
      }
      const payload = {
        _id :user.data._id
      }
      const token = jwt.sign(payload, "secret", {
        expiresIn: "24h",
      });

      if (!token) {
        return {
          status: 401,
          message: "Failed to generate token",
          data: null,
        };
      }
      return {
        status: 200,
        message: "success",
        data: token,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }

  public async forgetPasswordSendEmailToken({ email }: { email: string }) {
    try {
      const is_user_exists = await this.isUserExist(email);
      if (is_user_exists.status === -1) {
        return {
          status: 404,
          message: "user not found",
          data: null,
        };
      }
      const forget_password_token = jwt.sign(
        is_user_exists.data,
        "verifytoken",
        {
          expiresIn: "5m",
        },
      );

      return {
        status: 200,
        message: "success",
        data: forget_password_token,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }

  public async updatePassword({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) {
    try {
      interface Token {
        status: string;
        data: any;
      }
      const verifyPasswordToken: Token = await new Promise(
        (reject, resolve) => {
          jwt.verify(token, "verifytoken", (err, data) => {
            if (err) {
              reject({
                status: "failed",
                data: null,
              });
            } else {
              resolve({
                status: "done",
                data: data,
              });
            }
          });
        },
      );

      if (verifyPasswordToken?.status != "done") {
        return {
          status: 401,
          message: "Failed to verify token",
          data: null,
        };
      }

      const obj = {
        email: verifyPasswordToken.data.email,
        password,
      };
      await this.updateUserPassword(obj);
      return {
        status: 200,
        message: "success",
        data: null,
      };
    } catch (error) {
      return {
        status: 500,
        message: String(error),
        data: null,
      };
    }
  }
}

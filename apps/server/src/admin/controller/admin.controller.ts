import { AdminRepository } from "../repo/admin.repo.js";
import jwt from "jsonwebtoken";

export class AdminController extends AdminRepository {
  public async sigin({ email, password }: { email: string; password: string }) {
    try {
      const admin = await this.signin_admin({
        email,
        password,
      });
      if (admin.status == -1) {
        return {
          status: 402,
          message: admin.message,
          data: admin.data,
        };
      }

      const token = jwt.sign(admin.data!, "adminverify", {
        expiresIn: "7d",
      });

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

  public async signup({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const admin = await this.signup_admin({
        email,
        password,
      });
      if (admin.status == -1) {
        return {
          status: 401,
          message: admin.message,
          data: null,
        };
      }
      return {
        status: 201,
        message: admin.message,
        data: admin.data,
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

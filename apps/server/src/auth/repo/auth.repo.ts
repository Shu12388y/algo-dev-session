import { auth } from "../model/auth.model.js";
import bcrypt from "bcryptjs";

export class AuthRepository {
  private async hashedPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async checkPassword(password: string, hashedpassword: string) {
    return bcrypt.compare(password, hashedpassword);
  }

  public async isUserExist(email: string) {
    try {
      const isuserexist = await auth
        .findOne({
          // @ts-ignore
          email: email,
        })
        .select("-password");
      if (!isuserexist) {
        return {
          status: -1,
          message: "User not found",
          data: null,
        };
      }
      return {
        status: 1,
        message: "User exists",
        data: isuserexist,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async signupUser(obj: any) {
    try {
      const { firstname, lastname, email, password } = obj;
      const info = await this.isUserExist(email);
      if (info.status === -1) {
        const user = await auth.create({
          firstname,
          lastname,
          password: await this.hashedPassword(password),
          email,
        });
        return {
          status: 201,
          message: "User created",
          data: user._id,
        };
      }
      return {
        status: 402,
        message: "User already exists",
        data: null,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async signInUser(obj: any) {
    try {
      const { email, password } = obj;
      const user = await this.isUserExist(email);
      if (user.status === -1) {
        return {
          status: -1,
          message: "user not exists",
          data: null,
        };
      }
      const isPasswordCorrect = await this.checkPassword(
        password,
        user.data.password,
      );

      if (!isPasswordCorrect) {
        return {
          status: -1,
          message: "Invalid Password",
          data: null,
        };
      }
      return {
        status: 1,
        message: "signin user",
        data: user.data,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
  public async updateUserPassword(obj: any) {
    try {
      const { email, password } = obj;
      // @ts-ignore
      await auth.findOneAndUpdate(
        {
          email,
        },
        {
          password: await this.hashedPassword(password),
        },
      );

      return {
        status: 1,
        message: "success",
        data: null,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}

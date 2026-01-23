import { admin } from "../model/admin.model.js";
import bcrypt from "bcryptjs";

export class AdminRepository {
  private async hashed_password(password: string) {
    return bcrypt.hash(password, 10);
  }

  private async compare_password(password: string, hashed_password: string) {
    return bcrypt.compare(password, hashed_password);
  }

  public async signup_admin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const is_admin_exists = await admin.findOne({
        // @ts-ignore
        email: email,
      });

      if (!is_admin_exists) {
        await admin.create({
          email: email,
          password: await this.hashed_password(password),
        });
        return {
          status: 1,
          message: "success",
          data: null,
        };
      }
      return {
        status: -1,
        message: "Admin already exists",
        data: null,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }

  public async signin_admin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      const is_admin_exists = await admin.findOne({
        // @ts-ignore
        email: email,
      });

      if (!is_admin_exists) {
        return {
          status: -1,
          message: "Admin not exists",
          data: null,
        };
      }

      const verify_password = await this.compare_password(
        password,
        is_admin_exists.password,
      );

      if (!verify_password) {
        return {
          status: -1,
          message: "Invalid password",
          data: null,
        };
      }

      const admin_info = {
        _id: is_admin_exists._id,
        role: is_admin_exists.role,
      };

      return {
        status: 1,
        message: "success",
        data: admin_info,
      };
    } catch (error) {
      throw new Error(String(error));
    }
  }
}

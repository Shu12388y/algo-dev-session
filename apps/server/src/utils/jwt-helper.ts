import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generate_jwt_token = (payload: any) => {
  return jwt.sign(payload, ENV.SECERT_HASH, {
    expiresIn: "7d",
  });
};

export const verify_JWT_token = async (payload: any) => {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, ENV.SECERT_HASH, (error: any, decode: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(decode);
      }
    });
  });
};

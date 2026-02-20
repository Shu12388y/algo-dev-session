import { Request, Response, NextFunction } from "express";
import { verify_JWT_token } from "../utils/jwt-helper.js";
import { verifySecret } from "../utils/secret-verify.js";

export const protected_route = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(400).json({ message: "Authorzation Failed" });
      return;
    }
    const info = await verify_JWT_token(authorization);
    if (!info) {
      res.status(400).json({ message: "JWT Verification Failed" });
      return;
    }
    // @ts-ignore
    req.user = info;
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const check_secret_token = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const secret_token = req.headers["secret"];
    if (!secret_token) {
      res.status(400).json({ message: "Secret Token is requried" });
      return;
    }
    const info = verifySecret(secret_token as string);
    if (!info) {
      res.status(400).json({ message: "Verification Failed" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

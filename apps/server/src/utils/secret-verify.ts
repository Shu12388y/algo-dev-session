import { hash } from "node:crypto";
import { ENV } from "./env.js";

export const verifySecret = (payload: string) => {
  const info = hash("sha1", payload, {
    outputEncoding: "base64",
  });
  return info === ENV.SECERT_HASH ? true : false;
};

import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const _ENV = {
  REDIS: process.env.REDIS
    ? process.env.REDIS
    : (() => {
        throw new Error("REDIS URL is required");
      })(),

  SECRET: process.env.SECRET
    ? process.env.SECRET
    : (() => {
        throw new Error("Secret is required");
      })(),
  WEBHOOK_URL: process.env.WEBHOOK_URL
    ? process.env.WEBHOOK_URL
    : (() => {
        throw new Error("Secret is required");
      })(),
};

export const ENV = Object.freeze(_ENV);

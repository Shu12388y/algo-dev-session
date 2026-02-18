import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const _ENV = {
  PORT: process.env.PORT
    ? process.env.PORT
    : (() => {
        throw new Error("PORT is Required");
      })(),
  URI: process.env.URI
    ? process.env.URI
    : (() => {
        throw new Error("DB URI is Required");
      })(),
  REDIS: process.env.REDIS
    ? process.env.REDIS
    : (() => {
        throw new Error("REDIS URI is Required");
      })(),
  GEMINI: process.env.GEMINI
    ? process.env.GEMINI
    : (() => {
        throw new Error("REDIS URI is Required");
      })(),
};

export const ENV = Object.freeze(_ENV);

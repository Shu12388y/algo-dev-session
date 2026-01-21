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
};

export const ENV = Object.freeze(_ENV);

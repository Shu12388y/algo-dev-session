import express,{ Express,Response,Request } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { schema } from "./auth/graphql/graphql.js";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(
  "/graphql/auth",
  createHandler({
    schema,
    context: (req, res) => ({ req, res }),
  })
);


app.get("/ruru/:service", (req, res) => {
  const service = req.params.service;
  res.type("html");
  res.end(ruruHTML({ endpoint: `/graphql/${service}` }));
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

import express, { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import {schema} from "./auth/graphql/graphql.js"

export const app: Express = express();

app.use(
  "/graphql/auth",
  createHandler({
    schema: schema
  }),
);

app.get("/ruru/:service", (req, res) => {
  const service = req.params.service
  res.type("html");
  res.end(ruruHTML({ endpoint: `/graphql/${service}` }));
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

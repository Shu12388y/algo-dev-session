import express, { Express } from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";

export const app: Express = express();
const schema = buildSchema(`type Query { hello: String } `);
const root = {
  hello() {
    return "Hello world!";
  },
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

app.get("/ruru", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

import { AuthController } from "../controllers/auth.controller.js";
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const userAuthType = new GraphQLObjectType({
  name: "userauth",
  fields: {
    status: { type: GraphQLInt },
    message: { type: GraphQLString },
    data: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    _empty: {
      type: GraphQLString,
      resolve: () => "API running",
    },
  },
});

const authMutation = new GraphQLObjectType({
  name: "auth",
  fields: {
    sigin: {
      type: userAuthType,
      args: {
        email: { type: GraphQLString },
      },
      resolve: (_, { email }) => {
        return {
          status: 200,
          message: "authorized",
          data: email,
        };
      },
    },
    signup: {
      type: userAuthType,
      args: {
        email: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (_, { email, firstname, lastname, password }) => {
        const user = await new AuthController().signup({
          email,
          firstname,
          lastname,
          password,
        });
        return {
          data: user.data,
          message: user.message,
          status: user.status,
        };
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: authMutation,
});

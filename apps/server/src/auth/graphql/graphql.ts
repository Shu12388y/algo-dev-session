import { AuthController } from "../controllers/auth.controller.js";
import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

const instance = new AuthController();

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
        password: { type: GraphQLString },
      },
      resolve: async (_, { email, password }) => {
        const user = await instance.signin({
          email,
          password,
        });
        return {
          status: user.status,
          message: user.message,
          data: user.data,
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
        const user = await instance.signup({
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
    forgetPasswordSendToken: {
      type: userAuthType,
      args: {
        email: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { email }) => {
        const user = await instance.forgetPasswordSendEmailToken({
          email,
        });
        return {
          status: user.status,
          message: user.message,
          data: user.data,
        };
      },
    },

    forgetPassword: {
      type: userAuthType,
      args: {
        email: { type: GraphQLString },
        token: { type: GraphQLString },
      },
      resolve: async (_, { password, token }) => {
        const user = await instance.updatePassword({
          password,
          token,
        });
        return {
          status: user.status,
          message: user.message,
          data: user.data,
        };
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: authMutation,
});

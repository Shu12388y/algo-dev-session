import {Redis} from "ioredis";

export const connection = (uri: string) => {
  if (!uri) {
    throw new Error("Redis connection URL is required");
  }
  const client = new Redis(uri!,{
    maxRetriesPerRequest:null
  });
  return client;
};

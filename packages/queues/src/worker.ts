import { Worker } from "bullmq";
import Redis from "ioredis";


export const Workers = (
  wname: string,
  callback: (j: any) => {},
  connectionuri: string,
) => {

  // @ts-ignore
  const connection = new Redis(connectionuri, {
    maxRetriesPerRequest: null,
  });
  const worker = new Worker(
    wname,
    async (job) => {
      callback(job);
    },
    { connection },
  );
  return worker;
};

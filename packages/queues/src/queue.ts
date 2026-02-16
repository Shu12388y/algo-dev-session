import { Queue } from "bullmq";
import Redis from "ioredis";


export const Queues = (qname: string, connectionuri: string) => {

  // @ts-ignore
  const connection = new Redis(connectionuri, {
    maxRetriesPerRequest: null,
  });
  const queue = new Queue(qname, {
    connection: connection,
  });
  return queue;
};

import { Workers } from "@repo/queues/queues";
import { execute_code_gcc, generateFile_gcc } from "./service/gcc-executor.js";
import { execute_code_cpp, generateFile_cpp } from "./service/cpp-executor.js";
import {
  generateFile_java,
  execute_code_java,
} from "./service/java-executor.js";
import {
  generateFile_node,
  execute_code_node,
} from "./service/node-executor.js";
import { generateFile_py, execute_code_py } from "./service/python-executor.js";
import { ENV } from "./env.js";
import { webhook } from "./webhook.js";

export const worker_node = async () => {
  try {
    Workers(
      "language-queue",
      async (job) => {
        switch (job.name) {
          case "c-route":
            const gcc_code_path = generateFile_gcc({
              code: "",
              language: 1,
            });
            const gcc_code_execute = execute_code_gcc({
              filepath: gcc_code_path.file_path,
              input: "",
              jobid: gcc_code_path.jobID as string,
            });

            gcc_code_execute
              .then(async (data) => {
                await webhook(ENV.WEBHOOK_URL, data, ENV.SECRET);
              })
              .catch((e) => {
                console.log(e);
              });

            break;
          case "cpp-route":
            const c_code_path = generateFile_cpp({
              language: 2,
              code: job.data.source_code,
            });
            const c_code_execute = execute_code_cpp({
              filepath: c_code_path.file_path,
              jobid: c_code_path.jobID as string,
              input: job.data.input,
            });
            c_code_execute
              .then(async (data) => {
                await webhook(ENV.WEBHOOK_URL, data, ENV.SECRET);
              })
              .catch((e) => {
                console.log(e);
              });
            break;
          case "js-route":
            const js_code_path = generateFile_node({
              language: 2,
              code: job.data.source_code,
            });
            const js_code_execute = execute_code_node({
              filepath: js_code_path.file_path,
              jobid: js_code_path.jobID as string,
              input: job.data.input,
            });
            js_code_execute
              .then(async (data) => {
                await webhook(ENV.WEBHOOK_URL, data, ENV.SECRET);
              })
              .catch((e) => {
                console.log(e);
              });
            break;

          case "java-route":
            const java_code_path = generateFile_java({
              language: 2,
              code: job.data.source_code,
            });
            const java_code_execute = execute_code_java({
              filepath: java_code_path.file_path,
              jobid: java_code_path.jobID as string,
              input: job.data.input,
            });
            java_code_execute
              .then(async (data) => {
                await webhook(ENV.WEBHOOK_URL, data, ENV.SECRET);
              })
              .catch((e) => {
                console.log(e);
              });
            break;

          case "python-route":
            const py_code_path = generateFile_py({
              language: 2,
              code: job.data.source_code,
            });
            const py_code_execute = execute_code_py({
              filepath: py_code_path.file_path,
              jobid: py_code_path.jobID as string,
              input: job.data.input,
            });
            py_code_execute
              .then(async (data) => {
                await webhook(ENV.WEBHOOK_URL, data, ENV.SECRET);
              })
              .catch((e) => {
                console.log(e);
              });
            break;

          default:
            break;
        }
      },
      ENV.REDIS,
    );
  } catch (error) {
    console.log("here is the error block");
    throw new Error(String(error));
  }
};

worker_node();

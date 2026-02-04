/*
Execute Code for G++
*/

import fs from "node:fs";
import path from "node:path";
import { language_id } from "../language.js";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { exec } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCode = path.join(__dirname, "code");

if (!fs.existsSync(dirCode)) {
  fs.mkdirSync(dirCode, {
    recursive: true,
  });
}

export const generateFile = ({
  language,
  code,
}: {
  language: number;
  code: string;
}) => {
  if (
    !language_id[language as keyof typeof language_id] ||
    language_id[language as keyof typeof language_id] != "cpp"
  ) {
    return {
      file_path: "",
      jobID: null,
    };
  }

  const id = uuidv4();
  const filename = id + "." + language_id[language as keyof typeof language_id];
  fs.writeFileSync(path.join(dirCode, filename), code, {
    encoding: "utf-8",
  });
  return { file_path: path.join(dirCode, filename), jobID: id };
};

export const execute_code = ({
  filepath,
  jobid,
}: {
  filepath: string;
  jobid: string;
}) => {
  try {
    const out_file_name = jobid + "." + "out";
    const output_dir = path.join(__dirname, "output");
    if (!fs.existsSync(output_dir)) {
      fs.mkdirSync(output_dir, {
        recursive: true,
      });
    }
    return new Promise((reject, resolve) => {
      exec(
        `g++ ${filepath} -o ${output_dir + "/" + out_file_name} && cd ${output_dir} && ./${out_file_name}`,
        (error, stderr, stdout) => {
          if (error) {
            reject(error);
          }
          if (stderr) {
            reject(stderr);
          }
          if (stdout) {
            resolve(stdout);
          }
        },
      );
    });
  } catch (error) {
    throw new Error(String(error));
  }
};


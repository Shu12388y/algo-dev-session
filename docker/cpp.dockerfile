FROM alpine/node as Base

WORKDIR /app 

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml . 


COPY ./apps/codeJudge/package.json .

RUN pnpm install 

CMD [ "pnpm","build"]

COPY ./apps/codeJudge/dist .

FROM codenvy/cpp_gcc as Runner 








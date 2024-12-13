FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

EXPOSE 8001

CMD [ "bun", "src/index.ts" ]
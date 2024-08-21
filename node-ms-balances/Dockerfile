FROM node:20-alpine AS build

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY . .
RUN npm ci

RUN npm run build
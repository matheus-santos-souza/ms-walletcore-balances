FROM node:20-alpine AS build

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
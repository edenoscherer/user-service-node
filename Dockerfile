FROM node:22 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:22-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./
COPY migrations  ./migrations
RUN yarn install --production
COPY .env .env
EXPOSE 3000
CMD ["node", "dist/index.js"]

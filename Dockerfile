FROM node:21-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++ && \
    npm install && \
    apk del .gyp
COPY app.js ./
FROM node:21-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD ["node", "app.js"]
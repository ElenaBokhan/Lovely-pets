FROM node:alpine as build

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]
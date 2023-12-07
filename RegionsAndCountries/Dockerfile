FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM httpd:alpine3.15
WORKDIR /usr/local/apache2/htdocs
COPY --from=build /app/dist/regions-and-countries .

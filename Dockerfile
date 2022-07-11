#build
FROM node:16 as build

WORKDIR /fe
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

#webserver
FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=build /fe/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
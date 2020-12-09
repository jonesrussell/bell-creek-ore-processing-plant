FROM node:10-buster AS build
COPY . /app
WORKDIR /app
RUN git checkout tags/v1.0.0 -b latest \
  && npm install

FROM nginx:1.19.2-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf

LABEL name bell-creek
LABEL version 1.0.0

EXPOSE 80

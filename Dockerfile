FROM node:current-alpine3.12 as BUILD
WORKDIR /app
ENV \
    PATH=/app/node_modules/.bin:$PATH \
    GENERATE_SOURCEMAP=false
COPY . .
RUN set -x \
    && npm install --silent \
    && npm run build

FROM nginx:stable-alpine
COPY --from=BUILD /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

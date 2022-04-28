FROM node:alpine
WORKDIR /app
COPY . /usr/share/nginx/html
RUN npx nginx
# RUN npm install -g json-server
# RUN json-server --watch ./data/db.json
EXPOSE 80

FROM node:12.18.3
WORKDIR /search-app
#caching package.json 
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD "npm" "run" "start"
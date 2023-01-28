FROM node:12.18.3
WORKDIR /booking-service
#caching package.json 
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD "npm" "run" "start"
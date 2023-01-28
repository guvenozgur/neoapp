FROM node:12.18.3
WORKDIR /payment-service
#caching package.json 
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8082
CMD "npm" "run" "start"
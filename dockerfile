FROM node:18

# Create and define working directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source by copying all source code from src
COPY src ./src

# Expose the app port
EXPOSE 3000

CMD [ "npm", "start" ]
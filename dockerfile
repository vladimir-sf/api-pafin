FROM node:18

# Create and define working directory
WORKDIR /app

# Install system dependencies required for bcrypt
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

# Bundle app source by copying all source code from src
COPY src ./src

# Expose the app port
EXPOSE 3000

CMD [ "npm", "start" ]

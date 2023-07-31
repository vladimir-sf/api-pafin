# Pafin API Test Project

This is a Node.js API built with Express, Knex.js and Objection.js for ORM, running in a Docker container. It's 
connected to a PostgreSQL database, also running in a Docker container.

## Prerequisites

- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (https://docs.docker.com/compose/install/)

## Installation & Running

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Copy the .env.sample to .env and fill the required environment variables
    ```bash
    cp .env.sample .env
    ```
3. Build the Docker images and start the containers using Docker Compose
    ```bash
    docker-compose up -d --build
    ```

The API should now be running at `http://localhost:3000`.

### Additional Docker Compose Commands
```
# Stop the containers. Add -v to remove volumes
docker-compose down
# Delete images and cache
docker rmi -f $(docker images -a -q) 
# Logs
docker-compose logs <condainter_id> or <container_name>
# List containers. Flag -a shows stopped containers
docker ps -a
```

## Running Migrations and Seeds

Migrations and seeds run automatically when the Docker container is started.


## Running Tests

Currently, the API doesn't have any tests. But once they're added, you can run them with:
```bash
npm run test
```
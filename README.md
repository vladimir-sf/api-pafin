# Pafin API Test Project

This is a Node.js API built with Express, Knex.js and Objection.js for ORM, running in a Docker container. It's 
connected to a PostgreSQL database, also running in a Docker container.

## Notes on Project Structure

The project is organized into several folders to help keep the codebase clean and easy to navigate. Here is a brief overview of the project structure:

- `app`: This folder is where the bulk of the application logic resides.
- - `controllers`: These modules handle incoming HTTP requests and send responses back to the client.
- - `interfaces`: These files define interfaces for the services. They are used to enforce a consistent structure for the 
    service modules.
- - `services`: These modules handle business logic and operations on data, such as creating or deleting a user in the 
    database.
- - `models`: This folder contains data models for business data, such as a User.
- - `routes`: This folder contains all the route definitions for the application, such as user routes and common routes.
- - `db`: This folder contains all the necessary files for setting up and interacting with the database.
- - - `models`: These are Objection.js Model classes which represent database tables and handle operations on them.
- - - `migrations`: This folder contains Knex migration files, which are used to manage changes and updates to the 
    database schema.
- - - `seeds`: This folder contains seed files to populate the database with initial data for testing or development 
  purposes.
- `tests`: This folder contains all the test files and related configurations for the application.

By structuring the project in this way, we can separate concerns, making the codebase easier to understand and maintain. Each part of the application has a specific job, and its implementation is kept separate from other parts.

## Prerequisites

- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (https://docs.docker.com/compose/install/)

## Installation & Running

1. Clone the repository **ssh**
   ```bash
   git clone git@github.com:vladimir-sf/api-pafin.git
   cd api-pafin
   ```
    or **https**
    ```bash
    git clone https://github.com/vladimir-sf/api-pafin.git
    cd api-pafin
    ```
2. Copy the .env.sample to .env and fill the required environment variables
    ```bash
    cp .env.sample .env
    ```
3. Build the Docker images and start the containers using Docker Compose
    ```bash
    docker-compose up -d --build
    ```

The API should now be running at `http://localhost:3000` -- change the **PORT** value to what you defined in .env.

### Additional Docker Compose Commands
- `docker-compose down`: Stop the containers. Add -v to remove volumes
- `docker-compose down --rmi all`: Stop the containers and remove images.
- `docker-compose logs <condainter_id> or <container_name>`: Show logs for a container
- `docker ps -a`: List all containers

## Database Migrations and Seeds with Knex

This project uses Knex for database migrations and seeds. You can find the Knex configuration in `./src/app/db/knexfile.ts`.
Migration files are stored in `./src/app/db/migrations` and seed files are stored in `./src/app/db/seeds`.

Currently, the configuration is set up to connect to a PostgreSQL database running in a Docker container and defined 
in the `docker-compose.yml` file; and we have only development environment defined.

Knex provides a set of commands that you can use to create, apply, and rollback database migrations, as well as to create and apply seed data.

Here are the npm scripts related to database operations:

- `knex:migrate:make`: Creates a new database migration. You should provide the name of the migration as an argument.

```bash
npm run knex:migrate:make -- [name]
```

- `knex:migrate:latest`: Applies all pending database migrations.
```bash
npm run knex:migrate:latest
```

- `knex:migrate:rollback`: Rolls back the last applied database migration.
```bash
npm run knex:migrate:rollback
```

- `knex:seed:make`: Creates a new seed file. You should provide the name of the seed as an argument.
```bash
npm run knex:seed:make -- [name]
```

- `knex:seed:run`: Runs all seed files to populate the database with data.
```bash
npm run knex:seed:run
```

Make sure you run these commands inside the Docker container where the application is running, as it is where Knex is installed and the database is accessible.

You can use docker-compose exec to run commands inside a Docker container:

```bash
docker-compose exec app npm run knex:migrate:latest
```

Note: Remember to replace `app` with the name of the service if you changed it in `docker-compose.yml` file.

## Running Tests

Currently, the API doesn't have any tests. But once they're added, you can run them with:
```bash
npm run test
```

## Debugging the Application
You can debug the application by running Docker Compose, or in an IDE of your choice.

### Debugging Using Docker Compose
To start a debug session using Docker Compose, you can use the following command:
```bash
docker-compose up
```
This command starts all services defined in the docker-compose.yml file, including the API and database services, and attaches the terminal to the output.

### Debugging in an IDE
To debug in an IDE, you first need to start the database container:
```bash
docker-compose up db
```
Then, you can start a debug session for the API in your IDE.

The exact steps to start a debug session depend on the IDE you are using. Typically, you would need to open the project in your IDE, set some breakpoints in your code, and then start a debug session. Consult the documentation of your specific IDE for detailed instructions.

Remember to ensure that the API connects to the correct database service, as running the database in a Docker container can change the hostname and port compared to running the database locally.

## Additional Information
### Husky Setup
**Husky** is a tool that we use to ensure that the codebase maintains a consistent style and avoids certain kinds of errors. We use it to automatically run scripts when certain git events occur.

We have two husky hooks set up: a _pre-commit_ hook and a _pre-push_ hook.

#### Pre-commit
Before you can commit your changes, husky will automatically run the following command:
```bash
npm run lint && npm run check-types
```
This command will run the linter to check for code style issues, and it will also check for any TypeScript type 
errors. Note: if you have lint errors, you will need to fix them before you can commit your changes.

#### Pre-push
Before you can push your changes to the repository, husky will automatically run the following command:
```bash
npm run test
```
This command will run all the tests in the project to ensure that the changes you've made haven't broken anything.

### Automatically Fixing Lint Errors
If the linter has reported any issues that you're not sure how to fix, you can automatically fix most of them by running the following command:
```bash
npm run lint-fix
```
This command will automatically fix any issues that it can and report any issues that it couldn't fix, which you will need to fix manually.

## Potential Changes To Be Made

Currently, our setup runs the database migrations and seeds every time the application container starts. While this ensures that our database schema is up-to-date and test data is available, it may not be the optimal solution for all use cases.

The following changes can be considered:

### Move Database Seeding Out of Docker Compose
We may want to move the database seeding process (i.e., `knex:seed:run`) out of the Docker Compose command. Instead of running seeds automatically, we could handle them manually when necessary. This prevents unnecessary seeding operations on every application restart and gives us more control.

To manually run seeds in docker container, you could use the following command:
```bash
npm run knex:seed:run
```

### Reconsider Input Validation Strategy
Currently, in our application, we follow a multi-tier validation strategy:

#### Common Validation Definitions (/app/common/CommonValidationDefinitions)
This is where we keep the validation logic for common data types used across multiple models, such as emails, passwords, and UUIDs. Centralizing these common validation rules helps us avoid code duplication and maintain consistency in how we treat these data types across our application.

Example usage:
```typescript
import { validateEmail } from '../common/CommonValidationDefinitions';
const validationResult = validateEmail(userEmail);
```

#### Model-Specific Validations (/app/models/) With Context-Specific Validations
Each of our models may have unique validation requirements. These specific rules are defined within the model itself. This design choice encourages encapsulation and makes our models more self-reliant.
Some validation rules may apply only in certain contexts. For example, while creating a new user, certain fields like name, email, and password may be mandatory, but these same fields might be optional when updating a user's information.

Such context-specific rules are defined in the model but executed based on the context by the controller/service.

Example usage:
```typescript
import User from '../models/User';
import { OperationType } from './CommonValidationDefinitions';

const user = User.fromAny(req.body);
const validationResult = user.validate(OperationType.CREATE);
```
# express-extended-api-template

This is a template for an extended API using Express.js. It includes a basic structure for a RESTful API with a user authentication system, a database connection.

## Features

- **User authentication system**: The API includes a user authentication system with JWT tokens. 
- **Database connection**: The API includes a connection to a PostgreSQL database using the `pg` library.
- **RESTful API structure**: The API is structured following RESTful principles.
- **Easy CRUD operations**: The API includes basic CRUD operations for any given entity.

## Getting started

1. Clone the repository
2. Install the dependencies: `npm install`
3. (Optional) Create a `.env` file with the following variables:
```
# Environment
NODE_ENV=dev

# Server
SERVER_PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres

# JWT
JWT_ACCESS_SECRET=access_secret
JWT_REFRESH_SECRET=refresh_secret

# Logging
LOG_LEVEL=debug
```
4. Set up the database:
5. Update the `docker-compose.yml` file with the desired database name, user, and password.
6Start the database: `docker-compose up -d`
7. Generate migrations: `npm run m:g src/db/migrations/<migration-name>`
8. Run the migrations: `npm run m:r`
9. Start the server: `npm run start`

## Scripts

- `npm run dev`: Start the server in development mode with Nodemon
- `npm run test`: Run the tests
- `npm run migrations:generate <name>`: Run the tests
- `npm run m:g <name>`: Shorthand for `npm run migrations:generate <name>`
- `npm run migration:run`: Run the migrations
- `npm run m:r`: Shorthand for `npm run migration:run` 
- `npm run migration:revert`: Revert the last migration
- `npm run m:re`: Revert the last migration
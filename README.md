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
3. Create a `.env` file with the following variables:
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
   1. Update the `docker-compose.yml` file with the desired database name, user, and password.
   2. Start the database: `docker-compose up -d`
   3. Generate migrations:
5. Run the migrations: `npm run typeorm migration:generate src/db/migrations/<migration-path>`
6. Start the server: `npm run start`
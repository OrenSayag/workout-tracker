App for tracking workouts

## Local Development Setup

### Prerequisites

1. Docker installed on your machine.
2. `pnpm` installed on your machine.

```bash
npm install -g pnpm
```

### Steps

1. Clone the repository
2. Install dependencies

```bash
pnpm install
```

3. Start the dev docker containers (refer to `docker-compose.yml` for services)

```bash
docker compose up -d
```

4. Run db migrations

```bash
nx drizzle-migrate db
```

4. Start the development server

```bash
nx dev app
```

---
### Updating the Database Schema
To update the database schema, follow these steps:
1. Open the schema definition file: `libs/db/src/lib/schema.ts`
2. Modify the table definitions as needed.
3. Generate the migration files by running: 
    ```bash
   nx drizzle-generate db
   ```
4. Confirm that the migration files have been created in:`libs/db/drizzle/meta`
5. Apply the migrations to your database:
    ```bash
    nx drizzle-generate db
   ```

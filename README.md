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

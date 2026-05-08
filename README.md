
# Flare Leads CRM

## Project Overview

Flare Leads CRM is a full-stack sales pipeline application for tracking leads, managing deal stages, and capturing notes on each lead. The frontend provides a login flow, a dashboard with performance metrics, a kanban-style lead board, and a lead detail page with note management. The backend exposes authenticated REST endpoints for auth, leads, notes, dashboard metrics, and user lookup.
 

## Tech Stack Used

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, TanStack Query, Framer Motion, Recharts
- Backend: Node.js, Express 5, TypeScript, Drizzle ORM, PostgreSQL
- Auth and utilities: JWT, bcryptjs, cookie-parser, CORS, Zod
- Local infrastructure: Docker Compose for PostgreSQL


## Features Implemented

- JWT-based login, logout, and current-user session checks using an HTTP-only cookie
- Protected dashboard route with sidebar navigation
- Sales dashboard with lead counts, pipeline status, and value charts
- Lead management with create, edit, delete, status changes, and drag-and-drop pipeline updates
- Lead detail view showing contact data, deal value, assigned salesperson, and timestamps
- Lead notes with create, edit, and delete actions
- Search and filtering endpoints for lead discovery


## How to Run Locally

1. Update the PostgreSQL username and password in `docker-compose.yml` if needed, then start PostgreSQL with Docker Compose from the repository root:

```bash
docker  compose  up  -d  postgres
```

2. Install backend dependencies and configure environment:

```bash
cd  backend
pnpm  install
cp  .env.example  .env
```
Then edit `backend/.env` and set the following values:

```bash
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/db_name
JWT_SECRET=generate_a_long_random_secret
FRONTEND_URL=http://localhost:3000
```

Generate a strong `JWT_SECRET` with a tool such as https://jwtsecretkeygenerator.com/ or any equivalent secure secret generator. Ensure `DATABASE_URL` matches the PostgreSQL credentials you set in `docker-compose.yml`.

Now push the database schema:

```bash
pnpm  db:push
pnpm  exec  tsx  src/db/test_user.ts
```

3. Start the backend API:

```bash
pnpm  dev
```

4. In a second terminal, install and start the frontend:

```bash
cd  frontend
pnpm  install
cp  .env.example  .env.local
```

Then edit `frontend/.env.local` and set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
  

If you changed the backend port, update the URL accordingly. Now start the dev server:


```bash
pnpm  dev
```


5. Open the app at `http://localhost:3000`.
  

## Test Login Credentials

The repository includes a test user script that creates a demo admin user with these credentials:

- Email: admin@example.com
- Password: password123

Run the test user script after the schema is applied so the login works on a fresh database.


## Database Setup

The project uses PostgreSQL 17 via Docker Compose. Set the username and password in `docker-compose.yml` before starting the container, then make sure the same values are reflected in `DATABASE_URL`.

After the database container is running, apply the schema from `backend/src/db/schema.ts` with `pnpm db:push`. That creates the users, leads, and notes tables plus the lead source/status enums. Once the schema exists, run `pnpm exec tsx src/db/test_user.ts` to insert the demo admin account.

## Adding Sample Data

To populate the database with sample leads and notes for testing, run the sample data seed script:

```bash
cd backend
pnpm exec tsx src/db/sample_data.ts
```

This will insert 3 sample leads across different statuses (New, Contacted, Qualified) and 3 associated notes. The script clears existing leads and notes before inserting new data, so use it to reset your test data as needed.

## Known Limitations

- This project is not deployed and is designed for local development only.
- There is no admin to create new user account or manage user accounts.
- There is no automated test suite in the repository yet.
- The frontend and backend must stay aligned on their local URLs so CORS and cookie-based auth continue to work.
- The seeded admin insert is intended for a fresh database and may need cleanup if run more than once.
- There is no pagination or infinite scrolling for large lead datasets yet.
- Real-time collaboration is not implemented, so multiple users cannot see live pipeline updates simultaneously.
- The authentication system currently uses a single JWT without refresh token rotation.
  

## Reflection

-   Cross-origin cookie transmission was initially blocked due to CORS and secure cookie restrictions between the Next.js frontend and Express backend. The issue was resolved by properly configuring CORS with explicit origin whitelisting and credential support.
-   Dashboard metrics were first considered for frontend calculation, but the aggregation logic was moved to a dedicated backend controller to keep responsibilities separated and reduce client workload.
-   Manual API validation using `if/else` blocks became difficult to maintain in search controller. This was improved by implementing `zod` schemas for strict request validation and type safety.
-   JWT authentication initially attempted to use `Authorization` headers, but `httpOnly` cookies prevented client-side access. The solution was switching to a secure cookie-based authentication flow using `credentials: 'include'` and backend cookie parsing.

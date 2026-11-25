# Diagno Backend

REST API backend for the Diagno healthcare/medical CRM platform. Manages leads, doctors, products, bookings, employee attendance, field meetings, and user authentication.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js with TypeScript |
| Framework | NestJS 11 |
| ORM | Drizzle ORM (drizzle-zod for schema-derived DTOs) |
| Database | PostgreSQL (via `pg` driver) |
| Validation | Zod 4 (`ZodValidationPipe`, `@ZodBody` decorator) |
| Auth | JWT (passport-jwt, @nestjs/jwt) with 7-day tokens |
| Logging | Pino via nestjs-pino (dev: pretty-print, prod: rotating files) |
| Package manager | pnpm |

---

## Features

- JWT authentication (login endpoint + Bearer token validation)
- Users CRUD
- Leads management with status tracking (`new` / `contacted` / `converted` / `lost` / `spam`)
- Doctors directory
- Products catalog
- Bookings management
- Employee attendance tracking with check-in/check-out geo-coordinates
- Field meetings scheduling between employees and doctors
- Unified response envelope for all endpoints (`{ success, message, data }`)
- Structured error responses including Zod validation field details
- Audit log interceptor (records create/update/delete actions to the database)
- CORS configured for separate admin and user frontend origins

---

## Prerequisites

- Node.js >= 20
- pnpm >= 9
- PostgreSQL instance

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-jwt-secret-here
PORT=3000
ADMIN_FRONTEND_URL=http://localhost:5173
USER_FRONTEND_URL=http://localhost:5174
NODE_ENV=development
```

---

## Installation

```bash
pnpm install
```

## Running

```bash
# Development (watch mode)
pnpm run start:dev

# Build
pnpm run build

# Production
pnpm run start:prod
```

---

## Database Migrations

```bash
# Generate migration from schema changes
pnpm drizzle-kit generate

# Apply migrations
pnpm drizzle-kit migrate
```

---

## API Endpoints

All responses follow the envelope format:

```json
{ "success": true, "message": "...", "data": { ... } }
```

Errors:

```json
{ "success": false, "message": "...", "errors": { ... }, "data": null }
```

| Module | Method | Path | Description |
|---|---|---|---|
| Auth | POST | `/auth/login` | Login, returns JWT access token |
| Users | GET | `/users` | List all users |
| Users | GET | `/users/:id` | Get user by ID |
| Users | POST | `/users` | Create user |
| Users | PATCH | `/users/:id` | Update user |
| Users | DELETE | `/users/:id` | Delete user |
| Leads | GET | `/leads` | List all leads |
| Leads | GET | `/leads/:id` | Get lead by ID |
| Leads | POST | `/leads` | Create lead |
| Leads | PATCH | `/leads/:id` | Update lead |
| Doctors | GET | `/doctors` | List doctors _(implementation pending)_ |
| Doctors | GET | `/doctors/:id` | Get doctor by ID _(implementation pending)_ |
| Doctors | POST | `/doctors` | Create doctor _(implementation pending)_ |
| Doctors | PATCH | `/doctors/:id` | Update doctor _(implementation pending)_ |
| Products | GET | `/products` | List products _(implementation pending)_ |
| Products | POST | `/products` | Create product _(implementation pending)_ |
| Bookings | GET | `/bookings` | List bookings _(implementation pending)_ |
| Bookings | POST | `/bookings` | Create booking _(implementation pending)_ |
| Attendance | GET | `/attendance` | List attendance records |
| Attendance | POST | `/attendance` | Create attendance record |
| Attendance | PATCH | `/attendance/:id` | Update attendance record |
| Meetings | GET | `/meetings` | List meetings |
| Meetings | GET | `/meetings/:id` | Get meeting by ID |
| Meetings | POST | `/meetings` | Create meeting |
| Meetings | PATCH | `/meetings/:id` | Update meeting |

---

## Architecture

```
src/
  auth/                   # JWT auth (login, Passport strategy, guards)
  common/
    decorators/           # @Message (response label), @ZodBody (validated body param)
    filters/              # HttpExceptionFilter — global error response shaping
    interceptors/         # ResponseInterceptor (envelope), AuditInterceptor + AuditService
    pagination/           # PaginationSchema (Zod)
    pipes/                # ZodValidationPipe
  db/
    drizzle.module.ts     # Global Drizzle module (registered in AppModule)
    drizzle.service.ts    # PostgreSQL connection pool
    schema/               # Drizzle table definitions (users, leads, doctors, etc.)
  routes/
    attendance/           # Attendance module (controller, service, DTO, module)
    bookings/             # Bookings module
    doctors/              # Doctors module
    leads/                # Leads module
    logger/               # Pino logger configuration
    meetings/             # Meetings module
    products/             # Products module
    users/                # Users module
  zod-schemas/            # Standalone Zod schemas (user.schema.ts)
  app.module.ts           # Root module — imports all feature modules
  main.ts                 # Bootstrap: CORS, global filter, global response interceptor
```

### Validation Pattern

Two equivalent patterns are used for request body validation:

```typescript
// Option A — @ZodBody decorator (leads, auth controllers)
async createLead(@ZodBody(createLeadInsertSchema) dto: CreateLeadDto) {}

// Option B — inline pipe (users, attendance, meetings controllers)
async createUser(@Body(new ZodValidationPipe(CreateUserSchema)) dto: CreateUserDto) {}
```

Both delegate to `ZodValidationPipe`, which throws a `400 BadRequestException` with flattened Zod error details on validation failure.

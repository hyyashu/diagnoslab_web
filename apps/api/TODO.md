# TODO

## Build Fixes

- [x] Create `src/common/decorators/zod-body.decorator.ts` (missing decorator imported by auth and leads controllers)
- [x] Add `Body` to `@nestjs/common` imports in `src/routes/users/users.controller.ts`
- [x] Add `Body` to `@nestjs/common` imports in `src/routes/attendance/attendance.controller.ts`
- [x] Add `Body` to `@nestjs/common` imports in `src/routes/meetings/meetings.controller.ts`
- [x] Remove dead `ZodBody` import from `src/routes/meetings/meetings.controller.ts`
- [x] Fix `import type` for `ZodError` in `src/common/pipes/zod-validation.pipe.ts` (can't use a type-only import with `instanceof`)

---

## Security (High Priority)

- [ ] Replace hardcoded database credentials in `src/db/drizzle.service.ts` with `process.env.DATABASE_URL`
- [ ] Replace plain-text password comparison in `src/auth/auth.service.ts` with `bcrypt.compare(password, user.password)` — `bcrypt` is already in `dependencies`
- [ ] Create `.env.example` documenting all required env vars (`DATABASE_URL`, `JWT_SECRET`, `PORT`, `ADMIN_FRONTEND_URL`, `USER_FRONTEND_URL`, `NODE_ENV`)
- [ ] Confirm `.env` is listed in `.gitignore`

---

## Incomplete Module Implementations (Medium Priority)

### Doctors
- [ ] Implement `src/routes/doctors/doctors.controller.ts` — GET all, GET /:id, POST, PATCH /:id
- [ ] Implement `src/routes/doctors/doctors.service.ts` — Drizzle queries (follow `LeadsService` pattern)
- [ ] Add `imports: [DrizzleModule]` to `src/routes/doctors/doctors.module.ts`

### Products
- [ ] Implement `src/routes/products/products.controller.ts` — GET all, GET /:id, POST, PATCH /:id
- [ ] Implement `src/routes/products/products.service.ts` — Drizzle queries
- [ ] Add `imports: [DrizzleModule]` to `src/routes/products/products.module.ts`

### Bookings
- [ ] Implement `src/routes/bookings/bookings.controller.ts` — GET all, GET /:id, POST, PATCH /:id
- [ ] Implement `src/routes/bookings/bookings.service.ts` — Drizzle queries
- [ ] Add `imports: [DrizzleModule]` to `src/routes/bookings/bookings.module.ts`

---

## Schema & Database (Medium Priority)

- [ ] Update `src/db/schema/index.ts` to export all table schemas — currently only exports `users`, `leads`, `auditLog`. Missing: `attendance`, `booking`, `doctors`, `products`, `meetings`, `emplyoee`, `pateint`, `common`, `billing`, `notification`/`notifications`
- [ ] Add `role` column to `users` table in `src/db/schema/users.ts` — JWT payload includes `role` but the DB table has no such column

---

## Code Quality (Low Priority)

- [ ] Standardize validation decorator usage — some controllers use `@ZodBody(schema)`, others use `@Body(new ZodValidationPipe(schema))`. Pick one and apply consistently
- [ ] Remove `console.log(createUserDto)` debug statement from `src/routes/users/users.controller.ts` line 26
- [ ] Apply JWT guards to protected routes (`@UseGuards(JwtAuthGuard)`) — currently no route enforces authentication
- [ ] Implement pagination — `PaginationSchema` exists at `src/common/pagination/pagination.schema.ts` but is unused
- [ ] Rename `src/db/schema/emplyoee.ts` → `employee.ts` (typo in filename) and update all imports
- [ ] Rename `src/db/schema/pateint.ts` → `patient.ts` (typo in filename) and update all imports
- [ ] Add Swagger/OpenAPI documentation (`@nestjs/swagger`)
- [ ] Write unit tests — all `*.spec.ts` files were deleted; `jest` and `@nestjs/testing` are already in `devDependencies`

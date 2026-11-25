import { pgEnum } from 'drizzle-orm/pg-core';

export const genderEnum = pgEnum('gender', ['male', 'female', 'other']);
export const statusEnum = pgEnum('status', ['active', 'inactive', 'pending']);

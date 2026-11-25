import { SetMetadata } from '@nestjs/common';

// Key used to store and retrieve the isPublic metadata flag
export const IS_PUBLIC_KEY = 'isPublic';

// Marks a route as publicly accessible — the global JwtAuthGuard will skip
// JWT token validation for any handler or controller decorated with @Public().
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Event names and payload types for email-related events.
 * Use these constants when emitting and listening so names stay consistent.
 */

export const USER_CREATED = 'user.created';
export const PASSWORD_RESET_REQUESTED = 'auth.password_reset.requested';
export const LEAD_CREATED = 'lead.created';

export interface UserCreatedPayload {
  email: string;
  name?: string;
}
export interface LeadCreatedPayload {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: object;
}

export interface PasswordResetRequestedPayload {
  email: string;
  resetToken: string;
}

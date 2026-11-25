/* Shared by the site-wide enquiry form and the paid landing page form, so
   both accept exactly the same input. */

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 100;
export const PHONE_LENGTH = 10;

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required.";
  if (trimmed.length < NAME_MIN_LENGTH)
    return `Name must be at least ${NAME_MIN_LENGTH} characters.`;
  if (trimmed.length > NAME_MAX_LENGTH)
    return `Name must be at most ${NAME_MAX_LENGTH} characters.`;
  if (!/^[\p{L}\p{M}\s.'-]+$/u.test(trimmed))
    return "Name can only contain letters and valid characters.";
  return null;
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}\p{M}\s.'-]/gu, "");
}

export function validatePhone(phone: string): string | null {
  const digits = normalizePhone(phone);
  if (!digits) return "Phone number is required.";
  if (digits.length !== PHONE_LENGTH)
    return "Enter a valid 10-digit phone number.";
  if (!/^[6-9]\d{9}$/.test(digits))
    return "Enter a valid Indian mobile number.";
  return null;
}

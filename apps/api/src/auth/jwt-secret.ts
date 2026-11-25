/* One secret for signing and checking tokens. There is no fallback: a
   default value would let anyone who reads this code forge a login. */
export function jwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'JWT_SECRET must be set to a random value of at least 32 characters',
    );
  }
  return secret;
}

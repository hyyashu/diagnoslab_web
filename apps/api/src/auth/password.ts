import * as bcrypt from 'bcrypt';
import { timingSafeEqual } from 'crypto';

const ROUNDS = 12;
const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$/;

export const hashPassword = (plain: string) => bcrypt.hash(plain, ROUNDS);

/* Older accounts were saved with the password in plain text. They still
   log in; `needsRehash` tells the caller to replace the stored value with
   a bcrypt hash right away, so each account upgrades on its next login. */
export async function verifyPassword(
  plain: string,
  stored: string,
): Promise<{ ok: boolean; needsRehash: boolean }> {
  if (BCRYPT_HASH.test(stored)) {
    return { ok: await bcrypt.compare(plain, stored), needsRehash: false };
  }
  const a = Buffer.from(plain);
  const b = Buffer.from(stored);
  const ok = a.length === b.length && timingSafeEqual(a, b);
  return { ok, needsRehash: ok };
}

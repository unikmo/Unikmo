import { jwtVerify } from 'jose/jwt/verify';
import { getJwtSecret } from './jwt-secret';

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(getJwtSecret()), { algorithms: ['HS256'] });
    if (typeof payload.userId !== 'string' || typeof payload.email !== 'string' || !Array.isArray(payload.roles) || !payload.roles.every(role => typeof role === 'string')) return null;
    return { userId: payload.userId, email: payload.email, roles: payload.roles as string[] };
  } catch { return null; }
}

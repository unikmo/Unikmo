import { randomInt } from 'crypto';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function generateRetailPackBarcode(): string {
  let token = '';
  for (let i = 0; i < 8; i++) token += ALPHABET[randomInt(ALPHABET.length)];
  return `PK-${token.slice(0, 4)}-${token.slice(4)}`;
}

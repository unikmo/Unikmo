import { randomInt } from 'crypto';

export type Quantity = 1 | 4 | 7;
export type DeliveryType = 'digital' | 'physical' | 'split';
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function randomToken(length: number): string {
  let value = '';
  for (let i = 0; i < length; i++) value += ALPHABET[randomInt(ALPHABET.length)];
  return value;
}

/** New Moment Keys have no embedded product, quantity or delivery metadata. */
export function generateMomentCode(_quantity: Quantity, _deliveryType: DeliveryType): string {
  return randomToken(4) + '-' + randomToken(4);
}

/** Old codes remain valid; metadata for new codes must be read from the database. */
export function parseMomentCode(code: string): { quantity: Quantity; deliveryType: DeliveryType } | null {
  const match = code.toUpperCase().match(/^UNIKMO-[A-Z0-9]{4}-([147])([DPS])[A-Z0-9]{2}-[A-Z0-9]{3}$/);
  if (!match) return null;
  const deliveryType = { D: 'digital', P: 'physical', S: 'split' }[match[2]] as DeliveryType;
  return { quantity: Number(match[1]) as Quantity, deliveryType };
}
export function isMomentCodeFormat(code: string): boolean {
  return /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(code.toUpperCase()) || parseMomentCode(code) !== null;
}

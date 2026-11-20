/**
 * Generates eight-character private Moment Keys for all new purchases.
 * Legacy keys still work using the parser below.\n */

export type Quantity = 1 | 4 | 7;
export type DeliveryType = 'digital' | 'physical' | 'split';

/**
 * Generates a random alphanumeric string of specified length
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit easily confused glyphs
  const alphabetSize = chars.length; // 32 symbols, exact unbiased mapping
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, n => chars[n % alphabetSize]).join('');
}

/** New physical-card keys: eight cryptographically random, case-insensitive characters.
 * Card count and delivery type are persisted on MomentCode, not leaked in the key.
 * Legacy UNIKMO- prefixed keys remain valid and parseable below.
 */
export function generateMomentCode(_quantity: Quantity, _deliveryType: DeliveryType): string {
  return generateRandomString(8);
}

/**
 * Parses a Moment Code to extract quantity and delivery type
 * 
 * @param code - The Moment Code to parse
 * @returns Object with quantity and deliveryType, or null if invalid format
 */
export function parseMomentCode(code: string): { quantity: Quantity; deliveryType: DeliveryType } | null {
  const pattern = /^UNIKMO-[A-Z0-9]{4}-([147])([DPS])[A-Z0-9]{2}-[A-Z0-9]{3}$/;
  const match = code.toUpperCase().match(pattern);

  if (!match) {
    return null;
  }

  const quantity = parseInt(match[1]) as Quantity;
  const deliveryTypeCode = match[2];

  const deliveryTypeMapping: Record<string, DeliveryType> = {
    D: 'digital',
    P: 'physical',
    S: 'split',
  };

  const deliveryType = deliveryTypeMapping[deliveryTypeCode];

  if (!deliveryType) {
    return null;
  }

  return { quantity, deliveryType };
}

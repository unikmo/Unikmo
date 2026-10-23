/**
 * Generates new Moment Keys as XXXX-XXXX. Legacy keys remain supported by the parser.
 * Where:
 * - XXXX = 4 random alphanumeric characters
 * - Q = quantity (1, 4, or 7)
 * - D = deliveryType first letter (D=digital, P=physical, S=split)
 * - XX = 2 random alphanumeric characters
 * - XXX = 3 random alphanumeric characters
 */

export type Quantity = 1 | 4 | 7;
export type DeliveryType = 'digital' | 'physical' | 'split';

/**
 * Generates a random alphanumeric string of specified length
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const crypto = require('crypto') as typeof import('crypto');
  for (let i = 0; i < length; i++) {
    result += alphabet[crypto.randomInt(alphabet.length)];
  }
  return result;
}

/**
 * Gets the delivery type letter code
 */
function getDeliveryTypeCode(deliveryType: DeliveryType): string {
  const mapping: Record<DeliveryType, string> = {
    digital: 'D',
    physical: 'P',
    split: 'S',
  };
  return mapping[deliveryType];
}

/**
 * Generates a Moment Code with encoded quantity and delivery type
 * Format: UNIKMO-XXXX-[Q][D]XX-XXX
 * 
 * @param quantity - The quantity value (1, 4, or 7)
 * @param deliveryType - The delivery type (digital, physical, or split)
 * @returns A unique Moment Code string
 */
export function generateMomentCode(quantity: Quantity, deliveryType: DeliveryType): string {
  return `${generateRandomString(4)}-${generateRandomString(4)}`;
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

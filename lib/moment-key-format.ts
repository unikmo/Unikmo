/** Shared by browser entry fields and server checks; contains no Node imports. */
export function normalizeMomentKey(value: string): string {
  const key = value.toUpperCase().replace(/\s+/g, '').replace(/[\u2010-\u2015]/g, '-');
  return /^[A-HJ-NP-Z2-9]{8}$/.test(key) ? `${key.slice(0, 4)}-${key.slice(4)}` : key;
}

export function isMomentKeyFormat(value: string): boolean {
  const key = normalizeMomentKey(value);
  return /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/.test(key)
    || /^UNIKMO-[A-Z0-9]{4}-[147][DPS][A-Z0-9]{2}-[A-Z0-9]{3}$/.test(key);
}

import assert from 'node:assert/strict';
import { generateMomentCode, isMomentCodeFormat, parseMomentCode } from '../lib/code-generator';
import { generateRetailPackBarcode } from '../lib/retail-pack-barcode';

const keys = new Set<string>();
for (let i = 0; i < 10000; i++) {
  const key = generateMomentCode(1, 'physical');
  assert.match(key, /^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(isMomentCodeFormat(key), true);
  assert.equal(parseMomentCode(key), null);
  assert.equal(keys.has(key), false, 'Duplicate generated key');
  keys.add(key);
}
assert.deepEqual(parseMomentCode('UNIKMO-ABCD-1PAB-ABC'), { quantity: 1, deliveryType: 'physical' });
assert.equal(isMomentCodeFormat('UNIKMO-ABCD-1PAB-ABC'), true);
assert.equal(isMomentCodeFormat('BAD'), false);
const barcodes = new Set<string>();
for (let i = 0; i < 10000; i++) {
  const code = generateRetailPackBarcode();
  assert.match(code, /^PK-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/);
  assert.equal(barcodes.has(code), false, 'Duplicate barcode');
  barcodes.add(code);
}
console.log('Offline key and barcode generation checks passed (20,000 identifiers).');

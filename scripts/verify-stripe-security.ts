import {strict as assert} from 'node:assert';
import {createHmac} from 'node:crypto';
import {verifyStripeSignature} from '../lib/stripe-webhook-signature';
import {generateMomentCode,parseMomentCode} from '../lib/code-generator';
const secret='whsec_testsignature';
const now=Math.floor(Date.now()/1000);
const body='{"id":"evt_test","type":"checkout.session.completed"}';
const validSig=(time:number,raw:string)=>'t='+time+',v1='+createHmac('sha256',secret).update(time+'.'+raw).digest('hex');
assert.equal(verifyStripeSignature(body,validSig(now,body),secret,now),true);
assert.equal(verifyStripeSignature(body+'x',validSig(now,body),secret,now),false);
assert.equal(verifyStripeSignature(body,validSig(now-400,body),secret,now),false);
assert.equal(verifyStripeSignature(body,null,secret,now),false);
assert.equal(verifyStripeSignature(body,'t=bad,v1=aa',secret,now),false);
assert.equal(verifyStripeSignature(body,validSig(now,body),'whsec_wrong',now),false);
const seen=new Set<string>();
for(let i=0;i<1000;i++){
 const key=generateMomentCode(4,'physical');
 assert.match(key,/^[A-HJ-NP-Z2-9]{8}$/);
 assert.equal(seen.has(key),false,'CSPRNG collision in 1,000 generated keys');
 seen.add(key);
}
assert.equal(parseMomentCode('UNIKMO-ABCD-4P12-345')?.quantity,4,'historical codes remain parseable');
console.log('PASS: Stripe signature integrity, timestamp bounds, 8-character random keys, legacy parsing');

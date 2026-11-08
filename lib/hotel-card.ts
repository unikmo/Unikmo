import {randomInt} from 'crypto';
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const hotelCode=/^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$/;
export const hotelAccessToken=/^[A-HJ-NP-Z2-9]{12}$/;
export function newHotelToken(){return Array.from({length:12},()=>alphabet[randomInt(alphabet.length)]).join('')}
export function missingHotelFields(c:Record<string,unknown>):string[]{const missing=['hotelId','hotelName','logoUrl','guestReference','stayEndsAt'].filter(k=>!c[k]);if(!c.welcomeVideoUrl&&!c.welcomeMessage)missing.push('welcomeVideoUrl or welcomeMessage');return missing}
export function httpsUrl(s:string){try{const u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password&&!['localhost','127.0.0.1'].includes(u.hostname)}catch{return false}}
const url = 'https://unikmo.com/api/contact';
const id='UNIKMO-QA-20261123-POSTFIX';
const response=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:'mbanwie@gmail.com',message:`Production contact delivery diagnostic ${id}. This is an authorized internal test; no response needed.`}),signal:AbortSignal.timeout(30000)});
const text=await response.text();
console.log('CONTACT_PRODUCTION_CHECK',JSON.stringify({status:response.status,body:text.slice(0,500)}));
console.log('Note: HTTP 200 confirms the application received SMTP acceptance, not final inbox delivery.');

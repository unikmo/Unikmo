import Link from 'next/link';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Payment status | UNIKMO',robots:{index:false,follow:false}};
export default function CheckoutSuccess(){
 return <main className="min-h-screen bg-[#FCF9F4] px-6 py-24 text-center text-[#22323A]">
   <div className="mx-auto max-w-[640px]">
     <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B38846]">UNIKMO</p>
     <h1 className="mt-5 font-serif text-[40px] leading-tight">Less stuff. More us.</h1>
     <h2 className="mt-6 font-serif text-[26px]">Your payment is being confirmed.</h2>
     <p className="mt-4 text-[15px] leading-[1.75] text-[#22323A]/70">We send your order details and Moment Keys only after payment is verified. Check the email address you used at checkout. For curated orders, we will contact you about the next steps.</p>
     <p className="mt-5 text-[13px] text-[#22323A]/65">No email? Please <Link href="/contact" className="underline">contact us</Link> with the email used at checkout. Do not share your private keys with anyone else.</p>
     <Link href="/" className="mt-9 inline-flex rounded-lg bg-[#B38846] px-7 py-3 text-[12px] font-medium text-white">Back to UNIKMO</Link>
   </div>
 </main>;
}

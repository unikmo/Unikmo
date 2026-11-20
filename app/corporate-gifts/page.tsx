import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
export const metadata:Metadata={
 title:'Corporate gifts that mean more | UNIKMO',
 description:'Less stuff. More us. A personal message from your team in a beautiful physical keepsake. Corporate gifting enquiries.',
 alternates:{canonical:'https://www.unikmo.com/corporate-gifts'}
};
const moments=[
 {title:'Welcome them.',line:'A new colleague. A welcome that sounds human.',use:'Onboarding'},
 {title:'Thank them.',line:'A genuine thank-you. Not another branded mug.',use:'Client & partner gifts'},
 {title:'Celebrate them.',line:'A milestone deserves a voice behind it.',use:'Promotions & service anniversaries'},
 {title:'Close the year well.',line:'Make the message worth opening.',use:'Holiday & year-end gifts'}
];
export default function CorporateGiftsPage(){
 return <div className="min-h-screen bg-[#FCF9F4] text-[#22323A]">
   <header className="border-b border-[#22323A]/10 px-5 py-5 sm:px-8">
     <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4">
       <Link href="/" aria-label="UNIKMO home"><Image src="/unikmo-logo.svg" alt="UNIKMO" width={729} height={220} className="h-8 w-auto" /></Link>
       <Link href="/contact" className="rounded-lg bg-[#B38846] px-5 py-3 text-[12px] font-semibold text-white">Plan a gift</Link>
     </div>
   </header>
   <main>
     <section className="mx-auto max-w-[1000px] px-5 pb-16 pt-20 text-center sm:px-8">
       <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B38846]">UNIKMO for companies</p>
       <h1 className="mt-5 font-serif text-[44px] leading-[1.06] sm:text-[64px]">Less merch. More meaning.</h1>
       <p className="mx-auto mt-6 max-w-[680px] text-[17px] leading-[1.7] text-[#22323A]/70">
         Another corporate gift? Or a personal message they can actually hear?
         Give your team, clients or partners a moment made for them.
       </p>
       <p className="mx-auto mt-4 max-w-[640px] text-[13px] text-[#22323A]/60">A physical card opens a private video, voice note, photo or message. No app. No recipient account.</p>
       <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
         <Link href="/contact" className="rounded-lg bg-[#B38846] px-7 py-4 text-[12px] font-semibold text-white">Talk about corporate gifting</Link>
         <Link href="/how-unikmo-works" className="text-[12px] font-semibold underline decoration-[#B38846]/60 underline-offset-4">See how it works</Link>
       </div>
     </section>
     <section className="bg-[#F8F2EB] px-5 py-16 sm:px-8">
       <div className="mx-auto max-w-[1100px]">
         <h2 className="text-center font-serif text-[34px] sm:text-[44px]">The occasions change. The feeling stays.</h2>
         <div className="mt-10 grid gap-4 md:grid-cols-2">
           {moments.map(m=><article key={m.title} className="rounded-2xl border border-[#22323A]/10 bg-white/70 p-7">
             <p className="text-[11px] uppercase tracking-[0.15em] text-[#B38846]">{m.use}</p>
             <h3 className="mt-3 font-serif text-[27px]">{m.title}</h3><p className="mt-3 text-[15px] text-[#22323A]/70">{m.line}</p>
           </article>)}
         </div>
       </div>
     </section>
     <section className="mx-auto max-w-[830px] px-5 py-16 text-center sm:px-8">
       <h2 className="font-serif text-[36px]">Your words. Their moment.</h2>
       <p className="mt-5 text-[15px] leading-[1.75] text-[#22323A]/70">
         We can discuss quantities, personalization, delivery dates and any content-review needs. No public bulk price or delivery promise is made before we agree the scope.
       </p>
       <Link href="/contact" className="mt-8 inline-flex rounded-lg bg-[#22323A] px-7 py-4 text-[12px] font-medium text-white">Start a conversation</Link>
       <p className="mt-5 text-[12px] leading-[1.6] text-[#22323A]/60">Recipients need the private access code. Share it only with the intended person. Storage is not guaranteed forever. <Link href="/faq" className="underline">Full FAQ</Link>.</p>
     </section>
   </main>
   <SiteFooter/>
 </div>
}

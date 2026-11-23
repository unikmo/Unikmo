import type { Metadata } from 'next';
import LegalPageShell from '@/components/LegalPageShell';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | UNIKMO',
  description: 'Get in touch with the UNIKMO team about an order, a lost access code, Curated UNIKMO, or a privacy request.',
  alternates: { canonical: 'https://www.unikmo.com/contact' },
};

export default function ContactPage() {
  return (
    <LegalPageShell
      eyebrow="Get in touch"
      title="Contact"
      intro="Questions about an order, a lost access code, Curated UNIKMO, or a privacy request — send us a message and we'll reply by email."
    >
      <ContactForm />

    </LegalPageShell>
  );
}

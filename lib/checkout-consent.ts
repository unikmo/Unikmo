/**
 * Stripe Checkout terms consent (Sophie review, T3).
 * Stripe rejects `consent_collection.terms_of_service` unless a Terms URL is set in
 * Dashboard > Settings > Public details. To avoid breaking checkout before that is done,
 * the box is only requested when STRIPE_TERMS_CONSENT=on is set in Vercel.
 */
export function termsConsent() {
  if (process.env.STRIPE_TERMS_CONSENT !== 'on') return {};
  return {
    consent_collection: { terms_of_service: 'required' as const },
    custom_text: {
      terms_of_service_acceptance: {
        message:
          'I agree to the [Terms](https://www.unikmo.com/terms). I ask UNIKMO to start my order now, and I understand that I lose my right to cancel digital content once it is delivered, and a curated service once it is completed.',
      },
    },
  };
}

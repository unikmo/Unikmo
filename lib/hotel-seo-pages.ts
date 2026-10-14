import type { Metadata } from 'next';

export type HotelSeoPage = {
  slug: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  eyebrow: string;
  title: string;
  intro: string;
  situationTitle: string;
  situationCopy: string;
  benefitTitle: string;
  benefits: { title: string; copy: string }[];
  examplesTitle: string;
  examplesIntro: string;
  examples: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
  related: string[];
  metaTitle: string;
  metaDescription: string;
};

export const hotelSeoPages: Record<string, HotelSeoPage> = {
  'hotel-guest-experience': {
    slug: 'hotel-guest-experience',
    primaryKeyword: 'hotel guest experience',
    supportingKeywords: ['improve hotel guest experience', 'guest experience ideas for hotels', 'memorable hotel guest experience'],
    eyebrow: 'Guest experience that leaves the property with them',
    title: 'Turn a memorable hotel stay into something the guest can take home.',
    intro: 'UNIKMO gives hotels two simple ways to add a physical memory layer to the stay: hotel-branded or co-branded cards used by the property, and standard UNIKMO products guests can buy directly from the hotel.',
    situationTitle: 'The best stays already create moments worth remembering',
    situationCopy: 'A proposal, anniversary, honeymoon, family trip or milestone stay already has emotional value. UNIKMO gives that value a physical anchor without forcing the hotel to run a new content service. Guests can use their own photos and videos, while hotel photography remains an optional service controlled and priced by the property.',
    benefitTitle: 'Why it fits the guest journey',
    benefits: [
      { title: 'Seamless by default', copy: 'Guests can use their own photos, videos and messages with no hotel photography workflow at all.' },
      { title: 'A tangible hotel touchpoint', copy: 'Hotel-branded or co-branded cards become a physical reminder of the stay rather than another disposable note.' },
      { title: 'Upside without heavy operations', copy: 'Hotels can earn on UNIKMO retail and premium services while keeping photography entirely within their own operation.' },
    ],
    examplesTitle: 'Where the experience fits naturally',
    examplesIntro: 'UNIKMO is strongest where the stay already carries emotional or celebratory weight.',
    examples: [
      { title: 'Anniversary stay', copy: 'A couple can turn their own photos into a private memory, or add hotel photography if the property already offers it.' },
      { title: 'Proposal package', copy: 'The hotel can include a branded card in the package and keep the photography service entirely in-house.' },
      { title: 'VIP or milestone stay', copy: 'A co-branded keepsake can be gifted by the hotel while premium UNIKMO upgrades remain optional.' },
    ],
    faqs: [
      { question: 'Does the hotel need to create the guest memory?', answer: 'No. Guests can use their own photos, videos and messages just as they would with standard UNIKMO. The hotel only becomes involved in photography when it chooses to offer that separate service.' },
      { question: 'Can the hotel use its own branded card?', answer: 'Yes. Hotel-branded or co-branded cards are a separate B2B product supplied to the property for its own guest-experience use.' },
      { question: 'Can guests buy normal UNIKMO cards from the hotel?', answer: 'Yes. Hotels can sell standard UNIKMO products at UNIKMO retail prices and earn a 20% commission.' },
      { question: 'What happens if the guest wants professional curation or Times Square?', answer: 'The guest can order Curated UNIKMO or Show It through the hotel. The hotel earns 20% on those UNIKMO premium services.' },
    ],
    related: ['luxury-hotel-amenities', 'hotel-guest-gifts', 'hotel-upselling-ideas'],
    metaTitle: 'Hotel Guest Experience Ideas | UNIKMO for Hotels',
    metaDescription: 'Add a memorable hotel guest experience with branded keepsake cards, UNIKMO retail and optional premium curation. Built to fit the stay without adding heavy operations.',
  },

  'luxury-hotel-amenities': {
    slug: 'luxury-hotel-amenities',
    primaryKeyword: 'luxury hotel amenities',
    supportingKeywords: ['unique luxury hotel amenities', 'high end hotel amenities', 'premium hotel guest amenities'],
    eyebrow: 'An amenity with emotional value',
    title: 'A luxury hotel amenity guests can still value after checkout.',
    intro: 'UNIKMO adds a private memory layer to the stay through a physical card. Hotels can use a branded or co-branded version as an amenity, while guests who want more can buy standard UNIKMO products or premium services through the property.',
    situationTitle: 'Luxury is not only what is consumed during the stay',
    situationCopy: 'Many premium amenities disappear the moment the guest leaves. A keepsake tied to a proposal, anniversary, honeymoon or milestone stay can extend the experience beyond checkout and keep the property connected to the memory.',
    benefitTitle: 'A premium amenity without becoming another hotel system',
    benefits: [
      { title: 'Physical and personal', copy: 'The card has a premium physical presence, while the memory behind it is created from the guest’s own material.' },
      { title: 'Brandable', copy: 'Properties can use hotel-branded or co-branded versions for selected rooms, packages or VIP stays.' },
      { title: 'Commercially flexible', copy: 'The card can be gifted as an amenity while standard UNIKMO and premium upgrades remain commissionable retail offers.' },
    ],
    examplesTitle: 'How luxury properties can use it',
    examplesIntro: 'Use the card where the property already invests in making the stay feel distinctive.',
    examples: [
      { title: 'Suite welcome', copy: 'Place a hotel-branded card with selected suite or VIP stays as a memorable alternative to another disposable amenity.' },
      { title: 'Romance package', copy: 'Include the card in an anniversary, honeymoon or proposal package and let the guest decide what memory to create.' },
      { title: 'Guest relations', copy: 'Offer standard UNIKMO retail when a guest wants additional cards, curation or a Times Square upgrade.' },
    ],
    faqs: [
      { question: 'Is UNIKMO a replacement for traditional hotel amenities?', answer: 'Not necessarily. It works best as an additional memory-focused amenity for stays where the emotional experience matters.' },
      { question: 'Can the card carry the hotel brand?', answer: 'Yes. Hotel-branded and co-branded card configurations are part of the hotel model.' },
      { question: 'What does the hotel pay for hotel-branded cards?', answer: 'The current partner model is approximately $4–5 per hotel or co-branded card, depending on the final configuration and volume.' },
      { question: 'Does UNIKMO arrange hotel photography?', answer: 'No. If a hotel offers photography, the hotel arranges it, prices it and keeps that revenue.' },
    ],
    related: ['hotel-guest-experience', 'boutique-hotel-amenities', 'hotel-branded-keepsake-cards'],
    metaTitle: 'Luxury Hotel Amenities & Guest Keepsakes | UNIKMO',
    metaDescription: 'A luxury hotel amenity guests can keep: branded or co-branded UNIKMO cards, optional retail products and premium memory services for milestone stays.',
  },

  'boutique-hotel-amenities': {
    slug: 'boutique-hotel-amenities',
    primaryKeyword: 'boutique hotel amenities',
    supportingKeywords: ['unique boutique hotel amenities', 'boutique hotel guest experience', 'boutique hotel gift ideas'],
    eyebrow: 'A small property can create a very personal stay',
    title: 'A boutique hotel amenity that feels specific to the guest.',
    intro: 'UNIKMO helps boutique properties turn the intimacy of the stay into a keepsake. Use hotel-branded cards for selected guests or let guests buy standard UNIKMO products directly from the property.',
    situationTitle: 'Boutique hotels compete on character, not scale',
    situationCopy: 'A smaller property often wins because the experience feels more personal. UNIKMO supports that strength: the hotel provides the physical touchpoint, while the guest decides what private photos, videos or messages belong inside the memory.',
    benefitTitle: 'Built for personal hospitality',
    benefits: [
      { title: 'Works without a new department', copy: 'The standard guest flow uses the guest’s own content and does not require the hotel to create the memory.' },
      { title: 'Feels native to boutique service', copy: 'A hotel-branded card can sit naturally inside a welcome, romance or milestone package.' },
      { title: 'Creates a retail path', copy: 'Guests who like the idea can buy standard UNIKMO cards or premium upgrades through the property.' },
    ],
    examplesTitle: 'Boutique use cases',
    examplesIntro: 'The strongest use cases are moments where staff already know the stay matters.',
    examples: [
      { title: 'Proposal weekend', copy: 'Include a branded card in the package and keep photography as the hotel’s own optional service.' },
      { title: 'Anniversary return', copy: 'Give repeat guests a co-branded keepsake tied to the property they chose again.' },
      { title: 'Local experience stay', copy: 'Let guests turn their own images from the destination into a private memory connected to the hotel.' },
    ],
    faqs: [
      { question: 'Does this require a large hotel operation?', answer: 'No. The core guest experience can run with the guest’s own content. Hotels only add photography if they already want to offer it.' },
      { question: 'Can a small property order branded cards?', answer: 'Yes. Final pricing and minimum quantities should be confirmed with UNIKMO based on the card configuration and volume.' },
      { question: 'How does the hotel make money on standard UNIKMO?', answer: 'The hotel sells at UNIKMO’s published retail price and earns a 20% commission.' },
      { question: 'Can a guest order Curated or Times Square from the hotel?', answer: 'Yes. Those premium UNIKMO services can be sold through the property, with a 20% commission to the hotel.' },
    ],
    related: ['luxury-hotel-amenities', 'hotel-guest-gifts', 'hotel-proposal-packages'],
    metaTitle: 'Boutique Hotel Amenities & Guest Experience Ideas | UNIKMO',
    metaDescription: 'Give boutique hotel guests a personal keepsake with branded UNIKMO cards, retail products and optional premium memory upgrades.',
  },

  'hotel-guest-gifts': {
    slug: 'hotel-guest-gifts',
    primaryKeyword: 'hotel guest gifts',
    supportingKeywords: ['hotel welcome gifts', 'luxury hotel welcome gifts', 'gifts for hotel guests'],
    eyebrow: 'A guest gift built around their own memory',
    title: 'Hotel guest gifts should feel connected to the stay.',
    intro: 'Instead of giving every guest the same generic object, a hotel-branded UNIKMO card gives the guest a private place for the photos, videos and messages that made their stay matter.',
    situationTitle: 'The most meaningful guest gift is often not another branded object',
    situationCopy: 'A bottle, snack or toiletry may be appreciated and then consumed. A keepsake tied to the guest’s own anniversary, honeymoon, proposal or milestone trip has a different role: it becomes part of the story of the stay.',
    benefitTitle: 'Why a memory card works as a hotel guest gift',
    benefits: [
      { title: 'Personal without hotel content production', copy: 'The guest can use their own photos and videos, so the hotel does not need to build the memory for them.' },
      { title: 'Branded without being promotional', copy: 'The hotel can be present on the physical card without turning the guest’s private memory into an advertisement.' },
      { title: 'Upgradeable', copy: 'Guests can later choose standard UNIKMO cards, professional curation or Times Square through the property.' },
    ],
    examplesTitle: 'Guest-gift moments worth targeting',
    examplesIntro: 'Use the gift selectively where the emotional value of the stay is already high.',
    examples: [
      { title: 'Honeymoon welcome', copy: 'A hotel-branded card gives the couple a private place for the moments they capture during the stay.' },
      { title: 'Anniversary recognition', copy: 'Add the card to the room setup as a keepsake rather than another one-night-only gesture.' },
      { title: 'VIP surprise', copy: 'Use a co-branded card as a small premium gift that can carry a much larger personal memory.' },
    ],
    faqs: [
      { question: 'Can hotels give UNIKMO cards as complimentary guest gifts?', answer: 'Yes. Hotel-branded or co-branded cards are intended for the property’s own use and can be included in selected stays or packages.' },
      { question: 'Can guests buy additional UNIKMO cards?', answer: 'Yes. Standard UNIKMO products can be sold through the hotel at UNIKMO retail prices, with the hotel earning 20% commission.' },
      { question: 'Can the hotel add its own photography offer?', answer: 'Yes. Photography remains the hotel’s own service. UNIKMO does not arrange the photographer or take a share of that hotel service.' },
      { question: 'Can the guest use only their own pictures?', answer: 'Yes. That is the simplest default flow and does not require a hotel photography process.' },
    ],
    related: ['hotel-guest-experience', 'hotel-welcome-gifts', 'hotel-anniversary-packages'],
    metaTitle: 'Hotel Guest Gifts & Welcome Gift Ideas | UNIKMO',
    metaDescription: 'Create a hotel guest gift tied to the stay with branded UNIKMO keepsake cards, guest-created memories and optional premium upgrades.',
  },

  'hotel-welcome-gifts': {
    slug: 'hotel-welcome-gifts',
    primaryKeyword: 'hotel welcome gifts',
    supportingKeywords: ['hotel welcome gifts for guests', 'luxury hotel welcome gifts', 'hotel room welcome gift ideas'],
    eyebrow: 'A welcome gift with a life after checkout',
    title: 'Turn the hotel welcome gift into a keepsake, not another consumable.',
    intro: 'A hotel-branded UNIKMO card can sit naturally in the room or inside a celebration package. The guest can use it with their own photos and videos during the stay, then take the card home.',
    situationTitle: 'A welcome gift can introduce an experience rather than end at arrival',
    situationCopy: 'Traditional welcome gifts are often appreciated once. UNIKMO gives the hotel a way to introduce a private memory experience that the guest can build throughout the stay and revisit later.',
    benefitTitle: 'A welcome gift that stays simple for the hotel',
    benefits: [
      { title: 'Place it and let the guest choose', copy: 'The card can explain the idea without forcing a sales conversation at check-in.' },
      { title: 'Use your own brand', copy: 'Hotel-branded and co-branded cards can fit the visual language of the property.' },
      { title: 'Create optional revenue', copy: 'Guests who want standard UNIKMO, Curated or Show It can purchase through the property.' },
    ],
    examplesTitle: 'Where it can sit in the stay',
    examplesIntro: 'The card can be a complimentary amenity, part of a package or a discovery point for further UNIKMO products.',
    examples: [
      { title: 'In-room welcome', copy: 'Place the card with the room setup so the guest discovers it on their own.' },
      { title: 'Celebration package', copy: 'Include it alongside champagne, flowers or another hotel-arranged experience.' },
      { title: 'Front desk retail', copy: 'Keep standard UNIKMO products available for guests who want additional cards to take home.' },
    ],
    faqs: [
      { question: 'Does the guest have to decide at check-in?', answer: 'No. The card can simply be waiting in the room so the guest discovers the idea without a front-desk pitch.' },
      { question: 'Can the hotel co-brand the card?', answer: 'Yes. Co-branded and hotel-branded cards are part of the B2B hotel offer.' },
      { question: 'What if the guest wants more than the complimentary card?', answer: 'The hotel can sell standard UNIKMO products at the official retail price and earn 20% commission.' },
      { question: 'Can Curated or Times Square be added later?', answer: 'Yes. Those premium services can be ordered through the property, with the hotel receiving 20% commission.' },
    ],
    related: ['hotel-guest-gifts', 'luxury-hotel-amenities', 'hotel-guest-experience'],
    metaTitle: 'Hotel Welcome Gifts for Guests | UNIKMO',
    metaDescription: 'A hotel welcome gift guests can take home: branded UNIKMO keepsake cards with optional retail, curation and Times Square upgrades.',
  },

  'hotel-upselling-ideas': {
    slug: 'hotel-upselling-ideas',
    primaryKeyword: 'hotel upselling ideas',
    supportingKeywords: ['hotel upselling', 'hotel upselling techniques', 'hotel ancillary revenue ideas'],
    eyebrow: 'Upsell around moments, not pressure',
    title: 'Hotel upselling works better when the extra belongs to the stay.',
    intro: 'UNIKMO gives hotels a low-friction upsell path around experiences guests already care about: anniversary stays, proposals, honeymoons, milestone trips and keepsakes they can take home.',
    situationTitle: 'The best upsell feels like an extension of what the guest already chose',
    situationCopy: 'A generic add-on can feel transactional. A memory product tied to a celebration or meaningful stay is easier to understand because the value is emotional and specific to the guest’s trip.',
    benefitTitle: 'Four ways UNIKMO can sit inside hotel upselling',
    benefits: [
      { title: 'Standard UNIKMO retail', copy: 'Sell standard cards at UNIKMO retail prices and earn 20% commission.' },
      { title: 'Curated UNIKMO', copy: 'Offer professional curation at $250 when the guest wants UNIKMO to assemble the finished memory.' },
      { title: 'Show It — Times Square', copy: 'Offer the $450 Times Square experience and earn a 20% commission when the order comes through the property.' },
    ],
    examplesTitle: 'Upsells that stay clearly separated',
    examplesIntro: 'UNIKMO should not take over services the hotel already owns.',
    examples: [
      { title: 'Photography', copy: 'The hotel can offer and price photography directly. The guest pays the hotel and the hotel keeps that revenue.' },
      { title: 'UNIKMO retail', copy: 'Standard UNIKMO products remain priced by UNIKMO; the hotel earns 20% commission on the sale.' },
      { title: 'Premium UNIKMO', copy: 'Curated and Show It remain UNIKMO-delivered services, with 20% commission to the hotel.' },
    ],
    faqs: [
      { question: 'Does the hotel have to buy standard UNIKMO stock?', answer: 'No. Standard UNIKMO cards are a commission retail channel rather than the hotel-branded wholesale card model.' },
      { question: 'Can the hotel change the retail price?', answer: 'No. Standard UNIKMO products should be sold at UNIKMO’s published prices so the channel stays consistent.' },
      { question: 'How much does the hotel earn on Curated?', answer: 'At the current $250 price, a 20% hotel commission is $50 when the order is attributed to the property.' },
      { question: 'How much does the hotel earn on Show It?', answer: 'At the current $450 price, a 20% hotel commission is $90 when the order is attributed to the property.' },
    ],
    related: ['hotel-ancillary-revenue', 'hotel-guest-experience', 'hotel-proposal-packages'],
    metaTitle: 'Hotel Upselling Ideas & Guest Experience Revenue | UNIKMO',
    metaDescription: 'Explore hotel upselling ideas built around guest memories: UNIKMO retail, $250 curation, $450 Times Square experiences and hotel-owned photography.',
  },

  'hotel-anniversary-packages': {
    slug: 'hotel-anniversary-packages',
    primaryKeyword: 'hotel anniversary package',
    supportingKeywords: ['anniversary hotel package ideas', 'romantic hotel anniversary package', 'anniversary guest experience'],
    eyebrow: 'Add a memory layer to the anniversary stay',
    title: 'Make the hotel anniversary package last beyond checkout.',
    intro: 'A hotel-branded UNIKMO card can sit inside an anniversary package alongside the property’s existing room setup, dining, flowers, photography or other experiences.',
    situationTitle: 'The stay already contains the material for the keepsake',
    situationCopy: 'The couple is already taking photos, recording small moments and marking the occasion. UNIKMO gives those moments a private place to live without forcing the hotel to create the content.',
    benefitTitle: 'How UNIKMO fits an anniversary package',
    benefits: [
      { title: 'Include a hotel card', copy: 'Use a branded or co-branded card as part of the package from approximately $4–5 per card.' },
      { title: 'Keep photography separate', copy: 'If the hotel offers anniversary photography, it remains entirely the hotel’s own service and revenue.' },
      { title: 'Offer premium memory upgrades', copy: 'Guests can add Curated UNIKMO or Show It through the property, generating a 20% commission.' },
    ],
    examplesTitle: 'Package combinations',
    examplesIntro: 'UNIKMO complements the package rather than replacing what the hotel already sells.',
    examples: [
      { title: 'Room + dinner + UNIKMO', copy: 'A simple package where the couple creates the memory using their own content.' },
      { title: 'Photography + UNIKMO', copy: 'The hotel captures the stay through its own photography service; the guest can use those images inside UNIKMO.' },
      { title: 'Curated or Times Square', copy: 'The couple upgrades when they want UNIKMO to assemble the finished story or take the moment public.' },
    ],
    faqs: [
      { question: 'Does the hotel need a photographer for the package?', answer: 'No. Guests can use their own photos and videos. Photography is optional and remains the hotel’s own service if offered.' },
      { question: 'Can the UNIKMO card be branded for the hotel?', answer: 'Yes. Hotel-branded or co-branded cards are designed for the property’s own use in packages and guest experiences.' },
      { question: 'Can guests buy more cards?', answer: 'Yes. Standard UNIKMO retail can be sold through the hotel for a 20% commission.' },
      { question: 'Can anniversary guests add Times Square?', answer: 'Yes. Show It is currently priced at $450, with a 20% hotel commission when sold through the property.' },
    ],
    related: ['hotel-proposal-packages', 'hotel-guest-gifts', 'luxury-hotel-amenities'],
    metaTitle: 'Hotel Anniversary Package Ideas | UNIKMO for Hotels',
    metaDescription: 'Add a memorable keepsake to hotel anniversary packages with branded UNIKMO cards, optional hotel photography, curation and Times Square upgrades.',
  },

  'hotel-proposal-packages': {
    slug: 'hotel-proposal-packages',
    primaryKeyword: 'hotel proposal package',
    supportingKeywords: ['proposal package hotel', 'romantic proposal package', 'hotel proposal ideas'],
    eyebrow: 'Preserve the moment after the yes',
    title: 'Add a private keepsake to the hotel proposal package.',
    intro: 'The hotel creates the setting. UNIKMO gives the couple a way to keep the moment. A branded card can be part of the package, while photography remains fully controlled and sold by the hotel.',
    situationTitle: 'A proposal is already one of the highest-value emotional moments in hospitality',
    situationCopy: 'Hotels often provide the room setup, flowers, dinner, terrace, photographer or proposal coordination. UNIKMO does not replace those services. It gives the couple a physical key back to the photos, videos and messages connected to the moment.',
    benefitTitle: 'A clean fit with existing proposal services',
    benefits: [
      { title: 'Hotel card in the package', copy: 'Add a hotel-branded or co-branded UNIKMO card without changing the proposal workflow.' },
      { title: 'Photography stays with the hotel', copy: 'The property arranges the photographer, charges the guest and keeps the photography revenue.' },
      { title: 'Premium after the moment', copy: 'The couple can upgrade to Curated or Show It through the hotel if they want a professionally assembled or public Times Square experience.' },
    ],
    examplesTitle: 'Proposal package layers',
    examplesIntro: 'Keep each service owner clear so the guest journey stays simple.',
    examples: [
      { title: 'Hotel setup', copy: 'Location, flowers, champagne, dinner and other proposal elements remain the hotel’s package.' },
      { title: 'Photography', copy: 'Optional photography remains the hotel’s service, including its consent, supplier and pricing process.' },
      { title: 'UNIKMO keepsake', copy: 'The card becomes the private place where the couple can keep their chosen proposal moments.' },
    ],
    faqs: [
      { question: 'Does UNIKMO arrange the proposal photographer?', answer: 'No. The hotel arranges and sells photography if it chooses to offer it.' },
      { question: 'Can the couple use their own photos instead?', answer: 'Yes. That is the default low-friction path and does not require a hotel photography workflow.' },
      { question: 'Can the hotel include its own branded card?', answer: 'Yes. Hotel-branded or co-branded cards can be included directly in the proposal package.' },
      { question: 'What premium UNIKMO upgrades are available?', answer: 'Curated UNIKMO is $250 and Show It — Times Square is $450. The hotel earns 20% when those services are sold through the property.' },
    ],
    related: ['hotel-anniversary-packages', 'hotel-upselling-ideas', 'hotel-guest-experience'],
    metaTitle: 'Hotel Proposal Package Ideas & Keepsakes | UNIKMO',
    metaDescription: 'Add a private keepsake to hotel proposal packages while keeping photography with the hotel. Branded cards, curation and Times Square upgrades from UNIKMO.',
  },

  'hotel-ancillary-revenue': {
    slug: 'hotel-ancillary-revenue',
    primaryKeyword: 'hotel ancillary revenue',
    supportingKeywords: ['hotel ancillary revenue ideas', 'hotel incremental revenue', 'hotel guest revenue opportunities'],
    eyebrow: 'Incremental revenue tied to guest experience',
    title: 'Create hotel ancillary revenue without turning the stay into a sales funnel.',
    intro: 'UNIKMO gives hotels a clear separation between property-owned services and UNIKMO products. Hotels keep their own photography revenue and earn commission when guests buy standard UNIKMO, Curated or Show It through the property.',
    situationTitle: 'Ancillary revenue works best when the offer belongs to the reason for the stay',
    situationCopy: 'A couple celebrating an anniversary or proposal already has a strong reason to preserve the moment. UNIKMO monetizes that natural intent without forcing the hotel to build a new digital product or outsource its existing services.',
    benefitTitle: 'Three revenue paths, clearly separated',
    benefits: [
      { title: 'Hotel-owned services', copy: 'Photography and other property services stay fully under hotel control, including pricing and revenue.' },
      { title: 'UNIKMO retail commission', copy: 'Hotels earn 20% on standard UNIKMO products sold through the property at official UNIKMO prices.' },
      { title: 'Premium-service commission', copy: 'Hotels earn 20% on Curated and Show It orders attributed to the property.' },
    ],
    examplesTitle: 'What the economics can look like',
    examplesIntro: 'The model keeps the hotel’s existing business separate from UNIKMO-delivered products.',
    examples: [
      { title: 'Hotel card inventory', copy: 'Hotel-branded or co-branded cards are purchased by the property at approximately $4–5 per card for its own guest-experience use.' },
      { title: 'Curated UNIKMO', copy: 'At $250 retail, the current 20% hotel commission is $50 per attributed order.' },
      { title: 'Show It', copy: 'At $450 retail, the current 20% hotel commission is $90 per attributed order.' },
    ],
    faqs: [
      { question: 'Does UNIKMO take a share of hotel photography revenue?', answer: 'No. Photography is the hotel’s own service. The guest pays the hotel and the hotel keeps that revenue.' },
      { question: 'How are standard UNIKMO products priced?', answer: 'They should be sold at UNIKMO’s published retail prices so the guest sees the same pricing across channels.' },
      { question: 'What commission does the hotel receive?', answer: 'The current model is 20% on standard UNIKMO retail and on UNIKMO premium services sold through or attributed to the property.' },
      { question: 'Are hotel-branded cards the same as retail UNIKMO cards?', answer: 'No. Hotel or co-branded cards are a separate B2B inventory product purchased by the property for its own use.' },
    ],
    related: ['hotel-upselling-ideas', 'hotel-branded-keepsake-cards', 'hotel-guest-experience'],
    metaTitle: 'Hotel Ancillary Revenue Ideas | UNIKMO for Hotels',
    metaDescription: 'Add hotel ancillary revenue through UNIKMO retail and premium-service commissions while keeping hotel photography and property services fully in-house.',
  },

  'hotel-branded-keepsake-cards': {
    slug: 'hotel-branded-keepsake-cards',
    primaryKeyword: 'hotel branded keepsake cards',
    supportingKeywords: ['custom hotel amenities', 'branded hotel guest gifts', 'co-branded hotel cards'],
    eyebrow: 'Your property on the physical keepsake',
    title: 'Hotel-branded keepsake cards for stays guests want to remember.',
    intro: 'UNIKMO can supply hotel-branded or co-branded cards as a separate B2B product. The property can use them as an amenity, package inclusion or guest-experience touchpoint while giving guests access to the UNIKMO memory flow.',
    situationTitle: 'Brand the physical object without taking over the guest’s private memory',
    situationCopy: 'The hotel’s name belongs naturally on the keepsake because the stay is part of the story. The private content remains chosen by the guest, while the hotel controls how and where the physical card is used.',
    benefitTitle: 'What makes the hotel card different from standard UNIKMO retail',
    benefits: [
      { title: 'Purchased by the property', copy: 'Hotel or co-branded cards are supplied at approximately $4–5 per card depending on configuration and volume.' },
      { title: 'Used by the hotel', copy: 'The property can gift or include them in selected stays and packages rather than selling them as standard UNIKMO retail.' },
      { title: 'Key generation access', copy: 'Hotel partners receive access to generate the UNIKMO keys needed for the cards they issue.' },
    ],
    examplesTitle: 'Where branded cards can be used',
    examplesIntro: 'The card can be part of the hotel experience without becoming an advertisement inside the guest’s private memory.',
    examples: [
      { title: 'VIP amenity', copy: 'Give selected guests a premium branded keepsake tied to the property.' },
      { title: 'Proposal or anniversary package', copy: 'Include the card as one element of a larger package run by the hotel.' },
      { title: 'Co-branded partnership', copy: 'Use UNIKMO and hotel branding together where both identities help explain the experience.' },
    ],
    faqs: [
      { question: 'How much do hotel-branded cards cost?', answer: 'The current target partner range is approximately $4–5 per card, with final pricing dependent on configuration and volume.' },
      { question: 'Can the hotel generate the keys?', answer: 'Yes. The hotel model includes partner access for generating keys for cards the property issues.' },
      { question: 'Are these the same as standard UNIKMO retail cards?', answer: 'No. Standard UNIKMO retail products are sold on commission at official retail prices. Hotel-branded cards are purchased by the property for its own use.' },
      { question: 'Can the guest still buy standard UNIKMO later?', answer: 'Yes. Hotels can offer standard UNIKMO products as a separate retail channel and earn 20% commission.' },
    ],
    related: ['luxury-hotel-amenities', 'hotel-guest-gifts', 'hotel-ancillary-revenue'],
    metaTitle: 'Hotel-Branded Keepsake Cards & Custom Amenities | UNIKMO',
    metaDescription: 'Hotel-branded and co-branded UNIKMO keepsake cards for guest amenities, proposal packages, anniversaries and VIP stays.',
  },

  'resort-guest-experience': {
    slug: 'resort-guest-experience',
    primaryKeyword: 'resort guest experience',
    supportingKeywords: ['resort guest experience ideas', 'resort amenities', 'resort guest gifts'],
    eyebrow: 'A memory layer for experience-led stays',
    title: 'Give resort guests a physical key back to the moments they created.',
    intro: 'Resorts generate more guest moments than almost any other hospitality format: celebrations, excursions, family time, proposals, anniversaries and destination experiences. UNIKMO gives those moments a private physical anchor.',
    situationTitle: 'The destination creates the content naturally',
    situationCopy: 'Guests already leave a resort with hundreds of photos and videos. UNIKMO gives them a deliberate way to turn selected moments into something they can keep, without asking the resort to become a content-production company.',
    benefitTitle: 'Why the model suits resorts',
    benefits: [
      { title: 'Guest-created by default', copy: 'The guest can use their own content from the stay, excursions and celebrations.' },
      { title: 'Optional hotel services stay local', copy: 'Photography, excursions and other resort services remain owned, priced and delivered by the property.' },
      { title: 'Premium upgrades travel well', copy: 'Curated and Show It can be sold through the resort even when the final memory is completed after checkout.' },
    ],
    examplesTitle: 'Resort use cases',
    examplesIntro: 'The strongest applications connect UNIKMO to experiences the resort already sells.',
    examples: [
      { title: 'Honeymoon stay', copy: 'A branded card can be part of the honeymoon package while the couple uses its own photos or optional resort photography.' },
      { title: 'Excursion memories', copy: 'Guests can include photos and videos from diving, safari, sailing or other resort-arranged experiences.' },
      { title: 'Family milestone', copy: 'A multi-generational trip can become a shared memory with additional keepsake cards for family members.' },
    ],
    faqs: [
      { question: 'Does the resort need to collect the guest’s photos?', answer: 'No. Guests can add their own content directly to their UNIKMO experience.' },
      { question: 'Can resort photographers contribute images?', answer: 'Yes, when the guest uses the resort’s photography service. The photography relationship and payment remain with the resort.' },
      { question: 'Can guests buy additional UNIKMO products at the resort?', answer: 'Yes. Standard UNIKMO retail can be sold through the property for a 20% commission.' },
      { question: 'Can Curated or Times Square be sold from a resort?', answer: 'Yes. Both can be sold through the property as UNIKMO premium services, with a 20% hotel commission.' },
    ],
    related: ['hotel-guest-experience', 'luxury-hotel-amenities', 'hotel-anniversary-packages'],
    metaTitle: 'Resort Guest Experience & Keepsake Ideas | UNIKMO',
    metaDescription: 'Add a private keepsake to the resort guest experience with branded UNIKMO cards, guest-created memories and optional premium upgrades.',
  },
};

export function buildHotelSeoMetadata(page: HotelSeoPage): Metadata {
  const url = `https://www.unikmo.com/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: 'UNIKMO',
      type: 'website',
      images: ['https://www.unikmo.com/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: ['https://www.unikmo.com/og-image.jpg'],
    },
  };
}

/* Trip N Travel site configuration.
   Phone numbers, WhatsApp links, company details and tracking IDs are read
   from this file. Do not hard-code them in pages. */
const TNT = {
  legalName: 'TRIPNTRAVEL PRIVATE LTD',
  tradingName: 'Trip N Travel',
  companyNumber: '16525641',
  registeredIn: 'England and Wales',
  registeredOffice: '36 Scotts Road, Bromley, Kent, BR1 3QD',
  address: {
    streetAddress: '36 Scotts Road',
    addressLocality: 'Bromley',
    addressRegion: 'Kent',
    postalCode: 'BR1 3QD',
    addressCountry: 'GB'
  },
  vatRegistered: false,
  ptsMemberId: '6393',
  phone: '+44 20 4538 5838',
  whatsapp: '447752340248',
  whatsappDisplay: '+44 7752 340248',
  email: '{{PLACEHOLDER: contact email}}',
  founderName: 'Raja Ali',
  founderBase: 'Bristol',
  founderPhoto: '',
  contactHours: 'Messages answered 9am–8pm, 7 days',
  /* Unverified opening hours stay off the public pages until confirmed. */
  showContactHours: false,
  siteUrl: 'https://tripntravel.co.uk',
  ga4Id: 'G-T3VGVEDZ7V',
  metaPixelId: '{{PLACEHOLDER: Meta Pixel ID}}',
  tiktokPixelId: '{{PLACEHOLDER: TikTok Pixel ID}}',
  hubspotPortalId: '{{PLACEHOLDER: HubSpot portal ID}}',
  hubspotFormId: '{{PLACEHOLDER: HubSpot form ID}}',
  showAtolWording: false,
  showPtsLine: false,
  extraDestinations: [],
  hubspotEnabled: false,
  /* Internal preview only. Public pages keep {{PLACEHOLDER}} and {{VERIFY}} blocks hidden. */
  showPlaceholderBlocks: false,
  /* Public instalment wording stays the quote line until terms are confirmed in writing. */
  instalmentTermsConfirmed: false,
  socialUrls: {
    facebook: '',
    instagram: '',
    whatsapp: ''
  },
  googleRating: null,
  priceMaxAgeDays: 7,
  standardDepositLabel: '{{PLACEHOLDER: standard deposit}}',
  balanceDueWeeksLabel: '{{PLACEHOLDER: balance due weeks, default 10}}',
  balanceDueWeeksDefault: 10,
  instalmentPublicLine: 'Spread the cost with a deposit and instalments',
  askForQuote: 'Ask for a current quote',
  instalmentVerify: '{{VERIFY: instalment terms in writing}}',
  /* Shown only when showPtsLine is true. */
  ptsLine: 'Member of Protected Trust Services, membership 6393.',
  /* Shown only when showAtolWording is true. No logo and no ATOL number. */
  atolWording: 'Flight-inclusive holidays are ATOL protected by the tour operator.',
  atolDealLine: 'ATOL protected by the tour operator',
  aiDisclosure: "You'll chat with our AI travel assistant first; a travel adviser can take over whenever you like.",
  heroHeadline: 'Holidays planned for you, on WhatsApp',
  heroSub: 'Budget adventures, faith and heritage trips, and romantic escapes. Tell us what you want and we will put together options.'
};

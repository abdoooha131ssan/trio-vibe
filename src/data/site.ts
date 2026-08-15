import { media, type MediaKey } from "./media";

export const CONTACT = {
  whatsapp: "https://wa.me/201094262726",
  phoneDisplay: "+20 109 426 2726",
  email: "triiovibe@gmail.com",
  mailto: "mailto:triiovibe@gmail.com",
  instagram: "https://www.instagram.com/triio_vibe/",
  facebook: "https://www.facebook.com/share/1Ew3LBxjUp/?mibextid=wwXIfr",
} as const;

export const NAV = [
  { label: "Results", href: "#results" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Trio", href: "#trio" },
  { label: "Contact", href: "#contact" },
] as const;

/** Verified performance proof carried over from the team's documented cases. */
export const STATS = [
  { value: 12, suffix: "×", prefix: "", label: "Best ROAS", note: "Documented campaign peak" },
  { value: 7.5, suffix: " SAR", prefix: "", label: "Lowest CPA", note: "Cost per acquisition", decimals: 1 },
  { value: 158, suffix: "K+ SAR", prefix: "", label: "Generated Sales", note: "Khadija case" },
  { value: 4, suffix: "+", prefix: "", label: "Featured Campaigns", note: "Performance cases" },
] as const;

export type Service = {
  title: string;
  description: string;
  group: "Brand" | "Content" | "Growth";
};

export const SERVICES: Service[] = [
  {
    title: "Logo Design",
    description: "Marks built to survive scale — from a storefront sign down to a 32px avatar.",
    group: "Brand",
  },
  {
    title: "Brand Identity",
    description: "Type, colour, layout and rules that make every asset recognisably yours.",
    group: "Brand",
  },
  {
    title: "Branding Strategy",
    description: "Positioning, tone and message architecture defined before a single pixel moves.",
    group: "Brand",
  },
  {
    title: "Social Media Design",
    description: "Feed systems designed as a set, not as one-off posts that drift apart.",
    group: "Content",
  },
  {
    title: "Social Media Management",
    description: "Planning, publishing and community rhythm kept consistent month over month.",
    group: "Content",
  },
  {
    title: "Content Creation",
    description: "Copy, art direction and production shaped around what the platform rewards.",
    group: "Content",
  },
  {
    title: "Video Editing",
    description: "Pacing, sound and grade that hold attention past the first three seconds.",
    group: "Content",
  },
  {
    title: "Reels / Short-form",
    description: "Vertical formats written for the hook and cut for the retention curve.",
    group: "Content",
  },
  {
    title: "Paid Advertising",
    description: "Campaign structures, audiences and creative testing tied to profit, not vanity reach.",
    group: "Growth",
  },
  {
    title: "Media Buying",
    description: "Budget allocation and bidding decisions managed against tracked return.",
    group: "Growth",
  },
  {
    title: "Creative Strategy",
    description: "Angles, offers and hooks derived from data instead of guesswork.",
    group: "Growth",
  },
  {
    title: "Marketing Strategy",
    description: "The full picture: audience, funnel, channel mix and what to fix first.",
    group: "Growth",
  },
];

export type WorkCategory = "Branding" | "Social Media" | "Paid Ads" | "Video";

export type Project = {
  slug: string;
  title: string;
  category: WorkCategory;
  discipline: string;
  image: MediaKey;
  alt: string;
  /** Layout weight in the editorial grid. */
  span: "wide" | "tall" | "regular";
  summary: string;
  caseStudy?: {
    challenge: string;
    strategy: string;
    execution: string;
    result: string;
    metrics?: { value: string; label: string }[];
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "reflection-point",
    title: "Reflection Point",
    category: "Paid Ads",
    discipline: "Media buying · Local services",
    image: "ad-statistics-review",
    alt: "Trio Vibe paid advertising creative built for a local services campaign",
    span: "wide",
    summary: "A local services account taken from cold spend to a 33× documented return.",
    caseStudy: {
      challenge:
        "A limited budget with no reliable read on which audiences or creatives were actually producing booked revenue.",
      strategy:
        "Rebuild tracking first, then narrow spend to high-intent capture instead of broad awareness reach.",
      execution:
        "Restructured the campaign around intent, tested creative angles in controlled batches, and moved budget only on tracked outcomes.",
      result: "A 33× return recorded on the case, driven by intent capture rather than added budget.",
      metrics: [{ value: "33×", label: "Return" }],
    },
  },
  {
    slug: "beauty-select",
    title: "Beauty Select",
    category: "Paid Ads",
    discipline: "E-commerce · Performance",
    image: "social-pure-cosmetics",
    alt: "Trio Vibe cosmetics social media and campaign creative set for a beauty e-commerce brand",
    span: "regular",
    summary: "Order volume lifted from 21 to 78 in a single reporting period.",
    caseStudy: {
      challenge: "A cosmetics store with steady traffic but flat order volume and no creative testing rhythm.",
      strategy: "Treat creative as the main variable and hold the offer stable so results stay readable.",
      execution: "Refreshed the product-led creative set, rebuilt the campaign structure and iterated weekly.",
      result: "Orders increased from 21 to 78 with no additional input required from the client.",
      metrics: [
        { value: "21 → 78", label: "Orders" },
      ],
    },
  },
  {
    slug: "luxury",
    title: "Luxury",
    category: "Paid Ads",
    discipline: "Premium retail · Performance",
    image: "social-comfort-serve",
    alt: "Trio Vibe premium retail campaign design set with gold and dark editorial treatment",
    span: "regular",
    summary: "A premium retail account run to a blended 4.33× return on ad spend.",
    caseStudy: {
      challenge: "A premium price point that punishes broad targeting and generic creative.",
      strategy: "Position on craft and exclusivity, then buy against a narrow qualified audience.",
      execution: "Built a considered creative set, controlled frequency and optimised bids toward profit.",
      result: "A 4.33× return on ad spend recorded across the case.",
      metrics: [{ value: "4.33×", label: "ROAS" }],
    },
  },
  {
    slug: "khadija",
    title: "Khadija",
    category: "Paid Ads",
    discipline: "E-commerce · Saudi Arabia",
    image: "ad-live-session",
    alt: "Trio Vibe performance advertising creative designed for a Saudi e-commerce campaign",
    span: "regular",
    summary: "158,900 SAR in tracked sales generated across the campaign period.",
    caseStudy: {
      challenge: "Scaling sales in a competitive Saudi category without letting acquisition cost run away.",
      strategy: "Protect cost per acquisition first, then scale only the pockets that stayed profitable.",
      execution: "Segmented campaigns by intent, monitored CPA daily and reallocated spend continuously.",
      result: "158,900 SAR in sales generated, with a lowest recorded CPA of 7.5 SAR.",
      metrics: [
        { value: "158,900 SAR", label: "Sales" },
        { value: "7.5 SAR", label: "Lowest CPA" },
      ],
    },
  },
  {
    slug: "brand-marks",
    title: "Brand Marks",
    category: "Branding",
    discipline: "Logo design · Identity",
    image: "brand-logo-wall",
    alt: "Selection of logo marks designed by Trio Vibe across construction, beauty and service categories",
    span: "tall",
    summary: "A selection of identity marks across construction, beauty, retail and service categories.",
  },
  {
    slug: "logo-design-suite",
    title: "Logo Design Suite",
    category: "Branding",
    discipline: "Identity systems",
    image: "divider-logo-designs",
    alt: "Trio Vibe logo design chapter cover from the studio portfolio",
    span: "regular",
    summary: "Identity work built as a system — mark, type, spacing rules and application.",
  },
  {
    slug: "dr-enjy-clinic",
    title: "Dr Enjy Clinic",
    category: "Social Media",
    discipline: "Aesthetics · Feed system",
    image: "social-dr-enjy-clinic",
    alt: "Trio Vibe social media design set for Dr Enjy Clinic featuring eye treatment creatives",
    span: "regular",
    summary: "A treatment-led feed system with a consistent editorial frame.",
  },
  {
    slug: "derma-glow-clinic",
    title: "Derma Glow Clinic",
    category: "Social Media",
    discipline: "Skincare · Feed system",
    image: "social-derma-glow-clinic",
    alt: "Trio Vibe social media design set for Derma Glow Clinic skincare services",
    span: "wide",
    summary: "Warm, clean skincare visuals designed to read instantly in a crowded feed.",
  },
  {
    slug: "la-clinic",
    title: "LA Clinic",
    category: "Social Media",
    discipline: "Dental · Feed system",
    image: "social-la-clinic",
    alt: "Trio Vibe social media design set for LA Clinic dental and aesthetic services",
    span: "regular",
    summary: "A dental and aesthetics feed built around a single recognisable frame.",
  },
  {
    slug: "vie-la-bella-clinic",
    title: "Vie La Bella Clinic",
    category: "Social Media",
    discipline: "Aesthetics · Feed system",
    image: "social-vie-la-bella-clinic",
    alt: "Trio Vibe social media design set for Vie La Bella Clinic with magenta accent treatment",
    span: "regular",
    summary: "A bolder colour direction for a clinic that needed to stand apart locally.",
  },
  {
    slug: "divine-clinic",
    title: "Divine Clinic",
    category: "Social Media",
    discipline: "Aesthetics · Offers",
    image: "social-divine-clinic",
    alt: "Trio Vibe social media offer designs for Divine Clinic treatments",
    span: "regular",
    summary: "Offer-led posts where the price and the promise stay legible at thumbnail size.",
  },
  {
    slug: "ava-clinic",
    title: "Ava Clinic",
    category: "Social Media",
    discipline: "Aesthetics · Feed system",
    image: "social-ava-clinic",
    alt: "Trio Vibe social media design set for Ava Clinic aesthetic treatments",
    span: "regular",
    summary: "A restrained neutral palette applied across a full monthly plan.",
  },
  {
    slug: "dr-nader-momtaz",
    title: "Dr Nader Momtaz",
    category: "Social Media",
    discipline: "Ophthalmology · Education",
    image: "social-dr-nader-momtaz",
    alt: "Trio Vibe educational social media designs for ophthalmologist Dr Nader Momtaz",
    span: "regular",
    summary: "Medical education content translated into visuals a non-specialist can follow.",
  },
  {
    slug: "dr-ahmed-behery-clinic",
    title: "Dr Ahmed Behery Clinic",
    category: "Social Media",
    discipline: "Medical · Awareness",
    image: "social-dr-ahmed-behery-clinic",
    alt: "Trio Vibe medical awareness social media designs for Dr Ahmed Behery Clinic",
    span: "regular",
    summary: "Awareness content that stays clinical without going cold.",
  },
  {
    slug: "dr-ahmed-gamal-clinic",
    title: "Dr Ahmed Gamal Clinic",
    category: "Social Media",
    discipline: "Medical · Awareness",
    image: "social-dr-ahmed-gamal-clinic",
    alt: "Trio Vibe high-contrast medical awareness social media designs for Dr Ahmed Gamal Clinic",
    span: "regular",
    summary: "High-contrast awareness posts using hazard cues to force a stop-scroll.",
  },
  {
    slug: "weboost-agency",
    title: "Weboost Agency",
    category: "Social Media",
    discipline: "B2B services · Feed system",
    image: "social-weboost-agency",
    alt: "Trio Vibe social media design set for Weboost Agency covering construction and safety services",
    span: "wide",
    summary: "Industrial and contracting services presented with an unexpectedly premium finish.",
  },
  {
    slug: "osg-group",
    title: "OSG Group",
    category: "Social Media",
    discipline: "Real estate · Feed system",
    image: "social-osg-group",
    alt: "Trio Vibe real estate social media designs for OSG Group property launches",
    span: "regular",
    summary: "Property launch visuals with a gold-on-dark editorial treatment.",
  },
  {
    slug: "comfort-serve",
    title: "Comfort Serve",
    category: "Social Media",
    discipline: "Services · Offers",
    image: "social-comfort-serve",
    alt: "Trio Vibe social media designs for Comfort Serve business services offers",
    span: "regular",
    summary: "Business services offers structured so the number leads the frame.",
  },
  {
    slug: "baqyat-foundation",
    title: "Baqyat Foundation",
    category: "Social Media",
    discipline: "Non-profit · Campaign",
    image: "social-baqyat-foundation",
    alt: "Trio Vibe campaign social media designs for Baqyat Foundation donation drives",
    span: "regular",
    summary: "Donation campaign design where clarity matters more than decoration.",
  },
  {
    slug: "pure-cosmetics",
    title: "Pure Cosmetics",
    category: "Social Media",
    discipline: "Beauty retail · Product",
    image: "social-pure-cosmetics",
    alt: "Trio Vibe product-led social media designs for Pure Cosmetics skincare range",
    span: "regular",
    summary: "Product-forward creative built to sit directly into paid placements.",
  },
  {
    slug: "rosel",
    title: "Rosél",
    category: "Social Media",
    discipline: "Beauty · Feed system",
    image: "social-weboost-rosel",
    alt: "Trio Vibe social media design set for the Rosél beauty range",
    span: "regular",
    summary: "A soft violet system for a beauty range that needed a calmer voice.",
  },
  {
    slug: "sports-podcast",
    title: "Sports Podcast",
    category: "Video",
    discipline: "Series identity · Editing",
    image: "video-sports-podcast",
    alt: "Trio Vibe video thumbnail design for a sports podcast episode",
    span: "wide",
    summary: "Episode identity and thumbnail language for a recurring conversation series.",
  },
  {
    slug: "history-series",
    title: "History Series",
    category: "Video",
    discipline: "Documentary · Key art",
    image: "video-history-series",
    alt: "Trio Vibe documentary series key art with historical portrait composition",
    span: "regular",
    summary: "Cinematic key art for a documentary-style episodic release.",
  },
  {
    slug: "statistics-lesson",
    title: "Statistics Lesson",
    category: "Video",
    discipline: "Education · Thumbnails",
    image: "video-statistics-lesson",
    alt: "Trio Vibe educational video thumbnail design for a statistics lesson",
    span: "regular",
    summary: "Education content packaged so the topic reads before the click.",
  },
  {
    slug: "secondary-school-campaign",
    title: "Secondary School Campaign",
    category: "Video",
    discipline: "Education · Campaign",
    image: "video-secondary-school-campaign",
    alt: "Trio Vibe education campaign key art for a secondary school course launch",
    span: "regular",
    summary: "A course launch campaign built across video covers and paid placements.",
  },
  {
    slug: "new-star-workshop",
    title: "New Star Workshop",
    category: "Video",
    discipline: "On-location · Series",
    image: "video-new-star-workshop",
    alt: "Trio Vibe on-location workshop video cover from an episodic content series",
    span: "regular",
    summary: "On-location episodic content shot and cut as a repeatable format.",
  },
];

export const WORK_CATEGORIES: (WorkCategory | "All")[] = [
  "All",
  "Branding",
  "Social Media",
  "Paid Ads",
  "Video",
];

export const CASE_STUDIES = PROJECTS.filter((p) => p.caseStudy);

export const PROCESS = [
  {
    step: "01",
    title: "Audit",
    body: "Understand the brand, the market, the audience and the current situation before anything gets built.",
  },
  {
    step: "02",
    title: "Strategy",
    body: "Define positioning, creative direction and the growth approach that fits the business.",
  },
  {
    step: "03",
    title: "Create",
    body: "Build the visual identity, the content and the campaign creative as one connected system.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Deploy the work and put campaigns live where paid distribution is part of the plan.",
  },
  {
    step: "05",
    title: "Optimize",
    body: "Read the performance, cut what does not work and improve what actually moves the number.",
  },
];

export const FOUNDERS = [
  {
    name: "Momen Tarek",
    role: "Founder",
    image: "founder-momen-tarek" as MediaKey,
    alt: "Momen Tarek, Founder at Trio Vibe",
  },
  {
    name: "Abdelrahman Osman",
    role: "Founder",
    image: "founder-abdelrahman-osman" as MediaKey,
    alt: "Abdelrahman Osman, Founder at Trio Vibe",
  },
  {
    name: "Mahmoud Abdullah",
    role: "Founder",
    image: "founder-mahmoud-abdullah" as MediaKey,
    alt: "Mahmoud Abdullah, Founder at Trio Vibe",
  },
];

export const CREATIVE_WALL: MediaKey[] = [
  "social-dr-enjy-clinic",
  "social-derma-glow-clinic",
  "social-osg-group",
  "social-weboost-agency",
  "social-pure-cosmetics",
  "social-la-clinic",
  "social-comfort-serve",
  "social-baqyat-foundation",
];

export { media };
/** Distribution channels the growth team buys and produces for. */
export const CHANNELS = [
  {
    name: "Meta Ads",
    detail: "Facebook & Instagram campaign structures, creative testing and budget scaling.",
    tag: "Paid",
  },
  {
    name: "Instagram",
    detail: "Feed systems, reels and community rhythm designed as one recognisable set.",
    tag: "Organic",
  },
  {
    name: "TikTok",
    detail: "Short-form built for the hook, cut against the retention curve.",
    tag: "Organic + Paid",
  },
  {
    name: "Snapchat",
    detail: "Gulf-market reach campaigns with creative shaped for the platform's pace.",
    tag: "Paid",
  },
  {
    name: "Google & YouTube",
    detail: "Intent capture through search and video placements tied to tracked outcomes.",
    tag: "Paid",
  },
  {
    name: "WhatsApp",
    detail: "Conversation-led funnels where the booking actually happens.",
    tag: "Conversion",
  },
] as const;

/** The production and measurement stack behind the work. */
export const TOOL_GROUPS = [
  {
    group: "Design",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects", "Figma", "Canva Pro"],
  },
  {
    group: "Video",
    items: ["Adobe Premiere Pro", "CapCut Pro", "DaVinci Resolve"],
  },
  {
    group: "Growth",
    items: ["Meta Ads Manager", "TikTok Ads Manager", "Snapchat Ads", "Google Ads"],
  },
  {
    group: "Measurement",
    items: ["GA4", "Meta Pixel", "Conversions API", "Looker Studio"],
  },
] as const;

/** Disciplines used by the capabilities tabs. */
export const DISCIPLINES = ["Brand", "Content", "Growth"] as const;

/**
 * Centralized business configuration for SS Tour & Travels.
 * Update business details, contact numbers, destinations and content here.
 */

export const site = {
  name: "SS Tour & Travels",
  shortName: "SS Tours",
  tagline: "Your Journey. Our Passion.",
  description:
    "SS Tour & Travels offers picnic trips, family tours, group tours, marriage programme transportation, local and outstation travel across Odisha - Puri, Konark, Koraput, Deomali and beyond.",
  industry: "Travel, Tourism, Transportation and Vehicle Rental",
  market: "Odisha, India",
  currency: "INR",
  currencySymbol: "₹",
  language: "en",

  contact: {
    phonePrimary: "+91 8327708096",
    phonePrimaryHref: "tel:+918327708096",
    phoneSecondary: "+91 8144142094",
    phoneSecondaryHref: "tel:+918144142094",
    whatsappPrimary: "918327708096",
    whatsappSecondary: "918144142094",
  },

  /** Canonical site URL. Override with NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ss-tour-travels.vercel.app",

  nav: [
    { label: "Home", href: "#home" },
    { label: "Destinations", href: "#destinations" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  whatsappDefaultMessage:
    "Hello SS Tour & Travels, I am interested in planning a trip. Please share the available options and pricing.",

  availability: "Available for Local & Outstation Trips",

  keywords: [
    "Tour and Travels in Odisha",
    "Odisha Tour Packages",
    "Puri Tour and Travels",
    "Konark Travel Services",
    "Koraput Tour",
    "Deomali Trip",
    "Family Tour in Odisha",
    "Picnic Transportation Odisha",
    "Local and Outstation Travel Odisha",
  ],
} as const;

export const travelTypes = [
  "Picnic",
  "Family Tour",
  "Group Tour",
  "Marriage Programme",
  "Local Travel",
  "Outstation Travel",
] as const;

export type TravelType = (typeof travelTypes)[number];

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    slug: "puri",
    name: "Puri",
    tagline: "The sacred coast of Odisha",
    highlights: ["Jagannath Temple", "Puri Beach", "Coastal experiences"],
  },
  {
    slug: "konark",
    name: "Konark",
    tagline: "A wonder carved in stone",
    highlights: ["Sun Temple", "Architectural heritage", "Cultural exploration"],
  },
  {
    slug: "koraput",
    name: "Koraput",
    tagline: "Valleys, waterfalls and tribal heritage",
    highlights: ["Green valleys", "Waterfalls", "Nature experiences"],
  },
  {
    slug: "deomali",
    name: "Deomali",
    tagline: "The highest peak of Odisha",
    highlights: ["Mountain landscapes", "Scenic viewpoints", "Trekking opportunities"],
  },
];

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide icon key, resolved in the component
  featured?: boolean;
}

export const services: Service[] = [
  {
    slug: "picnic-trips",
    title: "Picnic Trips",
    description:
      "Easy, comfortable transport for school groups, office outings and family picnics to Odisha's favourite spots.",
    icon: "trees",
  },
  {
    slug: "family-tours",
    title: "Family Tours",
    description:
      "Relaxed journeys planned around your family - beaches, temples and hill stations at your own pace.",
    icon: "users",
  },
  {
    slug: "group-tours",
    title: "Group Tours",
    description:
      "Coordinated travel for groups of every size, with comfortable vehicles and a single point of contact.",
    icon: "bus",
  },
  {
    slug: "marriage-programme-transportation",
    title: "Marriage Programme Transportation",
    description:
      "Graceful, dependable transportation for wedding days - guest movement, family travel and special arrivals.",
    icon: "heart",
    featured: true,
  },
  {
    slug: "local-transportation",
    title: "Local Transportation",
    description:
      "Reliable city and nearby travel for daily needs, events and errands - on time, every time.",
    icon: "map-pin",
  },
  {
    slug: "outstation-travel",
    title: "Outstation Travel",
    description:
      "Long-distance journeys across Odisha and beyond, driven carefully so you arrive rested.",
    icon: "route",
  },
];

export const whyChooseUs = [
  {
    title: "Convenient Booking",
    description: "One call or WhatsApp message is all it takes to start planning your trip.",
    icon: "phone-call",
  },
  {
    title: "Friendly Travel Support",
    description: "Real people who know Odisha's roads help you plan, before and during the journey.",
    icon: "hand-heart",
  },
  {
    title: "Flexible Travel Requirements",
    description: "Picnics, weddings, pilgrimages or hill trips - we shape the trip around your needs.",
    icon: "sliders-horizontal",
  },
  {
    title: "Local & Outstation Journeys",
    description: "From short city runs to multi-day tours across Odisha and neighbouring states.",
    icon: "map",
  },
  {
    title: "Family & Group Travel",
    description: "Comfortable options for families, friend circles, office teams and wedding parties.",
    icon: "users-round",
  },
  {
    title: "Personalized Trip Enquiries",
    description: "Every enquiry is discussed individually - destination, dates, group size and budget.",
    icon: "messages-square",
  },
] as const;

export const bookingSteps = [
  {
    step: "01",
    title: "Choose Your Journey",
    description: "Select your destination and travel requirements.",
  },
  {
    step: "02",
    title: "Share Your Details",
    description: "Tell us your travel date, group size, and pickup location.",
  },
  {
    step: "03",
    title: "Connect With Us",
    description: "Contact our team to discuss availability and pricing.",
  },
  {
    step: "04",
    title: "Confirm Your Trip",
    description: "Finalize your arrangements directly with SS Tour & Travels.",
  },
] as const;

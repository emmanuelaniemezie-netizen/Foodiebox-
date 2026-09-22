/**
 * ============================================================
 *  FOODIEBOX — SITE SETTINGS
 *  Edit this file to update business info. No coding needed
 *  beyond changing the values on the right of each colon.
 * ============================================================
 */

const SITE_CONFIG = {
  businessName: "FOODIEBOX",
  tagline: "Good Food \u25AA\uFE0E Great Moments",

  // Shown in the About section — do not change unless the wording itself changes.
  aboutText:
    "FOODIEBOX was founded on a simple standard: quality food, delivered consistently, every time. We combine sourcing discipline, food safety practices, and a tightly run kitchen to ensure every order meets the same bar \u2014 whether it's your first visit or your fiftieth.",

  // Shown in the Contact section / footer.
  location: "Kibagabaga",

  // WhatsApp number exactly as printed on the menu (for display only).
  whatsappDisplay: "0792 106 516",

  // WhatsApp number used to build the wa.me order link.
  // wa.me links need the FULL international number with NO leading 0 and NO "+".
  // The menu shows a Rwandan-format number (0792106516) and lists "Kibagabaga"
  // (a Kigali neighbourhood), so this assumes Rwanda's country code 250:
  //   0792106516  ->  250792106516
  // >>> If FOODIEBOX is not in Rwanda, replace this with the correct country
  //     code + number (still no "+", no spaces, no leading 0). <<<
  whatsappNumber: "250792106516",

  // Currency shown next to every price. Change this one line to switch currency
  // everywhere on the site (e.g. "\u20A6" for Naira, "$" for US dollars).
  currency: "RWF",

  // Where the currency symbol sits relative to the number.
  // "before" -> $1,000   |   "after" -> 1,000 RWF
  currencyPosition: "after",

  // DELIVERY INFO — left blank on purpose. Fill these in whenever you're
  // ready and they'll appear automatically in the "Delivery Information"
  // section of the site. Leave an array empty to hide that part.
  delivery: {
    areas: [
      // Example once ready: "Kibagabaga", "Kimironko", "Remera"
    ],
    fees: [
      // Example once ready: { area: "Kibagabaga", fee: 1000 }
    ],
    estimatedTime: "" // Example once ready: "30–45 minutes"
  },

  socialLinks: {
    // Add links whenever these are ready, e.g. instagram: "https://instagram.com/foodiebox"
    instagram: "",
    facebook: "",
    twitter: ""
  }
};

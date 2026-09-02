/** Static site-wide configuration (no secrets here). */
export const site = {
  name: "Velora",
  tagline: "Padel-Zubehör aus der Schweiz",
  domain: "velorapadel.ch",
  url: "https://velorapadel.ch",
  instagramUrl: "https://www.instagram.com/velorapadel",
  contactEmail: "hallo@velorapadel.ch",
} as const;

export const navigation = {
  main: [
    { href: "/shop", label: "Shop" },
    { href: "/ueber-uns", label: "Über uns" },
  ],
  footerShop: [
    { href: "/shop", label: "Alle Produkte" },
    { href: "/versand", label: "Versand" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  footerLegal: [
    { href: "/impressum", label: "Impressum" },
    { href: "/agb", label: "AGB" },
    { href: "/datenschutz", label: "Datenschutz" },
  ],
} as const;

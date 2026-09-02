import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (no Google Fonts CDN for privacy reasons).
 * Files live in src/fonts and are served from the same origin.
 */
export const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
});

export const spaceGrotesk = localFont({
  src: "../fonts/space-grotesk-latin-wght-normal.woff2",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-space-grotesk",
});

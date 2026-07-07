# CLAUDE.md - RE>TYRED Website

## Stack
React 18 + Vite 5 + TypeScript + framer-motion + react-router-dom

## Brand Tokens
All tokens live in `src/components/tokens.ts` - NEVER hardcode hex values in components.
- ORANGE #F07212 - primary CTA / accent
- CHARCOAL #3A3A3A - dark section background (warm, not pure black)
- DEEP_BLACK #0D0D0D - logo / footer contrast
- CREAM #FBF7F1 - light sections
- WHITE #FFFFFF

## Design Rules
- border-radius: 0 everywhere - sharp corners only
- No em dashes anywhere - plain hyphens only
- All headings: Barlow Condensed 900, text-transform uppercase, letter-spacing -0.02em
- TyreTread component between every section - never remove
- framer-motion for all animation - no CSS animation

## Routes
- / - Home (Hero, Stats, Services, Why, Reviews, Contact)
- /mobile-fitting - Mobile callout landing page

## TODO before launch
- Wire contact form to Resend API (VITE_RESEND_API_KEY)
- Wire Google Reviews carousel to Places API (VITE_GOOGLE_PLACES_API_KEY + Place ID)
- Set up Vercel deployment
- Add domain once client confirms purchase
- Add Google Search Console + Google Business Profile

## Deploy
```bash
npm run build
vercel --prod
```

# VWO A/B Testing Practice Site (Next.js App Router)

This is a dummy landing page built with **Next.js App Router** for practicing **A/B testing** with [Visual Website Optimizer (VWO)](https://vwo.com/).  
It contains multiple **testable elements** so you can run variations and learn CRO (Conversion Rate Optimization) basics.

## Features

- **Next.js 13+ App Router** with `app/layout.js` and `app/page.js`
- **Client Component** for interactive elements (`"use client"`)
- Ready-to-test UI sections:
  - Headline
  - Subheading
  - Two CTA buttons (top & bottom)
  - Feature list cards
  - Testimonial block
  - Footer text
- Simple, responsive layout for quick deployment
- Easy integration with VWO SmartCode

## Getting Started

### 1. Clone the repo
```bash
git clone git@github.com:chlzslvdr/vwo-demo.git
cd vwo-demo
```
Add in `.env`:
```
NEXT_PUBLIC_VWO_ACCOUNT_ID=
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add VWO SmartCode
Open `app/layout.js` and paste your VWO SmartCode inside the `<head>` tag:
```jsx
<script
  dangerouslySetInnerHTML={{
    __html: `/* Paste your exact VWO SmartCode here */`
  }}
/>
```

For SPA compatibility in Next.js, ensure `is_spa: 1` is set in the SmartCode.

### 4. Run locally
```bash
npm run dev
```

Visit: http://localhost:3000

Note: VWO may not track on localhost. Deploy to Vercel for full testing.

## Example VWO Tests to Try

1. Headline Variation
    - Original: "Boost Your Productivity Today"
    - Variation: "Work Smarter, Not Harder"
2. CTA Text
    - "Get Started" vs. "Start My Free Trial"
3. CTA Color
    - Blue vs. Green vs. Orange
4. Feature Order
    - Swap order of the feature cards
5. Testimonial Toggle
    - Show vs. Hide testimonial section
6. CTA Placement
    - Top-only vs. Top + Bottom


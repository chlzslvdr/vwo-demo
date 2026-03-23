# VWO Practice Site (Next.js App Router)

This is a dummy landing page built with **Next.js App Router** for experimenting with [Visual Website Optimizer (VWO)](https://vwo.com).  
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
- [Flags SDK](https://flags-sdk.dev) - feature flags toolkit
- [Contentful VWO Integration](https://www.contentful.com/marketplace/vwo)

## Pre Requisites

- [Setup Contentful Model](https://github.com/chlzslvdr/vwo-demo/blob/main/contentful_model.md)
- [Configure VWO Feature Flag](https://github.com/chlzslvdr/vwo-demo/blob/main/feature_flag_setup.md)

## Getting Started

### 1. Clone the repo
```bash
git clone git@github.com:chlzslvdr/vwo-demo.git
cd vwo-demo
```
Add in `.env`:
```
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_VWO_ACCOUNT_ID=
VWO_ACCOUNT_ID=
VWO_SDK_KEY=
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```

Visit: http://localhost:3000

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


## Documentations

1. [How to Run VWO on Your Local Machine?](https://help.vwo.com/hc/en-us/articles/900000745126-How-to-Run-VWO-on-Your-Local-Machine)
2. [Integrating VWO With Contentful](https://help.vwo.com/hc/en-us/articles/4404205211929-Integrating-VWO-With-Contentful)

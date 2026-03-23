# Setup Contentful

## Landing Page Content Model
- title, Short Text, Required
- headline, Short Text, Required, Unique
- subHeading, Short Text, Required
- ctaText, Short Text, Required
- features, References-many, Required
    - featureTitle, Short Text, Required
    - icon, Short Text, Required
    - featureDesc, Short Text, Required
- testimonialQuote, Short Text, Required
- testimonialAuthor, Short Text, Required

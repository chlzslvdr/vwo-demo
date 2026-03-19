# How to setup VWO Feature Flag

## 1. Create the Feature Flag
- Navigate to Feature Management in your VWO dashboard.
- Click Create Feature Flag.
- Name the feature flag:

    ```
    newCtaExperience
    ```
- Save the feature flag.

## 2. Retrieve the SDK Key

To connect your application with VWO:
1. Go to Configurations in the VWO dashboard.
2. Copy the SDK Key for your environment (Development, Staging, or Production).
3. Add the SDK key to your application configuration.

## 3. Create Feature Variables

Add the following variables to control the CTA behavior dynamically:

| Variable Name | Type | Default Value  | Description |
|---|---|---|---|
| headlineText  | String  | Work Smarter, Not Harder  |  Headline text |
| headlineCtaText  | String  | Take the next step  |  CTA button text |
| shouldShowDiscount  |  Boolean |  true | Controls discount badge visibility  |


Make sure each variable is saved after creation.

## 4. Configure Variations and Metrics
**Variations**

Create variations to test different experiences:

 - **Control** – Default experience
 - **Variation 1** – Updated CTA design or messaging

  

Adjust variable values per variation if needed.

  

**Metrics**

  Add relevant metrics to measure performance:

 - Click-through rate (CTR)
 - Conversion rate
 - Revenue (if applicable)
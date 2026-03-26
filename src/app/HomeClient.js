"use client";

import { useEffect } from "react";
import { useGetFlag } from "vwo-fme-react-sdk";

export default function HomeClient({
  userContext,
  headline: initialHeadline,
  subHeading,
  ctaText: initialCtaText,
  features,
  testimonialQuote,
  testimonialAuthor,
}) {
  /* -------------------------
     VWO FLAG
  --------------------------*/
  const { flag, isReady } = useGetFlag("newCtaExperience");

  let headline = initialHeadline;
  let ctaText = initialCtaText;
  let showDiscount = false;
  let isFlagActive = false;

  if (isReady && flag?.enabled) {
    isFlagActive = true;
    headline = flag.variables?.headlineText ?? headline;
    ctaText = flag.variables?.headlineCtaText ?? ctaText;
    showDiscount = flag.variables?.shouldShowDiscount ?? false;
  }

  /* -------------------------
     TRACK EVENT
  --------------------------*/
  useEffect(() => {
    if (!userContext?.id) return;

    const track = () => {
      if (window.VWO?.event?.track) {
        window.VWO.event.track("pageVisits", userContext);
      }
    };

    track();

    const interval = setInterval(() => {
      if (window.VWO?.event?.track) {
        track();
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [userContext]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Hero Section */}
      <header
        id="header"
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <h1 id="headline" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          {headline}
        </h1>

        <p
          id="subheading"
          style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem auto",
            lineHeight: 1.5,
          }}
        >
          {subHeading}
        </p>

        <button
          id="button-top-cta"
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={() => alert("Top Button Clicked!")}
        >
          {ctaText}
        </button>

        {isFlagActive && (
          <div
            id="vwo-flag-indicator"
            style={{
              marginTop: "1rem",
              fontSize: "0.75rem",
            }}
          >
            🟠 VWO Feature Flag is on!
          </div>
        )}
      </header>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: "3rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gap: "1.5rem",
        }}
      >
        {features.map((feature, i) => (
          <div
            id={`feature-${i}`}
            key={i}
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", marginBottom: ".5rem" }}>
              {feature.fields?.icon} {feature.fields?.featureTitle}
            </h3>
            <p style={{ fontSize: "1rem", color: "#555" }}>
              {feature.fields?.featureDesc}
            </p>
          </div>
        ))}
      </section>

      {/* Testimonial Section */}
      <section
        id="testimonial"
        style={{
          padding: "3rem 2rem",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <blockquote
          id="testimonial-quote"
          style={{
            fontStyle: "italic",
            fontSize: "1.1rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          &ldquo;{testimonialQuote}&rdquo;
        </blockquote>

        <p
          id="testimonial-author"
          style={{ marginTop: "1rem", fontWeight: "bold" }}
        >
          — {testimonialAuthor}
        </p>
      </section>

      {/* Bottom CTA */}
      <section style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <h2
          id="bottom-cta-heading"
          style={{ fontSize: "1.8rem", marginBottom: "1rem" }}
        >
          Ready to Get Started?
        </h2>

        <button
          id="button-bottom-cta"
          style={{
            padding: "1rem 2rem",
            fontSize: "1.1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
          onClick={() => alert("Bottom Button Clicked!")}
        >
          Launch Your Free Trial
        </button>

        {showDiscount && (
          <p id="discount-label" style={{ marginTop: "1rem", color: "green" }}>
            🎉 Limited-time discount available!
          </p>
        )}
      </section>

      {/* Footer */}
      <footer
        id="footer"
        style={{
          padding: "1.5rem",
          backgroundColor: "#f1f3f5",
          textAlign: "center",
          fontSize: "0.9rem",
          color: "#777",
        }}
      >
        © 2025 MyProductivityTool. All rights reserved.
      </footer>
    </div>
  );
}

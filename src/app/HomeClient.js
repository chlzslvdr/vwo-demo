"use client";

import { useEffect } from "react";

export default function HomeClient({
  userContext,
  ctaText,
  showDiscount,
  isNewCTAEnabled,
}) {
  useEffect(() => {
    if (!userContext?.id) return;

    if (typeof window === "undefined") return;

    const track = () => {
      if (window.VWO?.event?.track) {
        window.VWO.event.track("pageVisits", userContext);
      }
    };

    track();

    const interval = setInterval(() => {
      if (window.VWO?.event?.track) {
        window.VWO.event.track("pageVisits", userContext);
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
        style={{
          padding: "4rem 2rem",
          textAlign: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        {/* Test: Headline text */}
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Boost Your Productivity Today
        </h1>

        {/* Test: Subheading text */}
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "600px",
            margin: "0 auto 2rem auto",
            lineHeight: 1.5,
          }}
        >
          Join thousands who have transformed their workflow with our
          easy-to-use, lightning-fast, and secure tool.
        </p>

        {/* Test: CTA Button color/text */}
        <button
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
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section
        style={{
          padding: "3rem 2rem",
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gap: "1.5rem",
        }}
      >
        {[
          {
            icon: "✅",
            title: "Easy to Use",
            desc: "A simple interface that gets you working in seconds.",
          },
          {
            icon: "⚡",
            title: "Lightning Fast",
            desc: "Optimized performance for a smooth experience.",
          },
          {
            icon: "🔒",
            title: "Secure & Private",
            desc: "Your data stays safe with our top-notch security.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#fff",
              padding: "1.5rem",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", marginBottom: ".5rem" }}>
              {feature.icon} {feature.title}
            </h3>
            <p style={{ fontSize: "1rem", color: "#555" }}>{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonial Section */}
      <section
        style={{
          padding: "3rem 2rem",
          backgroundColor: "#ffffff",
          textAlign: "center",
        }}
      >
        <blockquote
          style={{
            fontStyle: "italic",
            fontSize: "1.1rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          &ldquo;This tool completely changed how I work. My productivity has
          doubled!&ldquo;
        </blockquote>
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>— Alex Johnson</p>
      </section>

      {/* Bottom CTA */}
      <section style={{ textAlign: "center", padding: "3rem 2rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
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
          {isNewCTAEnabled ? ctaText : "Get Started"}
        </button>

        {isNewCTAEnabled && showDiscount && (
          <p id="discount-label" style={{ marginTop: "1rem", color: "green" }}>
            🎉 Limited-time discount available!
          </p>
        )}
      </section>

      {/* Footer */}
      <footer
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

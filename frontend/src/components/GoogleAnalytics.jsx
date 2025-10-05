import React, { useEffect } from "react";

export default function GoogleAnalytics({ trackingId }) {
  useEffect(() => {
    if (!trackingId) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", trackingId);
  }, [trackingId]);

  return null;
}
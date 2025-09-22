import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = ({ trackingId = "G-XXXXXXXXXX" }) => {
  const location = useLocation();

  useEffect(() => {
    // Load Google Analytics script
    if (trackingId && trackingId !== "G-XXXXXXXXXX") {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', trackingId);
    }
  }, [trackingId]);

  useEffect(() => {
    // Track page views
    if (window.gtag && trackingId !== "G-XXXXXXXXXX") {
      window.gtag('config', trackingId, {
        page_path: location.pathname,
      });
    }
  }, [location, trackingId]);

  return null;
};

export default GoogleAnalytics;
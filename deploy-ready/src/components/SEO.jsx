import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Lakwalahal Foundation - No one forgotten. Everyone protected.",
  description = "The Lakwalahal Foundation provides healing, protection, and sacred remembrance services. Community healing circles, memorial gardens, crisis support, and educational outreach programs.",
  keywords = "healing foundation, grief counseling, community support, memorial services, crisis intervention, trauma recovery, bereavement support, healing circles, nonprofit organization",
  image = "/og-image.jpg",
  url = "https://lakwalahalfoundation.org"
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Lakwalahal Foundation" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Lakwalahal Foundation" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Structured Data for Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NonprofitOrganization",
          "name": "Lakwalahal Foundation",
          "description": "A legacy of healing, protection, and sacred remembrance. No one forgotten. Everyone protected.",
          "url": "https://lakwalahalfoundation.org",
          "logo": "https://lakwalahalfoundation.org/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4325",
            "contactType": "customer service",
            "email": "info@lakwalahalfoundation.org"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Healing Way",
            "addressLocality": "Compassion City",
            "addressRegion": "NY",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://facebook.com/lakwalahalfoundation",
            "https://instagram.com/lakwalahalfoundation",
            "https://linkedin.com/company/lakwalahalfoundation"
          ],
          "foundingDate": "2024",
          "founder": {
            "@type": "Person",
            "name": "Dr. Sarah Lakwalahal"
          },
          "mission": "Providing pathways to emotional, spiritual, and community healing while safeguarding the vulnerable and honoring sacred remembrance.",
          "services": [
            "Community Healing Circles",
            "Memorial Gardens Project",
            "Crisis Support Services",
            "Educational Outreach"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
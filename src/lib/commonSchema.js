export const BASE_URL = "https://www.comsci.tech";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  "name": "Comsci Technologies",
  "legalName": "Comsci Technologies LLP",
  "url": BASE_URL,
  "logo": `${BASE_URL}/images/logo.svg`,
  "email": "hello@comsci.tech",
  "telephone": "+91 96873 79447",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "401 ASMAKAM FLATS, SHAKTINAGAR MAIN ROAD STREET NO. 2, NEAR PANCHAYAT CHOWK, UNIVERSITY ROAD",
    "addressLocality": "Rajkot",
    "addressRegion": "Gujarat",
    "postalCode": "360005",
    "addressCountry": "IN"
  },
  "hasMap": "https://maps.app.goo.gl/xhA6c4h8o6aBssnn8",
  "sameAs": [
    "https://www.facebook.com/people/Comsci/61557725482494/",
    "https://www.behance.net/comsci-technologies",
    "https://www.linkedin.com/company/comsci-technologies",
    "https://www.youtube.com/@comsci-technologies",
    "https://x.com/comsci_tech"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "Comsci Technologies",
  "publisher": {
    "@id": organizationSchema["@id"]
  }
};
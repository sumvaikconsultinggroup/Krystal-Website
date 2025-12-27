// SEO utilities and JSON-LD schema generators

export const SITE_CONFIG = {
  name: 'Krystal Magic World',
  tagline: 'Architectural Luxury uPVC Doors & Windows',
  description: 'Premium uPVC doors & windows for Delhi NCR. Superior acoustic, thermal & dust protection since 2012.',
  url: 'https://krystalmagicworld.com',
  logo: 'https://customer-assets.emergentagent.com/job_upvc-specialists/artifacts/2c6u16fh_logo%20png%20%284%29.jpg',
  phone: '+91 98765 43210',
  email: 'info@krystalmagicworld.com',
  address: {
    street: 'Plot No. 45, Sector 18, Udyog Vihar',
    city: 'Gurugram',
    state: 'Haryana',
    postalCode: '122015',
    country: 'IN'
  }
};

// Organization Schema
export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: SITE_CONFIG.logo,
  description: SITE_CONFIG.description,
  foundingDate: '2012',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.country
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE_CONFIG.phone,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi']
  },
  sameAs: []
});

// LocalBusiness Schema
export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_CONFIG.url}/#localbusiness`,
  name: SITE_CONFIG.name,
  image: SITE_CONFIG.logo,
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.street,
    addressLocality: SITE_CONFIG.address.city,
    addressRegion: SITE_CONFIG.address.state,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4595,
    longitude: 77.0266
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00'
  },
  priceRange: '₹₹₹'
});

// Product Schema
export const getProductSchema = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.hero_image,
  brand: {
    '@type': 'Brand',
    name: SITE_CONFIG.name
  },
  manufacturer: {
    '@type': 'Organization',
    name: SITE_CONFIG.name
  },
  category: product.category === 'windows' ? 'Windows' : 'Doors',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
    seller: {
      '@type': 'Organization',
      name: SITE_CONFIG.name
    }
  }
});

// FAQ Schema
export const getFAQSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// Breadcrumb Schema
export const getBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url ? `${SITE_CONFIG.url}${item.url}` : undefined
  }))
});

// Article Schema (for blog posts)
export const getArticleSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.excerpt,
  image: post.hero_image,
  author: {
    '@type': 'Organization',
    name: SITE_CONFIG.name
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    logo: {
      '@type': 'ImageObject',
      url: SITE_CONFIG.logo
    }
  },
  datePublished: post.created_at,
  dateModified: post.created_at
});

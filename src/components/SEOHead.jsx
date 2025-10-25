import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const SEOHead = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title based on language
    const title = language === 'ar' 
      ? 'بصمة الأرض - للاستشارات البيئية | حلول بيئية متكاملة في السعودية'
      : 'Earth Footprint - Environmental Consultations | Integrated Environmental Solutions in Saudi Arabia';
    
    document.title = title;

    // Update meta description
    const description = language === 'ar'
      ? 'مكتب بصمة الأرض للاستشارات البيئية - حلول واستشارات بيئية متكاملة لتمكين جميع المنشآت والقطاعات من النمو بوعي ومسؤولية. خدمات التصاريح البيئية، التقارير، التقييمات، والتدقيق البيئي بأعلى المعايير في المملكة العربية السعودية.'
      : 'Earth Footprint Environmental Consultations - Comprehensive environmental solutions and consultations to enable all facilities and sectors to grow with awareness and responsibility. Environmental permits, reports, assessments, and environmental auditing services with the highest standards in Saudi Arabia.';

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title;

    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.content = description;

    // Update Twitter title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('property', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.content = title;

    // Update Twitter description
    let twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement('meta');
      twitterDescription.setAttribute('property', 'twitter:description');
      document.head.appendChild(twitterDescription);
    }
    twitterDescription.content = description;

    // Update hreflang for language switching
    const currentUrl = window.location.origin + window.location.pathname;
    const arUrl = `${currentUrl}${currentUrl.includes('?') ? '&' : '?'}lang=ar`;
    const enUrl = `${currentUrl}${currentUrl.includes('?') ? '&' : '?'}lang=en`;

    // Remove existing hreflang links
    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    // Add hreflang links
    const hreflangAr = document.createElement('link');
    hreflangAr.rel = 'alternate';
    hreflangAr.hreflang = 'ar';
    hreflangAr.href = arUrl;
    document.head.appendChild(hreflangAr);

    const hreflangEn = document.createElement('link');
    hreflangEn.rel = 'alternate';
    hreflangEn.hreflang = 'en';
    hreflangEn.href = enUrl;
    document.head.appendChild(hreflangEn);

    const hreflangDefault = document.createElement('link');
    hreflangDefault.rel = 'alternate';
    hreflangDefault.hreflang = 'x-default';
    hreflangDefault.href = currentUrl;
    document.head.appendChild(hreflangDefault);

  }, [language]);

  return null; // This component doesn't render anything
};

export default SEOHead;

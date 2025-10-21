import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to Arabic
    return localStorage.getItem('language') || 'ar';
  });

  const [isRTL, setIsRTL] = useState(language === 'ar');

  useEffect(() => {
    // Update document direction and language
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Save to localStorage
    localStorage.setItem('language', language);
    
    // Update body class for CSS targeting
    document.body.className = document.body.className.replace(/lang-\w+/g, '');
    document.body.classList.add(`lang-${language}`);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'ar');
  };

  const value = {
    language,
    isRTL,
    toggleLanguage,
    t: (key) => {
      // Simple translation function - will be enhanced with translation files
      return translations[language]?.[key] || key;
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Basic translations - will be moved to separate files
const translations = {
  ar: {
    // Navigation
    'nav.services': 'الخدمات',
    'nav.whyUs': 'لماذا نحن',
    'nav.about': 'من نحن',
    'nav.numbers': 'في أرقام',
    'nav.clients': 'عملاؤنا',
    'nav.contact': 'تواصل معنا',
    
    // Hero
    'hero.badge': 'الاستشارات البيئية المتكاملة ',
    'hero.brandName': 'بصمة الأرض',
    'hero.subtitle': 'شريكك البيئي الأول',
    'hero.description': 'حلول واستشارات بيئية متكاملة لتمكين جميع المنشآت والقطاعات من النمو بوعي ومسؤولية. نقدم خدمات التصاريح البيئية، التقارير، التقييمات، والتدقيق البيئي بأعلى المعايير',
    'hero.cta': 'تواصل معنا',
    'hero.stats.experience': 'سنوات من الخبرة',
    'hero.stats.projects': 'مشروع بيئي ناجح',
    'hero.stats.regions': 'مناطق نخدمها',
    
    // Services
    'services.title': 'خدماتنا البيئية المتكاملة في السعودية',
    'services.subtitle': 'نقدّم باقة شاملة من الخدمات البيئية التي تمكّن جميع المنشآت والقطاعات من تحقيق الامتثال الكامل للأنظمة والمعايير البيئية المعتمدة في المملكة العربية السعودية. خدمات التصاريح البيئية، التقارير، التقييمات، والتدقيق البيئي',
    
    // Numbers
    'numbers.title': 'بصمة الارض في أرقام',
    'numbers.impactTitle': 'صنعنا الأثر.. ونمضي لنضاعفه',
    'numbers.impactText': 'أكثر من 9 قطاعات وثقت بخبراتنا في تقديم حلول بيئية مبتكرة ومستدامة.',
    
    // About
    'about.title': 'من نحن - بصمة الأرض للاستشارات البيئية',
    'about.description': 'نحن مكتب بصمة الأرض للاستشارات البيئية، شريكك البيئي الأول لجميع القطاعات في المملكة العربية السعودية. نقدم حلول واستشارات بيئية متكاملة تمكّن جميع المنشآت من النمو بوعي ومسؤولية. خبرة 20+ سنة في التصاريح البيئية، التقارير، التقييمات، والتدقيق البيئي',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.location': 'القصيم، المملكة العربية السعودية',
    'contact.whatsapp.title': 'نافذة التواصل عبر واتساب',
    'contact.whatsapp.subtitle': 'التواصل غير المباشر عبر الرسائل',
    'contact.phone.title': 'التواصل المباشر عبر الهاتف',
    'contact.phone.subtitle': 'انقر لنسخ الرقم',
    'contact.copied': 'تم نسخ الرقم بنجاح!',
    
    // Footer
    'footer.description': 'شريكك البيئي الأول لجميع القطاعات في المملكة',
    'footer.copyright': 'جميع الحقوق محفوظة.',
    'footer.nationalNumber': 'الرقم الوطني الموحد : 7039009084',
    
    // Numbers - Stats
    'numbers.stats.experience': 'سنوات من الخبرة',
    'numbers.stats.experienceDesc': 'في مجال الاستشارات البيئية وتقديم الحلول المستدامة',
    'numbers.stats.projects': 'مشروع بيئي ناجح',
    'numbers.stats.projectsDesc': 'نُفّذ باحترافية وفق أعلى المعايير المحلية والدولية',
    'numbers.stats.regions': 'مناطق خدمة',
    'numbers.stats.regionsDesc': 'خدماتنا وصلت إلى 9 مناطق.. وجاهزون لخدمتك أينما كنت في المملكة',
    'numbers.stats.sectors': 'قطاعات متخصصة',
    'numbers.stats.sectorsDesc': 'أكثر من 9 قطاعات وثقت بخبراتنا في تقديم حلول بيئية مبتكرة ومستدامة',
    
    // Numbers - Sectors
    'numbers.sectors.title': 'قطاعات متخصصة',
    'numbers.sectors.subtitle': '— صنعنا الأثر في أكثر من 9 قطاعات تقود التحول البيئي في المملكة',
    'numbers.sectors.industry': 'الصناعة',
    'numbers.sectors.food': 'الأغذية',
    'numbers.sectors.advertising': 'الإعلاني',
    'numbers.sectors.health': 'العيادات الصحية',
    'numbers.sectors.water': 'المياه',
    'numbers.sectors.realEstate': 'التطوير العقاري',
    'numbers.sectors.agriculture': 'الزراعة',
    'numbers.sectors.electronics': 'الإلكترونيات',
    'numbers.sectors.wasteManagement': 'إدارة النفايات',
    
    // Services
    'services.permits.title': 'التصاريح البيئية',
    'services.permits.desc': 'إصدار وتجديد التصاريح البيئية وفق أحدث الأنظمة واللوائح المعتمدة في المملكة.',
    'services.permits.features': ['إصدار الرخص', 'تجديد الرخص', 'الامتثال للأنظمة'],
    'services.permits.detailedTitle': 'بطاقة خدمة التصاريح البيئية(تشغيلي/إنشائي)',
    'services.permits.detailedAbout': 'تُعد خدمة التصاريح البيئية خطوة أساسية وضرورية لمزاولة أي نشاط تشغيلي أو إنشائي، حيث تُمنح لجميع المنشآت ذات التأثير البيئي بمختلف التصنيفات، تُصدر وفق أحدث الأنظمة واللوائح المعتمدة من المركز الوطني للرقابة على الالتزام البيئي، وتُسهم في ضمان توافق النشاط مع المعايير البيئية المعتمدة، الحصول على التصريح لا يقتصر على الالتزام فحسب، بل يُعد استثمارًا في استدامة المشروع وسمعته البيئية، في حين أن عدم الحصول عليه قد يُعرّض المنشأة للمخالفات وإيقاف النشاط.',
    
    'services.reports.title': 'التقارير البيئية الدورية',
    'services.reports.desc': 'إعداد الدراسات والتقارير البيئية الدورية الشاملة والمتخصصة.',
    'services.reports.features': ['دراسات بيئية', 'تقارير دورية', 'تقارير متخصصة'],
    'services.reports.detailedTitle': 'بطاقة خدمة التقارير البيئية الدورية',
    'services.reports.detailedAbout': 'تُعد خدمة إعداد التقارير البيئية الدورية من الخدمات الأساسية للمنشآت، حيث تُلزم هذه المنشآت برفع تقارير دورية توضح مدى التزامها بالاشتراطات والمعايير البيئية المعتمدة من المركز الوطني للرقابة على الالتزام البيئي. يتم إعداد التقارير من قبل مكاتب استشارية معتمدة وتشمل نتائج القياسات البيئية، وتحليل الأداء البيئي للمنشأة، وتقديم توصيات فنية تهدف إلى تحسين كفاءة التشغيل وتقليل التأثيرات البيئية وضمان استدامة النشاط.',
    
    'services.assessment.title': 'تقييم الأثر البيئي',
    'services.assessment.desc': 'تقييم شامل للآثار البيئية المحتملة للمشاريع والأنشطة في جميع القطاعات.',
    'services.assessment.features': ['تقييم الأثر', 'دراسات الجدوى', 'الحلول البيئية'],
    'services.assessment.detailedTitle': 'بطاقة خدمة تقييم الأثر البيئي',
    'services.assessment.detailedAbout': 'تُعد خدمة تقييم الأثر البيئي خطوة محورية قبل تنفيذ أي مشروع جديد، حيث يتم من خلالها تحليل وتقييم التأثيرات البيئية المحتملة للنشاط المقترح على الهواء والمياه والتربة والمجتمع المحيط. تشمل الخدمة إعداد دراسات الجدوى البيئية وتقديم الحلول والتوصيات الفنية التي تضمن تقليل الأضرار وتعزيز ممارسات التنمية المستدامة. يهدف التقييم إلى تمكين المنشآت من الحصول على الموافقات البيئية بثقة، وبدء أنشطتها بما يتوافق مع الأنظمة والمعايير المعتمدة في المملكة.',
    
    'services.audit.title': 'التدقيق البيئي',
    'services.audit.desc': 'خدمات تدقيق بيئي متكاملة لضمان الامتثال المستمر للمعايير البيئية.',
    'services.audit.features': ['التدقيق الداخلي', 'مراجعة الامتثال', 'التحسين المستمر'],
    'services.audit.detailedTitle': 'بطاقة خدمة التدقيق البيئي',
    'services.audit.detailedAbout': 'دراسة تشمل نتائج فحص موضوعي ومنظم ودوري وموثّق للعمليات التشغيلية لمنشأة معينة، تُعدّ بعد إنشاء أو خلال تشغيل المنشأة؛ من أجل التحقق من استيفائها للاشتراطات والضوابط والمقاييس والمعايير البيئية، وتحسين الأداء البيئي للمنشأة، والتزامها بالأحكام الواردة في النظام، واللوائح، والتراخيص، والتصاريح ذات العلاقة.',
    
    'services.management.title': 'خطط الإدارة البيئية',
    'services.management.desc': 'تطوير خطط إدارة بيئية شاملة ومتكاملة لضمان الاستدامة البيئية.',
    'services.management.features': ['خطط الإدارة', 'الاستدامة البيئية', 'الإدارة المتكاملة'],
    'services.management.detailedTitle': 'بطاقة خدمة خطط الإدارة البيئية',
    'services.management.detailedAbout': 'تُقدّم خدمة خطط الإدارة البيئية للمنشآت ذات التأثير البيئي المنخفض والمصنّفة ضمن الفئة الأولى، حيث تهدف إلى وضع خطط إدارة شاملة ومتكاملة لضمان الالتزام بالمعايير البيئية وتحقيق الاستدامة في العمليات التشغيلية. تشمل الخدمة تطوير استراتيجيات الاستدامة البيئية والإدارة المتكاملة، مع التركيز على تقليل الأثر البيئي وتعزيز الكفاءة التشغيلية. وتهدف إلى تمكين المنشآت من الامتثال البيئي المستمر ودعم التطوير المستدام لأعمالها.',
    
    'services.rehabilitation.title': 'خطط إعادة التأهيل البيئي',
    'services.rehabilitation.desc': 'تطوير برامج إعادة التأهيل البيئي للمواقع الملوثة والمتدهورة.',
    'services.rehabilitation.features': ['إعادة التأهيل', 'استصلاح المواقع', 'التحسين البيئي'],
    'services.rehabilitation.detailedTitle': 'بطاقة خدمة إعادة التأهيل البيئي',
    'services.rehabilitation.detailedAbout': 'تُقدّم خدمة خطط إعادة التأهيل البيئي للمواقع الملوثة والمتدهورة، بهدف استعادة توازنها البيئي وتحسين جودتها بشكل مستدام. تشمل الخدمة تطوير برامج متكاملة لإعادة التأهيل والاستصلاح البيئي، تتضمن تقييم الحالة الحالية، وضع استراتيجيات المعالجة، ومتابعة تنفيذ الحلول لضمان استعادة الموارد الطبيعية والوظائف البيئية للموقع. وتهدف الخدمة إلى تحسين الأداء البيئي للمواقع المتدهورة وتعزيز استدامتها بما يتوافق مع المعايير واللوائح البيئية المعتمدة.',
    
    'services.consulting.title': 'الاستشارات الفنية المتخصصة',
    'services.consulting.desc': 'استشارات فنية متخصصة في إدارة الموارد البيئية، النفايات، التلوث، الطاقة المستدامة، والتخطيط الحضري لجميع القطاعات.',
    'services.consulting.features': ['إدارة الموارد', 'الطاقة المستدامة', 'التخطيط البيئي'],
    'services.consulting.detailedTitle': 'بطاقة خدمة الاستشارات الفنية المتخصصة',
    'services.consulting.detailedAbout': 'تُقدّم خدمة الاستشارات الفنية المتخصصة دعماً متكاملاً للمنشآت في إدارة الموارد البيئية، النفايات، التلوث، والطاقة المستدامة عبر جميع القطاعات. تستند الخدمة إلى تراكم المعرفة والخبرة المكتسبة من العمل على عدد هائل من المشاريع البيئية، ويُنفذها فريق استشاري بحثي مختص لتقديم تحليلات دقيقة ومبنية على بيانات علمية، مما يُسهم في دعم صناع القرار واتخاذ خيارات استراتيجية مستنيرة. وتهدف الخدمة إلى تحسين الأداء البيئي، تعزيز الاستدامة، وتقديم حلول عملية مبتكرة تضمن توافق المشاريع مع المعايير واللوائح البيئية المعتمدة.',
    
    'services.mawan.title': 'إصدار تصريح موان',
    'services.mawan.desc': 'خدمة إصدار تصاريح موان لإدارة النفايات وفق الأنظمة واللوائح المعتمدة في المملكة.',
    'services.mawan.features': ['إدارة النفايات', 'التصاريح البيئية', 'الامتثال التنظيمي'],
    'services.mawan.detailedTitle': 'بطاقة خدمة إصدار تصريح موان (جديد)',
    'services.mawan.detailedAbout': 'تقدّم خدمة إصدار تصاريح موان لإدارة النفايات حلاً متكاملاً للمنشآت الراغبة في ممارسة أنشطة جمع، نقل، تخزين، إعادة تدوير، أو التخلص النهائي من النفايات وفق الأنظمة واللوائح المعتمدة في المملكة. تساعد هذه الخدمة المنشآت على الامتثال للمتطلبات البيئية والتنظيمية، من خلال إعداد المستندات والخطط البيئية اللازمة، وتقديم الطلبات إلكترونيًا، ومتابعة إجراءات الحصول على التصريح حتى صدوره. وتهدف الخدمة إلى تسهيل ممارسات إدارة النفايات بشكل آمن ومستدام، وضمان التوافق مع معايير الصحة والسلامة وحماية البيئة، مما يعزز استدامة الأعمال ويقلل المخاطر البيئية المحتملة.',
    
    // Projects/Why Us
    'projects.title': 'لماذا تختار بصمة الأرض؟',
    'projects.subtitle': 'نتميز بخبرة ميدانية متخصصة وفريق عمل مؤهل يقدم حلولًا مبتكرة تدعم أهداف التنمية المستدامة',
    'projects.experience.title': 'الخبرة الميدانية المتخصصة',
    'projects.experience.company': 'فريق عمل مؤهل ومتمرس',
    'projects.experience.description': 'نتميز بخبرة عملية واسعة في التعامل مع مختلف القطاعات والأنشطة وتقديم حلول واقعية وفعّالة.',
    'projects.experience.results': ['فريق متخصص', 'خبرة ميدانية', 'حلول مبتكرة'],
    'projects.experience.category': 'الخبرة',
    
    'projects.vision.title': 'دعم التنمية المستدامة',
    'projects.vision.company': 'رؤية المملكة 2030',
    'projects.vision.description': 'نساهم في تحقيق أهداف التنمية المستدامة ودعم رؤية المملكة 2030 من خلال حلول بيئية متكاملة.',
    'projects.vision.results': ['رؤية 2030', 'التنمية المستدامة', 'الأداء البيئي'],
    'projects.vision.category': 'الرؤية',
    
    'projects.coverage.title': 'تغطية شاملة للمملكة',
    'projects.coverage.company': 'من القصيم لكل المناطق',
    'projects.coverage.description': 'مقرنا في القصيم ونقدم خدماتنا لكافة مناطق المملكة من خلال شبكة من الشراكات والتعاون.',
    'projects.coverage.results': ['تغطية واسعة', 'شراكات قوية', 'خدمة متميزة'],
    'projects.coverage.category': 'التغطية',
    
    // Clients
    'clients.title': 'عملاؤنا',
    
    // Contact Form
    'contactForm.title': 'تواصل معنا',
    'contactForm.name': 'الاسم',
    'contactForm.namePlaceholder': 'أدخل اسمك الكامل',
    'contactForm.email': 'البريد الإلكتروني',
    'contactForm.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'contactForm.phone': 'رقم الهاتف',
    'contactForm.phonePlaceholder': 'أدخل رقم هاتفك (اختياري)',
    'contactForm.jobTitle': 'المسمى الوظيفي',
    'contactForm.jobTitlePlaceholder': 'أدخل المسمى الوظيفي',
    'contactForm.officeName': 'اسم المكتب',
    'contactForm.officeNamePlaceholder': 'أدخل اسم المكتب',
    'contactForm.service': 'الخدمة المطلوبة',
    'contactForm.servicePlaceholder': 'اختر الخدمة التي تهمك',
    'contactForm.otherService': 'خدمة أخرى',
    'contactForm.message': 'الرسالة',
    'contactForm.messagePlaceholder': 'اكتب رسالتك هنا...',
    'contactForm.send': 'إرسال الرسالة',
    'contactForm.sending': 'جاري الإرسال...',
    'contactForm.successMessage': 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
    'contactForm.errorMessage': 'حدث خطأ في إرسال الرسالة. حاول مرة أخرى.',
    
    // Common
    'common.seeMore': 'عرض المزيد',
    'common.seeLess': 'عرض أقل',
    'common.aboutService': 'حول الخدمة',
    'common.brandName': 'بصمة الأرض',
    'common.brandSubtitle': 'للاستشارات البيئية',
    'common.mapTitle': 'موقعنا'
  },
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.whyUs': 'Why Us',
    'nav.about': 'About Us',
    'nav.numbers': 'In Numbers',
    'nav.clients': 'Our Clients',
    'nav.contact': 'Contact Us',
    
    // Hero
    'hero.badge': 'Integrated Environmental Consulting',
    'hero.brandName': 'Earth Footprint',
    'hero.subtitle': 'Your Environmental Partner for All Sectors',
    'hero.description': 'Comprehensive environmental solutions and consulting to enable all facilities and sectors to grow with awareness and responsibility',
    'hero.cta': 'Contact Us',
    'hero.stats.experience': 'Years of Experience',
    'hero.stats.projects': 'Successful Environmental Projects',
    'hero.stats.regions': 'Regions We Serve',
    
    // Services
    'services.title': 'Our Integrated Environmental Services',
    'services.subtitle': 'We provide a comprehensive package of environmental services that enable all facilities and sectors to achieve full compliance with environmental regulations and standards approved in the Kingdom',
    
    // Numbers
    'numbers.title': 'Earth Footprint in Numbers',
    'numbers.impactTitle': 'We Made an Impact.. And We Continue to Multiply It',
    'numbers.impactText': 'More than 9 sectors have trusted our expertise in providing innovative and sustainable environmental solutions.',
    
    // About
    'about.title': 'About Us',
    'about.description': 'We are Earth Footprint Environmental Consulting Office, your first environmental partner for all sectors in the Kingdom. We provide comprehensive environmental solutions and consulting that enable all facilities to grow with awareness and responsibility. 20+ years of experience in environmental permits, reports, assessments, and environmental auditing.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.location': 'Qassim, Kingdom of Saudi Arabia',
    'contact.whatsapp.title': 'WhatsApp Communication Window',
    'contact.whatsapp.subtitle': 'Indirect communication via messages',
    'contact.phone.title': 'Direct communication via phone',
    'contact.phone.subtitle': 'Click to copy number',
    'contact.copied': 'Number copied successfully!',
    
    // Footer
    'footer.description': 'Your first environmental partner for all sectors in the Kingdom',
    'footer.copyright': 'All rights reserved.',
    'footer.nationalNumber': 'Unified National Number: 7039009084',
    
    // Numbers - Stats
    'numbers.stats.experience': 'Years of Experience',
    'numbers.stats.experienceDesc': 'In environmental consulting and providing sustainable solutions',
    'numbers.stats.projects': 'Successful Environmental Projects',
    'numbers.stats.projectsDesc': 'Executed professionally according to the highest local and international standards',
    'numbers.stats.regions': 'Service Regions',
    'numbers.stats.regionsDesc': 'Our services have reached 9 regions.. and we are ready to serve you wherever you are in the Kingdom',
    'numbers.stats.sectors': 'Specialized Sectors',
    'numbers.stats.sectorsDesc': 'More than 9 sectors have trusted our expertise in providing innovative and sustainable environmental solutions',
    
    // Numbers - Sectors
    'numbers.sectors.title': 'Specialized Sectors',
    'numbers.sectors.subtitle': '— We made an impact in more than 9 sectors leading environmental transformation in the Kingdom',
    'numbers.sectors.industry': 'Industry',
    'numbers.sectors.food': 'Food',
    'numbers.sectors.advertising': 'Advertising',
    'numbers.sectors.health': 'Health Clinics',
    'numbers.sectors.water': 'Water',
    'numbers.sectors.realEstate': 'Real Estate Development',
    'numbers.sectors.agriculture': 'Agriculture',
    'numbers.sectors.electronics': 'Electronics',
    'numbers.sectors.wasteManagement': 'Waste Management',
    
    // Services
    'services.permits.title': 'Environmental Permits',
    'services.permits.desc': 'Issuing and renewing environmental permits according to the latest systems and regulations approved in the Kingdom.',
    'services.permits.features': ['License Issuance', 'License Renewal', 'Regulatory Compliance'],
    'services.permits.detailedTitle': 'Environmental Permits Service Card (Operational/Construction)',
    'services.permits.detailedAbout': 'Environmental permits service is a basic and necessary step for practicing any operational or construction activity, where it is granted to all facilities with environmental impact of various classifications, issued according to the latest systems and regulations approved by the National Center for Environmental Compliance Control, and contributes to ensuring the activity\'s compliance with approved environmental standards. Obtaining the permit is not limited to compliance only, but is an investment in the project\'s sustainability and environmental reputation, while not obtaining it may expose the facility to violations and activity suspension.',
    
    'services.reports.title': 'Periodic Environmental Reports',
    'services.reports.desc': 'Preparing comprehensive and specialized periodic environmental studies and reports.',
    'services.reports.features': ['Environmental Studies', 'Periodic Reports', 'Specialized Reports'],
    'services.reports.detailedTitle': 'Periodic Environmental Reports Service Card',
    'services.reports.detailedAbout': 'The periodic environmental reports preparation service is one of the basic services for facilities with second and third environmental classification, where these facilities are required to submit periodic reports showing their compliance with environmental requirements and standards approved by the National Center for Environmental Compliance Control. Reports are prepared by accredited consulting offices and include environmental measurement results, facility environmental performance analysis, and technical recommendations aimed at improving operational efficiency and reducing environmental impacts and ensuring activity sustainability.',
    
    'services.assessment.title': 'Environmental Impact Assessment',
    'services.assessment.desc': 'Comprehensive assessment of potential environmental impacts of projects and activities in all sectors.',
    'services.assessment.features': ['Impact Assessment', 'Feasibility Studies', 'Environmental Solutions'],
    'services.assessment.detailedTitle': 'Environmental Impact Assessment Service Card',
    'services.assessment.detailedAbout': 'Environmental impact assessment service is a pivotal step before implementing any new project, through which potential environmental impacts of the proposed activity on air, water, soil, and surrounding community are analyzed and assessed. The service includes preparing environmental feasibility studies and providing solutions and technical recommendations that ensure reducing damages and promoting sustainable development practices. The assessment aims to enable facilities to obtain environmental approvals with confidence and start their activities in accordance with systems and standards approved in the Kingdom.',
    
    'services.audit.title': 'Environmental Audit',
    'services.audit.desc': 'Comprehensive environmental audit services to ensure continuous compliance with environmental standards.',
    'services.audit.features': ['Internal Audit', 'Compliance Review', 'Continuous Improvement'],
    'services.audit.detailedTitle': 'Environmental Audit Service Card',
    'services.audit.detailedAbout': 'Environmental audit service is a developmental and proactive service aimed at raising the efficiency of facilities\' environmental performance and ensuring continuous compliance with approved systems and standards. Through it, precise internal reviews are conducted to assess the level of environmental compliance, while monitoring improvement opportunities in operational processes and procedures. The service focuses on improving performance and reducing environmental risks, which enhances activity sustainability and raises resource use efficiency and reflects the facility\'s commitment to environmental responsibility.',
    
    'services.management.title': 'Environmental Management Plans',
    'services.management.desc': 'Developing comprehensive and integrated environmental management plans to ensure environmental sustainability.',
    'services.management.features': ['Management Plans', 'Environmental Sustainability', 'Integrated Management'],
    'services.management.detailedTitle': 'Environmental Management Plans Service Card',
    'services.management.detailedAbout': 'Environmental management plans service is provided to facilities with low environmental impact classified within the first category, where it aims to develop comprehensive and integrated management plans to ensure compliance with environmental standards and achieve sustainability in operational processes. The service includes developing environmental sustainability strategies and integrated management, with a focus on reducing environmental impact and enhancing operational efficiency. It aims to enable facilities to achieve continuous environmental compliance and support sustainable development of their business.',
    
    'services.rehabilitation.title': 'Environmental Rehabilitation Plans',
    'services.rehabilitation.desc': 'Developing environmental rehabilitation programs for damaged and degraded sites.',
    'services.rehabilitation.features': ['Rehabilitation', 'Site Reclamation', 'Environmental Improvement'],
    'services.rehabilitation.detailedTitle': 'Environmental Rehabilitation Service Card',
    'services.rehabilitation.detailedAbout': 'Environmental rehabilitation plans service is provided to damaged or contaminated sites, with the aim of restoring their environmental balance and improving their quality sustainably. The service includes developing integrated programs for environmental rehabilitation and reclamation, including assessing the current condition, developing treatment strategies, and following up on solution implementation to ensure restoration of natural resources and environmental functions of the site. The service aims to improve the environmental performance of degraded sites and enhance their sustainability in accordance with approved environmental standards and regulations.',
    
    'services.consulting.title': 'Specialized Technical Consulting',
    'services.consulting.desc': 'Specialized technical consulting in environmental resource management, waste, pollution, sustainable energy, and urban planning for all sectors.',
    'services.consulting.features': ['Resource Management', 'Sustainable Energy', 'Environmental Planning'],
    'services.consulting.detailedTitle': 'Specialized Technical Consulting Service Card',
    'services.consulting.detailedAbout': 'Specialized technical consulting service provides comprehensive support to facilities in environmental resource management, waste, pollution, and sustainable energy across all sectors. The service is based on accumulated knowledge and experience gained from working on a huge number of environmental projects, and is implemented by a specialized research consulting team to provide accurate analyses based on scientific data, which contributes to supporting decision makers and making informed strategic choices. The service aims to improve environmental performance, enhance sustainability, and provide practical innovative solutions that ensure project compatibility with approved environmental standards and regulations.',
    
    'services.mawan.title': 'Mawan Permit Issuance',
    'services.mawan.desc': 'Mawan permit issuance service for waste management according to systems and regulations approved in the Kingdom.',
    'services.mawan.features': ['Waste Management', 'Environmental Permits', 'Regulatory Compliance'],
    'services.mawan.detailedTitle': 'Mawan Permit Issuance Service Card (New)',
    'services.mawan.detailedAbout': 'Mawan waste management permit issuance service provides a comprehensive solution for facilities wishing to practice waste collection, transportation, storage, recycling, or final disposal activities according to systems and regulations approved in the Kingdom. This service helps facilities comply with environmental and regulatory requirements, by preparing necessary environmental documents and plans, submitting applications electronically, and following up on permit issuance procedures until issuance. The service aims to facilitate safe and sustainable waste management practices, and ensure compatibility with health, safety, and environmental protection standards, which enhances business sustainability and reduces potential environmental risks.',
    
    // Projects/Why Us
    'projects.title': 'Why Choose Earth Footprint?',
    'projects.subtitle': 'We are distinguished by specialized field experience and a qualified team that provides innovative solutions supporting sustainable development goals',
    'projects.experience.title': 'Specialized Field Experience',
    'projects.experience.company': 'Qualified and Experienced Team',
    'projects.experience.description': 'We are distinguished by extensive practical experience in dealing with various sectors and activities and providing realistic and effective solutions.',
    'projects.experience.results': ['Specialized Team', 'Field Experience', 'Innovative Solutions'],
    'projects.experience.category': 'Experience',
    
    'projects.vision.title': 'Supporting Sustainable Development',
    'projects.vision.company': 'Vision 2030',
    'projects.vision.description': 'We contribute to achieving sustainable development goals and supporting Vision 2030 through integrated environmental solutions.',
    'projects.vision.results': ['Vision 2030', 'Sustainable Development', 'Environmental Performance'],
    'projects.vision.category': 'Vision',
    
    'projects.coverage.title': 'Comprehensive Kingdom Coverage',
    'projects.coverage.company': 'From Qassim to All Regions',
    'projects.coverage.description': 'Based in Qassim, we provide our services to all regions of the Kingdom through a network of partnerships and cooperation.',
    'projects.coverage.results': ['Wide Coverage', 'Strong Partnerships', 'Excellent Service'],
    'projects.coverage.category': 'Coverage',
    
    // Clients
    'clients.title': 'Our Clients',
    
    // Contact Form
    'contactForm.title': 'Contact Us',
    'contactForm.name': 'Name',
    'contactForm.namePlaceholder': 'Enter your full name',
    'contactForm.email': 'Email',
    'contactForm.emailPlaceholder': 'Enter your email address',
    'contactForm.phone': 'Phone Number',
    'contactForm.phonePlaceholder': 'Enter your phone number (optional)',
    'contactForm.jobTitle': 'Job Title',
    'contactForm.jobTitlePlaceholder': 'Enter your job title',
    'contactForm.officeName': 'Office Name',
    'contactForm.officeNamePlaceholder': 'Enter your office name',
    'contactForm.service': 'Service Required',
    'contactForm.servicePlaceholder': 'Select the service you need',
    'contactForm.otherService': 'Other Service',
    'contactForm.message': 'Message',
    'contactForm.messagePlaceholder': 'Write your message here...',
    'contactForm.send': 'Send Message',
    'contactForm.sending': 'Sending...',
    'contactForm.successMessage': 'Your message has been sent successfully! We will contact you soon.',
    'contactForm.errorMessage': 'An error occurred while sending the message. Please try again.',
    
    // Common
    'common.seeMore': 'See More',
    'common.seeLess': 'See Less',
    'common.aboutService': 'About the Service',
    'common.brandName': 'Earth Footprint',
    'common.brandSubtitle': 'Environmental Consulting',
    'common.mapTitle': 'Our Location'
  }
};

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

// Fallback static testimonials
const staticTestimonials = [
  {
    id: 1,
    name: "Moamen Khafagy",
    rating: 5,
    date: "قبل شهر",
    review: "مكتب بصمة الأرض للإستشارات البيئية السرعة و الدقة والتنفيذ هو محل اهتمامهم والتواصل معهم قمة في الذوق و الإحترام و متابعة طلبات العميل لحظة بلحظة إلى أن يتم تسليم العميل التصاريح و التراخيص معتمدة .نتمنى لهم المزيد من التميز و النجاح الدائم. إن شاء الله"
  },
  {
    id: 2,
    name: "Saeed Salah 1418",
    rating: 5,
    date: "قبل شهر",
    review: "مكتب بصمة الأرض للاستشارات البيئية من أميز المكاتب المتخصصة في المجال، ولمست فيهم الاحترافية والجدية. وأخص بالشكر المهندس فهد على تعامله الراقي وحرصه على تقديم أفضل ما عنده بكل إخلاص.واسكره علي سعة صدره وان شاء الله كل التعاملات القادمه معهم انصح فيهم جدا"
  },
  {
    id: 3,
    name: "عبدالله العنزي",
    rating: 5,
    date: "قبل شهرين",
    review: "مكتب تصاريح بيئيه واستشارات شاب سعودي واقف على شغله الله يعطيه العافية"
  },
  {
    id: 4,
    name: "M6B",
    rating: 5,
    date: "قبل أسبوع",
    review: "شكر خاص لتعاملهم الراقي و خدمتهم السريعة و سرعة استجابتهم بالواتساب لين استخرجت التصاريح"
  },
  {
    id: 5,
    name: "Dodge",
    rating: 5,
    date: "قبل أسبوع",
    review: "مكتب محترف وسريع ودقيق وتعامل أكثر من رائع . يستاهلون ألف نجمه ❤️"
  },
  {
    id: 6,
    name: "جاف الإعلانية خدمات التصميم والطباعة",
    rating: 5,
    date: "قبل 3 أشهر",
    review: "مكتب مميز وسريع بالاجراءات اصدر لنا تصريح بيئي ، والأخ فهد ما يقصر واضح وخدوم 🌷🌷"
  },
  {
    id: 7,
    name: "Tarem Saleh",
    rating: 5,
    date: "قبل شهر",
    review: "سريع بالانجاز التصاريح"
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching reviews from API...');
      
      // Try to fetch from backend API - always use the deployed backend URL
      const baseUrl = 'https://apiearthfootprint.vercel.app/api/reviews';
      const apiUrl = forceRefresh ? `${baseUrl}/refresh` : baseUrl;
        
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(15000)
      });

      console.log('📡 API Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('📊 API Response data:', data);
        
        if (data.success && data.data && data.data.length > 0) {
          setTestimonials(data.data);
          console.log('✅ Live reviews loaded:', data.count, 'reviews');
          console.log('🖼️ First review profile image:', data.data[0]?.profileImage);
          if (data.refreshed) {
            console.log('🔄 Reviews force refreshed!');
          }
        } else {
          console.warn('⚠️ No reviews in API response, using static data');
          setTestimonials(staticTestimonials);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.warn('⚠️ Failed to fetch live reviews, using static data:', error.message);
      setError(error.message);
      setTestimonials(staticTestimonials);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={styles.star}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <section className={styles['testimonials-section']}>
      <div className="container">
        <div className={styles['testimonials-header']}>
          <h2>آراء عملائنا</h2>
          <p>نفتخر بثقة عملائنا ونلتزم بتقديم أفضل الخدمات</p>
          <div className={styles['header-controls']}>
            <button 
              onClick={() => fetchReviews()} 
              disabled={loading}
              className={styles['refresh-btn']}
            >
              {loading ? 'جاري التحديث...' : 'تحديث المراجعات'}
            </button>
            <button 
              onClick={() => fetchReviews(true)} 
              disabled={loading}
              className={styles['refresh-btn']}
              style={{ backgroundColor: '#ff6b35', marginTop: '10px' }}
            >
              {loading ? 'جاري التحديث...' : '🔄 تحديث قسري (مراجعات جديدة)'}
            </button>
            {error && (
              <span className={styles['error-message']}>
                (عرض البيانات المحفوظة)
              </span>
            )}
          </div>
        </div>
        
        {loading ? (
          <div className={styles['loading-container']}>
            <div className={styles['loading-spinner']}></div>
            <p>جاري تحميل المراجعات...</p>
          </div>
        ) : (
          <div className={styles['testimonials-grid']}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles['testimonial-card']}>
                <div className={styles['testimonial-header']}>
                  <div className={styles['testimonial-info']}>
                    <div className={styles['testimonial-profile']}>
                      {testimonial.profileImage ? (
                        <img 
                          src={testimonial.profileImage} 
                          alt={testimonial.name}
                          className={styles['profile-image']}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => console.log('✅ Profile image loaded for:', testimonial.name)}
                          onError={(e) => {
                            console.log('❌ Profile image failed to load for:', testimonial.name, testimonial.profileImage);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={styles['profile-placeholder']}
                        style={{ display: testimonial.profileImage ? 'none' : 'flex' }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div className={styles['testimonial-details']}>
                      <h3 className={styles['testimonial-name']}>{testimonial.name}</h3>
                      <div className={styles['testimonial-rating']}>
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className={styles['testimonial-date']}>{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles['testimonial-content']}>
                  <p className={styles['testimonial-text']}>{testimonial.review}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
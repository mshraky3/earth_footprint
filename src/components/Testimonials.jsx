import React, { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

// Fallback static testimonials
const staticTestimonials = [
  {
    id: "review_0",
    name: "Moamen Khafagy",
    rating: 5,
    review: "مكتب بصمة الأرض للإستشارات البيئية\nالسرعة و الدقة والتنفيذ هو محل اهتمامهم والتواصل معهم قمة  في الذوق و الإحترام و متابعة طلبات العميل لحظة بلحظة إلى أن يتم تسليم العميل التصاريح و التراخيص معتمدة .نتمنى لهم نفس من التميز و النجاح الدائم.            إن شاء الله",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocIpE3aKzhn_fBIV8f7H7gZCrB7blKCg7Aoi4vFue2o2ixptvQ=w36-h36-p-rp-mo-br100"
  },
  {
    id: "review_1",
    name: "Saeed Salah 1418",
    rating: 5,
    review: "مكتب بصمة الأرض للاستشارات البيئية من أميز المكاتب المتخصصة في المجال، ولمست فيهم الاحترافية والجدية. وأخص بالشكر المهندس فهد على تعامله الراقي وحرصه على تقديم أفضل ما عنده بكل إخلاص.واسكره علي سعة صدره وان شاء الله كل التعاملات القادمه معهم  انصح فيهم جدا",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocLc2WaGn0mkL4i_wPe525ltu7AtYmMtlsnQe39hmqHUbS6SKA=w36-h36-p-rp-mo-br100"
  },
  {
    id: "review_2",
    name: "عبدالله العنزي",
    rating: 5,
    review: "مكتب تصاريح بيئيه\nواستشارات\nشاب سعودي واقف على شغله الله يعطيه العافية\nيستحق الدعم من اصحاب الاعمال ..\n\nتم عمل تصريح في وقت قياسي ودقة في العمل",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocLvID-PivQ42DPKaiTdzA717fZtEvffx37bL66rbOXu5g5byg=w36-h36-p-rp-mo-ba3-br100"
  },
  {
    id: "review_3",
    name: "M6B",
    rating: 5,
    review: "شكر خاص لتعاملهم الراقي و خدمتهم السريعة\nو سرعة استجابتهم بالواتساب لين استخرجت التصاريح",
    profileImage: "https://lh3.googleusercontent.com/a-/ALV-UjXIHRNyEK79lBa7FqdoBdEYRTBH9UqrrGyW5JScY1mIEopTFnM=w36-h36-p-rp-mo-ba2-br100"
  },
  {
    id: "review_4",
    name: "Dodge",
    rating: 5,
    review: "مكتب محترف وسريع ودقيق وتعامل أكثر من رائع .\nيستاهلون ألف نجمه",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocI7R2Cvss9ut4vOEyhWAIQ1UWbzbpgjhxpGVtiBqv1AOmor_w=w36-h36-p-rp-mo-br100"
  },
  {
    id: "review_5",
    name: "جاف الإعلانية خدمات التصميم والطباعة",
    rating: 5,
    review: "مكتب مميز وسريع بالاجراءات اصدر لنا تصريح بيئي ، والأخ فهد ما يقصر واضح وخدوم",
    profileImage: "https://lh3.googleusercontent.com/a-/ALV-UjXK1dl7bmEx32NKSeEg3aOn3nmp3NI_VJtozkMlQT7Q57Qk7kQn=w36-h36-p-rp-mo-br100"
  },
  {
    id: "review_6",
    name: "Tarem Saleh",
    rating: 5,
    review: "سريع بالانجاز التصاريح",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocLE7Y3LhnwlOk2FxjrjLtV-g2esx1zrV3zEvbitlpZf_JfGtA=w36-h36-p-rp-mo-br100"
  },
  {
    id: "review_7",
    name: "Muhmod Alshraky",
    rating: 5,
    review: "والله يا مكتب بصمة الأرض للاستشارات البيئية، لقيت الجدية والاحترام من أول لحظة. وأخص بالشكر المهندس رائد، اللي كان تعامله فعلاً راقي ومحترم، وما يقدر ينكر إنه حريص كل الحرص يسوي الأمور بأفضل شكل، وبإخلاص كبير. ويا ليت كل الناس تتعامل هالطريقة ، خصوصًا سعة صدره وطيبة قلبه في كل المواقف. وإن شاء الله أي تعامل قادم معهم يكون أكيد، وأنا أضمنهم للجميع بدون تردد",
    profileImage: "https://lh3.googleusercontent.com/a-/ALV-UjXs6IZkxvbRnqPbhvq_ZBarFG0Aaalz_VK9dGB1_JloNpmyMDA=w36-h36-p-rp-mo-br100"
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
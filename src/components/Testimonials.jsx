import React, { useState, useEffect, useCallback } from 'react';
import styles from './Testimonials.module.css';

// Empty fallback for testing (will show loading state if API fails)
const staticTestimonials = [];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching reviews from backend API...');
      
      // Try backend API first (production)
      const baseUrl = 'https://apiearthfootprint.vercel.app/api/reviews';
      const apiUrl = forceRefresh ? `${baseUrl}/refresh` : baseUrl;
        
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15000)
      });

      console.log('📡 API Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('📊 API Response data:', data);
        
        if (data.success && data.data && data.data.length > 0) {
          setTestimonials(data.data);
          console.log('✅ Backend reviews loaded:', data.count, 'reviews');
          console.log('🖼️ Source:', data.source);
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
      console.warn('⚠️ Failed to fetch backend reviews, using static data:', error.message);
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
          {testimonials.length > 0 && testimonials[0]?.source && testimonials[0].source !== 'static' && (
            <div className={styles['source-indicator']}>
              <span className={styles['google-badge']}>
                📍 {testimonials[0].source.includes('apify') ? 'مراجعات مباشرة من Google Maps' : 'مراجعات مباشرة من Google'}
              </span>
            </div>
          )}
          <div className={styles['header-controls']}>
            <button 
              onClick={() => fetchReviews(true)} 
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
              <div 
                key={testimonial.id} 
                className={styles['testimonial-card']}
                onClick={() => {
                  if (testimonial.reviewUrl) {
                    window.open(testimonial.reviewUrl, '_blank', 'noopener,noreferrer');
                  }
                }}
                style={{ 
                  cursor: testimonial.reviewUrl ? 'pointer' : 'default',
                  transition: 'all 0.3s ease'
                }}
                title={testimonial.reviewUrl ? 'انقر لعرض المراجعة على Google Maps' : ''}
              >
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
                  {testimonial.reviewUrl && (
                    <div className={styles['click-indicator']}>
                      <span className={styles['click-icon']}>🔗</span>
                    </div>
                  )}
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
// Shared scroll utility to eliminate code duplication
export const scrollToSection = (sectionId, setIsScrolling) => {
  return (e) => {
    e.preventDefault();
    
    // Prevent multiple scroll animations
    if (setIsScrolling && setIsScrolling()) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      if (setIsScrolling) setIsScrolling(true);
      const navHeight = 100; // Account for fixed navigation height
      const targetPosition = element.offsetTop - navHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Slower duration (1.2 seconds)
      let start = null;

      // Easing function for smooth animation
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        } else {
          if (setIsScrolling) setIsScrolling(false);
        }
      };

      requestAnimationFrame(animation);
    }
  };
};

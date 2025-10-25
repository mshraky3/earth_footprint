import axios from 'axios';

const API_BASE_URL = 'https://apiearthfootprint.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const emailService = {
  // Send contact form email
  sendContactEmail: async (formData) => {
    try {
      const response = await api.post('/api/contact', formData);
      return response.data;
    } catch (error) {
      console.error('Contact email error:', error);
      throw new Error(
        error.response?.data?.error || 
        'Failed to send contact email'
      );
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email, language = 'ar') => {
    try {
      const response = await api.post('/api/newsletter', {
        email,
        language
      });
      return response.data;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw new Error(
        error.response?.data?.error || 
        'Failed to subscribe to newsletter'
      );
    }
  }
};

export default emailService;

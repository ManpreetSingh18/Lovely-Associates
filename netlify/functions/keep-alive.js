// File: netlify/functions/keep-alive.js

export default {
  async scheduled(event, context) {
    const RENDER_BACKEND_URL = 'https://la-server.onrender.com';

    console.log('Pinging the backend to keep it alive...');

    try {
      const response = await fetch(RENDER_BACKEND_URL);
      if (response.ok) {
        const data = await response.text();
        console.log(`Successfully pinged backend: ${data}`);
      } else {
        console.error(`Failed to ping backend. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error pinging backend:', error);
    }

    // Netlify's scheduled functions require a 200 response to confirm success
    return {
      statusCode: 200,
    };
  },
};
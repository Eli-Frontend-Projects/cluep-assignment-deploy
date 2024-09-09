const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:3000', // Default to localhost if env variable is not set
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});

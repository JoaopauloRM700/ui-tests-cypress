const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.bemol.com.br",
     blockHosts: [
      '*.googletagmanager.com',
      '*.google-analytics.com',
      '*.clarity.ms',
      '*.taboola.com',
      '*.tiktok.com',
      '*.datadoghq.com',
      'i.konduto.com',
      'gum.criteo.com',
    ],
    setupNodeEvents(on, config) {
      return config;
    },
  },
});

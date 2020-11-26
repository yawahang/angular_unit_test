// Configure CLI for CI testing in Chrome
// https://angular.io/guide/testing
// In the root folder of your e2e tests project, create a new file named protractor-ci.conf.js
// This new file extends the original protractor.conf.js
const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--no-sandbox']
  }
};

exports.config = config;
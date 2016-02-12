
exports.config = {
  allScriptsTimeout: 5000,

  specs: [
     './test.js',

  ],

  capabilities: {
    'browserName': 'chrome',
  },

  args: {
    directConnect: true

  },

  chromeOnly: false,

  baseUrl: 'http://localhost:8091/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 200000
  }
};

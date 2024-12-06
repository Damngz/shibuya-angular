module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      file: 'lcov.info'
    },
    browsers: ['ChromeHeadless'],
    singleRun: true
  });
};

// Karma configuration
// Generated on Wed Jan 27 2015 10:02:23 GMT+0530 (India Standard Time)

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        //        basePath: '../..../../../src',
        basePath: '../../src',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        

        // list of files / patterns to load in the browser
        files: [
          "js/lib.js",
          'js/angular-mocks.js',
          'js/templates.js',
          'config/config.js',
          'js/app.js',
          '../test/unit/spec.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'js/app.js': ['coverage']
        },

        coverageReporter: {
            // type : 'html',
            type: 'text-summary',
            dir: 'coverage/'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],
        
        // these are default values, just to show available options

        // web server port
        port: 8089,
        // cli runner port
        runnerPort: 9109,

        urlRoot: '/__test/',

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel:config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // polling interval in ms (ignored on OS that support inotify)
        autoWatchInterval: 0,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari
        // - PhantomJS
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

    });
};


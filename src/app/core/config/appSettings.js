angular.module('app.settings', []).constant('appsettings',
    {
        nisApiBaseUrl: 'http://localhost:1337/staging.inventory.automation.api.rackspacecloud.com/1.0',

        coreBaseUrl: 'https://core.rackspace.com/py/core',

        nisSecurityApiBaseUrl: 'http://www.mocky.io/v2',
        
        appBaseUrl: '/',
        logging_url: '',
        appContextPath: '',
        isLoggerEnabled: true,
        showHeader: true
    }
);
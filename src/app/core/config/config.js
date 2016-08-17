(function () {
    angular.module('app.core').config(['$urlRouterProvider', '$stateProvider',
        'routehelperConfigProvider', '$routeProvider', '$httpProvider', function ($urlRouterProvider, $stateProvider,
            routehelperConfigProvider, $routeProvider, $httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
            $httpProvider.interceptors.push('authTokenInterceptor');
            $urlRouterProvider.otherwise('/');

        }]).value('config', function () {
            var config = {
                restApiFrameworkName: ''
            };
            return config;
        });
})();
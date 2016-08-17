(function () {
    angular.module('app.global.service', []);
    angular.module('app.global.directive', []);
    angular.module('app.global.utility', []);

    angular.module('app.global', [
    'app.global.service',
    'app.global.directive',
    'app.global.utility',
    'app.settings'
    ]);
})();
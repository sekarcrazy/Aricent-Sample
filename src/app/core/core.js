(function () {
    angular.module('app.core', [
            'ngResource',
            'ui.router',
            'ngRoute',
            'ngCookies',
            'rx.exceptionHandlerModule',
            'ui.grid',
            'ui.grid.selection',
            'ui.grid.exporter',
            'ui.bootstrap',
            'ui.grid.cellNav',
            'ui.grid.expandable',
            'ui.grid.autoResize',
            'app.settings'
    ]);
})();
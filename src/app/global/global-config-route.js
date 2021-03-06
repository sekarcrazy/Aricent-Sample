﻿'use strict';
(function () {
    angular.module('app.global')
        .run(['routehelper', 'constant', function (routehelper, constant) {

            var error = {
                name: 'error',
                url: '/error',
                template: '<div>Error occured.</div>'
            };

            var states = [error];

            routehelper.configureStates(states);

            //while page loads, if no router url matches, the below router is being set.
            routehelper.configureRoutes([{ url: '/', redirectTo: constant.widgetModule.DEFAULT_ROUTER_URL }]);

            return;

        }]);
})();
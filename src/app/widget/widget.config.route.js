'use strict';
(function () {
    angular.module('app.widget')
        .run(['routehelper', 'constant', '$state',
            function (routehelper, constant) {

                var widgetList = {
                    name: constant.widgetModule.WIDGET_LIST_ROUTER_NAME,
                    url: constant.widgetModule.WIDGET_LIST_ROUTER_URL,
                    templateUrl: 'app/widget/templates/widget.list.tpl.html',
                    controller: 'widgetListCtrl',
                    controllerAs: 'widgetCtrl'                    
                };
            var widgetDetail = {
                name: constant.widgetModule.WIDGET_DETAILS_ROUTER_NAME,
                url: constant.widgetModule.WIDGET_DETAILS_ROUTER_URL,
                templateUrl: 'app/widget/templates/widget.details.tpl.html',
                controller: 'widgetDetailsCtrl',
                controllerAs: 'widget'
            };
            var widgetDetailWithList = {
                name: constant.widgetModule.WIDGET_DETAILS_WITH_LIST_ROUTER_NAME,
                url: constant.widgetModule.WIDGET_DETAILS_WITH_LIST_ROUTER_URL,
                templateUrl: 'app/widget/templates/widget.details.tpl.html',
                controller: 'widgetDetailsCtrl',
                controllerAs: 'widget',
                parent: widgetList
            }
             var createWidget = {
                name: constant.widgetModule.WIDGET_CREATE_ROUTER_NAME,
                url: constant.widgetModule.WIDGET_CREATE_ROUTER_URL,
                templateUrl: 'app/widget/templates/widget.edit.tpl.html',
                controller: 'widgetDetailsCtrl',
                controllerAs: 'widget'
            };
            var states = [widgetList, widgetDetail, widgetDetailWithList, createWidget];

            routehelper.configureStates(states);
            return;

        }]);
})();
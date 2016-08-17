(function () {
    angular.module('app.layout.controller', [])
        .controller('shellCtrl', ['$scope', '$location',
            '$rootScope', 'constant', 'rx.exceptionHandler', 'logger',
            'appsettings','routehelper',
            function ($scope, $location, $rootScope, constant, exceptionHandler,
                logger, appSettings, routehelper) {
                var vm =this, log = logger.getInstance('Shell Control');
                log.log('Initializing shell control');
                                
                vm.inventoryUrl = constant.widgetModule.WIDGET_LIST_ROUTER_URL;

                vm.getCurrentRouterState = function () {
                    var value = routehelper.getCurrentState();
                    return value;
                }
                vm.showHeader = appSettings.showHeader;
                vm.windowSize = function () {
                    return {
                        width: angular.element(body).width(), height: angular.element(body).height() - 50
                    }                    
                };

               (function retrieveDCs() {
                    
                })();


                //throw new exceptionHandler.WarningError('Unhandled exception');
                //$rootScope.$broadcast(constant.publisherEventPayLoad.SHOW_NOTIFY_COMMAND, new exceptionHandler.SuccessAlert('success '));
                //$rootScope.$broadcast(constant.publisherEventPayLoad.SHOW_NOTIFY_COMMAND, new exceptionHandler.SuccessAlert('dfsdfsd  sdf sdf sdf sdf sd '));
                return;
            }]);
})();
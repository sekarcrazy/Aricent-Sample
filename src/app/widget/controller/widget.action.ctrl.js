(function () {
    angular.module('app.widget.controller')
        .controller('widgetActionCtrl', ['constant', 'modalService',
    'routehelper', 'rx.exceptionHandler', '$timeout', '$rootScope','$modalInstance','modalParam',
    function (constant, modalService,
        routehelper, exceptionHandler, $timeout, $rootScope, $modalInstance, modalParam) {
        var self = this;
        self.buttons = [{ label: 'Yes', result: 'yes', cssClass: 'savebutton' }, { label: 'No', result: 'no' }];

        self.onButtonClick = function (result) {
            self.invokeWidgetAction(result);
        };
        self.close = function () {
            $modalInstance.dismiss();
        };
        self.invokeWidgetAction = function (confirmResponse) {
            if (confirmResponse === "yes") {
                 $modalInstance.close({ eventName: 'removeWidget', modalParam: modalParam, responseSuccess: true });
            }
            else {
                self.close();
            }
        };
    }]);
})();
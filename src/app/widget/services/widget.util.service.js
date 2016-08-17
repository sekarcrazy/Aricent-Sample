(function () {
    angular.module('app.widget.service')
        .factory('widgetUtil', ['constant','modalService',
    function (constant, modalService) {

        var utility = {           

            showWidgetActionModal: function (entity) {

                var modalInstance = modalService.showModal({
                    templateUrl: 'app/widget/templates/widget.action.model.window.tpl.html',
                    controller: 'widgetActionCtrl',
                    controllerAs: 'widgetActionVM',
                    windowClass: 'action-modal',
                    resolve: { modalParam: function () { return { entity: entity } } }
                });

                return modalInstance;
            }
        };

        return utility;

    }]);
})();
(function () {
    angular.module('app.widget.controller')
.controller('widgetListCtrl', ['$scope', '$filter', 'constant', 'widgetService', 'modalService',
    'routehelper', 'uiGridConstants', 'rx.exceptionHandler', '$timeout', '$rootScope','widgetUtil',
    function ($scope, $filter, constant, widgetService, modalService,
        routehelper, uiGridConstants, exceptionHandler, $timeout, $rootScope, widgetUtil) {

       var vm = this, detachWatch;
       vm.noRecordsMsg = constant.widgetModule.NO_RECORDS_FOUND;
        var toggleWidgetDetailPane = function () {
                vm.isWidgetDetailActive = (function () {
                    var currentState = routehelper.getCurrentState();
                    if (currentState && currentState.name && currentState.name == constant.widgetModule.WIDGET_DETAILS_WITH_LIST_ROUTER_NAME) {
                        return true;
                    }
                    return false;
                })();
            };

            vm.showFilter = false;            
            vm.gridOptions = {     
                    enableColumnMenus: false,
                    enableSorting: true,
                    enableRowHeaderSelection: false,
                    enableGridMenu: false,
                    rowHeight: 40,
                    enableRowSelection: true,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    noUnselect: true,
                    enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
                    onRegisterApi: function (gridApi) {
                        vm.gridApi = gridApi;                                  
                    },
                    rowTemplate: "<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",        
                    appScopeProvider: vm,
                    columnDefs: [
                            { field: 'id', allowCellFocus: false, width: '100', displayName: 'ID'},
                            { field: 'name', allowCellFocus: false, displayName: 'NAME',
                        cellTemplate:"<div class=\"ui-grid-cell-contents\" style=\"text-overflow:ellipsis;overflow:hidden;\" title=\"{{name}}\"><span>{{row.entity.name}}</span><button class='btn padding-muted pull-right' style='margin-left:5px;' ng-click='grid.appScope.showWidgetActionModal(row,$event)'>Remove</button><button class='btn padding-muted pull-right' ng-click='grid.appScope.openDetailsModal(row,$event)'>Details</button></div>"}
                    ]
            };            

            //Init
            vm.init = function () {
                initializeStateChangeWatch();
                widgetService.getWidgetList().then(function (response) {
                    if (response) {
                       vm.gridOptions.data = response;
                    }
                    else {
                        throw new exceptionHandler.CustomError(constant.common.BAD_RESPONSE_FORMAT);
                    }
                }, function (error) {
                });
            };
          
            vm.openDetailsModal = function (row, $event) {
                var entity = row.entity;                
                $event && $event.stopPropagation();
                routehelper.goToState(constant.widgetModule.WIDGET_DETAILS_WITH_LIST_ROUTER_NAME, { widget_id: entity.id});
            };           
            vm.addWidget = function(){
                routehelper.goToState(constant.widgetModule.WIDGET_CREATE_ROUTER_NAME, { widget_id: 0});
            }
            vm.showWidgetActionModal = function (row) {
                var modalInstance = widgetUtil.showWidgetActionModal(row.entity);
                modalInstance.then(vm.onModalClose);
            };

            vm.onModalClose = function(params){
                if(params.modalParam.entity.id)
                {
                    widgetService.removeWidget(params.modalParam.entity.id);
                    var widget_id = routehelper.getStateParams('widget_id'),currentState = routehelper.getCurrentState();
                    if(currentState && currentState.name === constant.widgetModule.WIDGET_DETAILS_WITH_LIST_ROUTER_NAME && widget_id === params.modalParam.entity.id.toString())
                    {
                        routehelper.goToState(constant.widgetModule.WIDGET_LIST_ROUTER_NAME);
                    }else{
                        vm.init();
                    }
                }
            }
            vm.updateGridLayout = function (newGridSize) {
                    if (vm.gridApi && vm.gridApi.grid && vm.gridApi.grid.refresh && newGridSize) {                       
                        if (newGridSize.width) { vm.gridApi.grid.gridWidth = newGridSize.width; }
                        if (newGridSize.height) { vm.gridApi.grid.gridHeight = newGridSize.height; }
                        if (newGridSize.width || newGridSize.height) {
                            vm.gridApi.grid.refresh();
                        }
                    }
                };
         

            var initializeStateChangeWatch = function () {
                clearWatches();
                 detachWatch = $scope.$watch(angular.bind(routehelper.getCurrentState(), function () {
                            return routehelper.getCurrentState();
                        }), function (newVal, oldVal) {
                            toggleWidgetDetailPane();
                            if (!vm.isWidgetDetailActive) {
                                vm.updateGridLayout($scope.getGridContainerSize());
                            }
                        }, true);
            };
            var clearWatches = function()
            {
                if(detachWatch)
                {
                    detachWatch();
                }
            }
            $scope.$on('$destroy', function(){
                clearWatches();
            })
            vm.init();

    }]);
})();
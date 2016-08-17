(function () {
    angular.module('app.widget.controller')
        .controller('widgetDetailsCtrl', ['$scope', 'constant', 'routehelper','widgetService','rx.exceptionHandler',
            function ($scope, constant, routehelper, widgetService, exceptionHandler) {

                var vm = this;                
                vm.keys =[{name:'Key1', value:''}, {name:'Key2', value:''},{name:'Key3', value:''},{name:'Key4', value:''},{name:'Key5', value:''}];

                //Init - onload
                var init = function () {
                    
                    var widget_id = routehelper.getStateParams('widget_id');
                    vm.originalWidgetItem = widgetService.getWidgetById(widget_id);
                    if(routehelper.getCurrentState().name == constant.widgetModule.WIDGET_CREATE_ROUTER_NAME){
                        var clonedOrignalWidgetItem = angular.copy(vm.originalWidgetItem || {});
                        vm.activeWidget = widgetService.getNewWidgetItem(clonedOrignalWidgetItem.name, clonedOrignalWidgetItem.value);
                        if(vm.originalWidgetItem){ 
                            vm.keys = [];                       
                            for(var key in clonedOrignalWidgetItem)
                            {
                                if(key != 'name' && key != 'value' && clonedOrignalWidgetItem.hasOwnProperty(key)){
                                    vm.keys.push({name:key, value:clonedOrignalWidgetItem[key]});
                                }
                            }
                        }
                    }
                };

                vm.toggleDetailPane = function () {
                    routehelper.goToState(constant.widgetModule.WIDGET_LIST_ROUTER_NAME);
                }

                $scope.$on(constant.publisherEventPayLoad.REFRESH_WIDGET_DETAIL, function (event, exception) {
                    init();
                });

                vm.editWidget = function()
                {
                    routehelper.goToState(constant.widgetModule.WIDGET_CREATE_ROUTER_NAME, { widget_id: routehelper.getStateParams('widget_id') || 0});
                }
                //ToDo: need to move this functionality to service to make controller light weight
                vm.onKeyNameChange = function(form)
                {
                    var lookUpKeys = {name:'', value:''};
                    angular.forEach(vm.keys, function(param,key){
                        if(lookUpKeys.hasOwnProperty(param.name))
                        {
                            var existkey = lookUpKeys[param.name];
                            existkey && (form[existkey].$error.uniqueKey || form[existkey].$setValidity('uniqueKey', false));
                            form['key' + key].$setValidity('uniqueKey', false);
                            //throw new exceptionHandler.CustomError(constant.widgetModuleError.DUPLICATE_KEY);
                            
                        }else{
                            lookUpKeys[param.name] = 'key' + key;
                            form['key' + key].$setValidity('uniqueKey', true);
                        }
                    })
                }

                vm.addNewKey = function(){
                    vm.keys.push({name:'', value:''});
                }

                vm.updateDynamicKeysInWidget = function(targetWidget){
                    targetWidget = targetWidget || {};
                   angular.forEach(vm.keys, function(param,key){
                        targetWidget[param.name] = param.value;
                    });
                    return targetWidget;
                }

                vm.saveWidget = function(){
                    vm.updateDynamicKeysInWidget(vm.activeWidget);
                    var lookUpWidget = {name:vm.activeWidget.name}
                    if(vm.originalWidgetItem)
                    {
                        lookUpWidget.id = vm.originalWidgetItem.id;
                    }
                    if(widgetService.isDirty(lookUpWidget)){                   
                        throw new exceptionHandler.CustomError('Widget name should be unique');
                    }else if(JSON.stringify(angular.copy(vm.originalWidgetItem || {})) !== JSON.stringify(angular.copy(vm.activeWidget))){
                        //id will be created newly for an existing instance
                        widgetService.updateWidgetList(vm.activeWidget, vm.originalWidgetItem);
                        //If you want to reuse same widget instance, need to add logic to remove keys from original widget items and
                        // update new keys with same instance. 
                        //clean originalWidgetItem by having Id alone.
                        //angular.extend(originalWidgetItem, vm.activeWidget);
                        routehelper.goToState(constant.widgetModule.WIDGET_DETAILS_ROUTER_NAME, { widget_id: vm.activeWidget.id});
                    }
                }

                init();
            }]);
})();
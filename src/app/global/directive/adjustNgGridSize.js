(function () {
    //This will work when parent should occupy maximum avaialble height. so you should make sure your template.
    var adjustnggridSize = function ($timeout, $window, $parse) {
        return function (scope, element, attrs) {

            var _nggrid_holder = $(attrs.adjustnggridSize),highResolution=767,
                getUpdateLayoutCallback = $parse(attrs.updateLayoutCallback);
            var setParentSizeTongGrid = function (newValue) {
                if (getUpdateLayoutCallback) {
                    var updateLayoutCB = getUpdateLayoutCallback(scope);
                    if (updateLayoutCB) {                        
                        updateLayoutCB(newValue);
                    }
                }
            }
            var getApproxWidth = function (_nggrid_holder) {
                try{
                    var approxWidth = -20;
                    //as ui grid is not performing responsive design, need to provide the below values.
                    if ($window.innerWidth > highResolution) {
                        approxWidth += _nggrid_holder.offset().left;
                    }
                    return approxWidth;
                } catch (e) { }
            };

            //var w = angular.element($window);
            scope.getGridContainerSize = function () {
                _nggrid_holder = $(attrs.adjustnggridSize);
                return {
                    //'height': _nggrid_holder.outerHeight() - (_nggrid_holder.offset().top),// As it is iterating multiple times, we commented.
                    'width': _nggrid_holder.outerWidth() - (_nggrid_holder.offset().left) + getApproxWidth(_nggrid_holder)
                };
            };
            var detach = scope.$watch(scope.getGridContainerSize, function (newValue, oldValue) {
                setParentSizeTongGrid(newValue);
            }, true);           

            scope.$on("$destroy", function () {
                if (detach) { detach(); }
            });
        };
    };

    angular.module('app.global.directive').directive('adjustnggridSize', ['$timeout', '$window', '$parse', adjustnggridSize]);



    angular.module('app.global.directive').directive('triggerNgGridHeightChange', ['$timeout', '$window', '$parse', function ($timeout, $window, $parse) {
        return function (scope, element, attrs) {
            var filterSize = function () {
                return { height: element[0].clientHeight - 130, width: element.width() };
            }

            var updateNgGridHeight = function (newValue) {
                if (newValue && newValue.height) {
                    //var getUpdateLayoutCallback = $parse(attrs.updateLayoutCallback);
                    var grid = $("[ui-grid*='.gridOptions']");
                    if (grid && grid.is(':visible') && element.is(':visible')) {
                        grid.height(Math.max((newValue.height), 400));
                        var updateLayoutCB = $parse(grid.attr('update-layout-callback'))(scope);
                        if (updateLayoutCB) {
                            updateLayoutCB({ height: Math.max((newValue.height), 400) });
                        }
                    }

                }
            };

            var detach = scope.$watch(filterSize, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    updateNgGridHeight(newValue);
                }
            }, true);

            scope.getEle_HeightOfAttached_triggerNgGridHeight_Attr = function () {
                return filterSize();
            };

            scope.triggerNgGridHeightChangeForcefully = function () {
                updateNgGridHeight(filterSize());
            };

            scope.$on("$destroy", function () {
                if (detach) { detach(); }
            });
        }

    }]);

})();
describe('app.core routeHelperProvider', function () {
    var routeHelperProvider,
        fakeState = [{ name: 'fake', url: 'fake', template: '<div></div>' }],
        $location, $rootScope;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('ui.router'));

    beforeEach(function () {
        angular.mock.module('app.core', function ($provide, _routehelperProvider_) {
            routeHelperProvider = _routehelperProvider_;
        });

        angular.mock.inject(function ($injector) {
            var routehelper = $injector.get('routehelper');
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            routehelper.configureStates(fakeState);
        });
    });

    it('should be defined', inject(function ($exceptionHandler) {
        expect(routeHelperProvider).toBeDefined();
    }));

    it('should be defined all the function', inject(function (routehelper) {
        expect(routehelper.configureRoutes).toBeDefined();
        expect(routehelper.getRoutesList).toBeDefined();
        expect(routehelper.getStatesList).toBeDefined();
        expect(routehelper.configureStates).toBeDefined();
        expect(routehelper.getStateParams).toBeDefined();
        expect(routehelper.goToState).toBeDefined();
        expect(routehelper.getCurrentState).toBeDefined();
    }));

    it('should be configured states', inject(function (routehelper) {
        var states = routehelper.getStatesList();
        expect(states[states.length - 1].name).toEqual('fake');
    }));

    it('should be get state param', inject(function (routehelper, constant) {
        $location.path(constant.deviceMaintenanceModule.DEVICE_DETAILS_ROUTER_URL + "/1111");
        $rootScope.$apply();
        var param = routehelper.getStateParams('device_id');
        expect(param).toEqual('1111');
    }));

    it('should be happened state transition', inject(function (routehelper, constant) {
        //$location.path(constant.deviceMaintenanceModule.DEVICE_DETAILS_ROUTER_URL + "/1111");
        routehelper.goToState(constant.deviceMaintenanceModule.DEVICE_DETAILS_WITH_LIST_ROUTER_NAME, { device_id: 2222 });
        $rootScope.$apply();
        var param = routehelper.getStateParams('device_id');
        expect(param).toEqual('2222');
    }));

    it('should be currentState available after state changed', inject(function (routehelper, constant) {
        //$location.path(constant.deviceMaintenanceModule.DEVICE_DETAILS_ROUTER_URL + "/1111");
        routehelper.goToState(constant.deviceMaintenanceModule.DEVICE_DETAILS_WITH_LIST_ROUTER_NAME, { device_id: 2222 });
        $rootScope.$apply();
        var stateName = routehelper.getCurrentState().name;
        expect(stateName).toEqual(constant.deviceMaintenanceModule.DEVICE_DETAILS_WITH_LIST_ROUTER_NAME);
    }));

});
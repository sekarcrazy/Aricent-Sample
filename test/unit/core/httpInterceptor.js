describe('app.core', function () {
    var $location, $rootScope, _$httpProvider, _httpInterceptor, mocknisMaintenanceApiResource,
        $httpBackend, baseUrl, apiControllerName = "ui";

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('app.global'));
    beforeEach(angular.mock.module('app.deviceMaintenance.service'));
    beforeEach(angular.mock.module('rx.exceptionHandlerModule'));

    beforeEach(function () {

        var fakeWindow = {
            location: {
                href: ''
            }
        };

        angular.mock.module('app.core', function ($httpProvider, $provide) {
            _$httpProvider = $httpProvider;
            $provide.value('$window', fakeWindow);
        });

        angular.mock.inject(function ($injector) {
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            _httpInterceptor = $injector.get('httpInterceptor');
            $httpBackend = $injector.get('$httpBackend');
            mocknisMaintenanceApiResource = $injector.get('nisMaintenanceApi');
            baseUrl = $injector.get('appsettings').nisApiBaseUrl + "/" + apiControllerName;
        });
    });



    describe('httpinterceptor', function () {

        it('should be defined', function () {
            expect(_httpInterceptor).toBeDefined();
        });

        it('should have the httpInterceptor as an interceptor', function () {
            expect(_$httpProvider.interceptors).toContain('httpInterceptor');
        });

        it('should properly subscribe request', function () {
            $httpBackend.expectGET(baseUrl + '/config').respond({ data: { filter: [] } });

            this.requestSub = function () {
            };
            spyOn(this, 'requestSub');
            _httpInterceptor.requestSubscribe(this.requestSub);
            var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
            $httpBackend.flush();
            expect(this.requestSub).toHaveBeenCalled();
        });

        it('should properly subscribe response', function () {
            $httpBackend.expectGET(baseUrl + '/config').respond({ data: { filter: [] } });

            this.responseSub = function () {
            };
            spyOn(this, 'responseSub');
            _httpInterceptor.responseSubscribe(this.responseSub);
            var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
            $httpBackend.flush();
            expect(this.responseSub).toHaveBeenCalled();
        });

        it('should throw an error by having error attibute in response', function () {
            var errorResponse = { data: { error: 'fake thrown error' } };
            $httpBackend.expectGET(baseUrl + '/config').respond(errorResponse);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
            } catch (ex) {
                expect(ex.message).toContain(errorResponse.data.error);
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
                expect(ex.serverResponse).toBeDefined();
                expect(ex.serverResponse).toEqual(errorResponse);
            }
        });

        it('should throw an error by having responseStatus attibute in response', function () {
            var errorResponse = { data: { msg: 'fake thrown error' }, responseStatus: 'FAILED' };
            $httpBackend.expectGET(baseUrl + '/config').respond(errorResponse);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
            } catch (ex) {
                expect(ex.message).toContain(errorResponse.data.msg);
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
                expect(ex.serverResponse).toBeDefined();
                expect(ex.serverResponse).toEqual(errorResponse);
            }
        });

        it('should throw an error by having responseStatus attibute in response', function () {
            var errorResponse = { data: {}, responseStatus: 'FAILED' };
            $httpBackend.expectGET(baseUrl + '/config').respond(errorResponse);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
            } catch (ex) {
                expect(ex.message).toContain('Error occured in service invocation.');
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
                expect(ex.serverResponse).toBeDefined();
                expect(ex.serverResponse).toEqual(errorResponse);
            }
        });

        it('should throw an error by having 404 status', function () {
            $httpBackend.expectGET(baseUrl + '/config').respond(404);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
            } catch (ex) {
                expect(ex.message).toContain('Service unavailable. Please contact administrator.');
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
            }
        });

        it('should throw an error by having 401 status', function () {
            $httpBackend.expectGET(baseUrl + '/config').respond(401);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
            } catch (ex) {
                expect(ex.message).toContain('Unauthorized. Request denied');
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
            }
        });

        it('should throw an error by having 0 status', inject(function (constant, $window) {
            $httpBackend.expectGET(baseUrl + '/config').respond(0);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
                expect($window.location.href).toEqual(constant.common.LOGGIN_REDIRECT_PATH + $window.location.pathname + $window.location.hash);
            } catch (ex) {
                expect(ex.message).toContain('Service unavailable. Please contact administrator.');
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
            }
        }));

        it('should throw an error for unhandled status', function () {
            $httpBackend.expectGET(baseUrl + '/config').respond(421);
            try {
                var result = mocknisMaintenanceApiResource.retrieveFilterConfig();
                $httpBackend.flush();
            } catch (ex) {
                expect(ex.message).toContain('Error occured in service invocation.');
                expect(ex.type).toBeDefined();
                expect(ex.type).toEqual('ERROR');
            }
        });

    });

});
describe('exception-directive', function () {
    var exceptionService, $rootScope, exceptionHandler, scope, element, mocks = {
        errorMessage: 'fake error'
    }, directiveCtrler, isolateScope;   

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('rx.exceptionHandlerModule'));
    beforeEach(angular.mock.module('rx.exception.directive'));

    beforeEach(function () {
        angular.mock.inject(function ($injector, $compile) {
            $rootScope = $injector.get('$rootScope');

            exceptionService = $injector.get('exceptionService');
            exceptionService.addNotification(mocks.errorMessage);

            scope = $rootScope.$new();
            element = $compile('<div class="notification-holder" rx-exception-block></div>')(scope);
        });
    });

    describe('rxExceptionBlock', function () {
        beforeEach(function () {
            angular.mock.inject(function ($injector) {
                scope.$digest();
                directiveCtrler = element.controller();
                isolateScope = element.isolateScope() || element.scope();
            });
        });

        it('should be shown error message', inject(function ($exceptionHandler) {
            expect(element.find('em').text()).toEqual(mocks.errorMessage);
        }));

        it('should be defined errors', inject(function () {
            expect(isolateScope.errors).toBeDefined();
            expect(isolateScope.errors.length).toEqual(1);
        }));

        it('should be cleared errors by calling delete', inject(function () {
            expect(isolateScope.deleteError).toBeDefined();
            isolateScope.deleteError();
            expect(isolateScope.errors.length).toEqual(0);
        }));

        it('should be called timer by adding new error to service', inject(function () {
            spyOn(isolateScope, "onErrorAdded");
            spyOn(isolateScope, "configureTimer");
            exceptionService.addNotification("Test" + mocks.errorMessage);
            isolateScope.$digest();
            expect(isolateScope.onErrorAdded).toHaveBeenCalled();
        }));
    });

});
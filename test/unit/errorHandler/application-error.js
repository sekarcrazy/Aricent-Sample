describe('application-error', function () {
    var baseUrl = '', $exceptionHandler, $rootScope, rxExceptionService, mocks = {
            errorMessage: 'fake error'
        }, exceptionHandlerProvider;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('rx.exceptionHandlerModule'));
    beforeEach(angular.mock.module('rx.exception.directive'));

    function functionThatWillThrow(param) {
        if (param)
            throw new Error(mocks.errorMessage);
        else {
            return;
        }
        return;
    }

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
            $exceptionHandler = $injector.get('$exceptionHandler');
        });
    });

    describe('rx.$exceptionHandler', function () {
        it('should have a dummy test', inject(function () {
            expect(true).toEqual(true);
        }));

        it('should be defined', inject(function ($exceptionHandler) {
            expect($exceptionHandler).toBeDefined();
        }));

        it('manual error pushed to exception service', inject(function ($injector) {
            var es = $injector.get('exceptionService');
            spyOn(es, "addNotification");
            expect(es).toBeDefined();
            try {
                $rootScope.$apply(functionThatWillThrow);
                expect(es.addNotification).toHaveBeenCalled();
            }
            catch (ex) {
                expect(ex.message).toEqual(mocks.errorMessage);
            }
        }));

        it('manual error is handled by decorator', inject(function ($injector) {
            try {
                $rootScope.$apply(functionThatWillThrow);
            }
            catch (ex) {
                expect(ex.message).toEqual(mocks.errorMessage);
            }
        }));

        it('error pushed to notification by decorator', inject(function ($injector) {
            var es = $injector.get('exceptionService');
            try {
                $rootScope.$apply(functionThatWillThrow);
            }
            catch (ex) {
                expect(es.errors().length).toBe(1);
                expect(ex.message).toEqual(mocks.errorMessage);
            }
        }));

    });

});
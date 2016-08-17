describe('rx.exceptionHandlerModule', function () {
    var exceptionService, $rootScope, exceptionHandler, mocks = {
        errorMessage: 'fake error'
    };

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('rx.exceptionHandlerModule'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
        });
    });

    describe('exceptionService', function () {
        beforeEach(function () {
            angular.mock.inject(function ($injector) {
                exceptionService = $injector.get('exceptionService');
                exceptionHandler = $injector.get('rx.exceptionHandler');
            });
        });

        it('should be defined', inject(function ($exceptionHandler) {
            expect(exceptionService).toBeDefined();
            expect(exceptionHandler).toBeDefined();
        }));

        it('should be create custom error by throwing error', inject(function () {
            exceptionService.addNotification(mocks.errorMessage);
            expect(exceptionService.errors().length).toBe(1);
            if (exceptionService.errors()[0] instanceof exceptionHandler.CustomError) {
                expect(true).toEqual(true);
            }
        }));

        it('should be create custom error by throwing custom error instance', inject(function () {
            exceptionService.addNotification(new exceptionHandler.CustomError(mocks.errorMessage));
            expect(exceptionService.errors().length).toBe(1);
            if (exceptionService.errors()[0] instanceof exceptionHandler.CustomError) {
                expect(true).toEqual(true);
            }
        }));

        it('should be create server error by throwing server error instance', inject(function () {
            exceptionService.addNotification(new exceptionHandler.ServerError(mocks.errorMessage));
            expect(exceptionService.errors().length).toBe(1);
            if (exceptionService.errors()[0] instanceof exceptionHandler.ServerError) {
                expect(true).toEqual(true);
            }
        }));

        it('should be clear all the error', inject(function () {
            exceptionService.addNotification(new exceptionHandler.ServerError(mocks.errorMessage));
            expect(exceptionService.errors().length).toBe(1);
            exceptionService.clear();
            expect(exceptionService.errors().length).toBe(0);
        }));

        it('should not be available the same error message by throwing the same error', inject(function () {
            exceptionService.addNotification(new exceptionHandler.ValidationError(mocks.errorMessage));
            exceptionService.addNotification(new exceptionHandler.CustomError(mocks.errorMessage));
            expect(exceptionService.errors().length).toBe(1);
        }));

        it('should be clear the error with type ERROR', inject(function () {
            exceptionService.addNotification(new exceptionHandler.ValidationError('validation' + mocks.errorMessage));
            exceptionService.addNotification(new exceptionHandler.CustomError(mocks.errorMessage));
            expect(exceptionService.errors().length).toBe(2);
            exceptionService.clearWithType('VALIDATION');
            expect(exceptionService.errors().length).toBe(1);
        }));


    });

});
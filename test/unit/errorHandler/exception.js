describe('exception factory', function () {
    var exceptionClass, $rootScope;

    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.module('rx.exceptionHandlerModule'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $rootScope = $injector.get('$rootScope');
        });
    });

    describe('rx.exceptionHandler', function () {
        beforeEach(function () {
            angular.mock.inject(function ($injector) {
                exceptionClass = $injector.get('rx.exceptionHandler');
            });
        });
        it('should be defined', inject(function ($exceptionHandler) {
            expect(exceptionClass).toBeDefined();
        }));

        it('should be defined custom error', inject(function () {
            expect(exceptionClass.CustomError).toBeDefined();
        }));

        it('should be created custom error', inject(function () {
            var custom = new exceptionClass.CustomError("sdsd");
            expect(custom).toBeDefined();
        }));

        it('should be created custom error type', inject(function () {
            var custom = new exceptionClass.CustomError("fake error");
            expect(custom.type).toBeDefined();
            expect(custom.type).toBeDefined('ERROR');
        }));

        it('should be defined server error', inject(function () {
            expect(exceptionClass.ServerError).toBeDefined();
        }));

        it('should be created server error', inject(function () {
            var serverError = new exceptionClass.ServerError("Fake error", { serverresponse: 'Unauthorized' }, 401);
            expect(serverError).toBeDefined();
            expect(serverError.serverResponse).toBeDefined();
            expect(serverError.errorCode).toBeDefined();
            expect(serverError.errorCode).toBe(401);
        }));

        it('should be created server error type', inject(function () {
            var custom = new exceptionClass.CustomError("sdsd");
            expect(custom.type).toBeDefined();
            expect(custom.type).toBeDefined('ERROR');
        }));

        it('should be defined validation error', inject(function () {
            expect(exceptionClass.ValidationError).toBeDefined();
        }));

        it('should be created validation error', inject(function () {
            var validationError = new exceptionClass.ValidationError("Fake error", 401);
            expect(validationError).toBeDefined();
        }));

        it('should be defined warning error', inject(function () {
            expect(exceptionClass.WarningError).toBeDefined();
        }));

        it('should be created validation error', inject(function () {
            var warningError = new exceptionClass.WarningError("Fake error", 401);
            expect(warningError).toBeDefined();
        }));

    });

});
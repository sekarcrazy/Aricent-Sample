describe('app.core', function () {
    var constantProvider;
    beforeEach(angular.mock.module('app'));

    beforeEach(function () {
        angular.mock.module('app.core', function ($provide, _constantProvider_) {
            constantProvider = _constantProvider_;
            constantProvider.configureConstant({ test: 'fake constant' });
        });
    });

    describe('constantHelper', function () {

        it('should be defined', inject(function ($exceptionHandler) {
            expect(constantProvider).toBeDefined();
        }));

        it('should be defined configureConstant', inject(function ($exceptionHandler) {
            expect(constantProvider.configureConstant).toBeDefined();
        }));

        it('should be defined configureConstant', inject(function (constant) {
            expect(constant.test).toBeDefined();
        }));

        it('should be defined configureConstant', inject(function (constant) {
            expect(constant.test).toEqual('fake constant');
        }));

    });

});
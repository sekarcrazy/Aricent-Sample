(function () {
    angular.module("app.global").config(['constantProvider', function (constantProvider) {

        var constant = {}, appBaseUrl ='/';

        constant.common = {
            DATE_FORMAT: 'date:\'MM/dd/yyyy HH:mm:ss\'',
            CONFIRMATION: 'Confirmation', //dialog header
            BAD_RESPONSE_FORMAT: 'Response format is wrong.',
            BAD_REQUEST_FORMAT: 'Request format is wrong.',
            RESPONSE_SUCCESS: 'SUCCESS',
            RESPONSE_FAILED: 'FAILED',
            FILTER_TITLE: 'Filter',
            UNDEFINED: 'Object is undefined',
            LOGGIN_REDIRECT_PATH: '/identity/?ref='
        };

        constant.widgetModule = {            
            //Router config
            WIDGET_LIST_ROUTER_NAME: 'widget-list',
            WIDGET_LIST_ROUTER_URL: appBaseUrl + 'widgets',
            WIDGET_DETAILS_ROUTER_NAME: 'widget-details',
            WIDGET_DETAILS_ROUTER_URL: appBaseUrl + 'widgetDetail' + '/:widget_id/' + 'view',
            WIDGET_DETAILS_WITH_LIST_ROUTER_NAME: 'widget-details-with-list',
            WIDGET_DETAILS_WITH_LIST_ROUTER_URL: appBaseUrl + ':widget_id/' + 'view',
            WIDGET_CREATE_ROUTER_NAME:'widget-edit',
            WIDGET_CREATE_ROUTER_URL: appBaseUrl + 'widget/edit/:widget_id',

            //while page loads, if no router url matches, the below router is being set.
            DEFAULT_ROUTER_URL: appBaseUrl + 'widgets',

            PAGE_TITLE: 'Widget',
            NO_RECORDS_FOUND:'No widgets are found. Please start adding widgets by clicking Add button to see nice UI.'
        };

        constant.publisherEventPayLoad = {
            SHOW_NOTIFY_COMMAND: 'notificationStart'
        };

        constantProvider.configureConstant(constant);
    }]);
})();
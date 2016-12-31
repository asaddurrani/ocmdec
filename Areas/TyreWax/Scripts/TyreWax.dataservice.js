/*
    Data service module with ajax calls to the server
*/
define("tyreWax/tyreWax.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getTyreWaxs', 'ajax', {
                        url: '/Api/TyreWax',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveTyreWax', 'ajax', {
                        url: '/Api/TyreWax',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveTyreWax = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveTyreWax',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getTyreWaxs = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getTyreWaxs',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getTyreWaxs: getTyreWaxs,
            saveTyreWax: saveTyreWax
        };
    })();

    return dataService;
});
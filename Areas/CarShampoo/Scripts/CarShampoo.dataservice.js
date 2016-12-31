/*
    Data service module with ajax calls to the server
*/
define("carShampoo/carShampoo.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getCarShampoos', 'ajax', {
                        url: '/Api/CarShampoo',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveCarShampoo', 'ajax', {
                        url: '/Api/CarShampoo',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveCarShampoo = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveCarShampoo',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getCarShampoos = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getCarShampoos',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getCarShampoos: getCarShampoos,
            saveCarShampoo: saveCarShampoo
        };
    })();

    return dataService;
});
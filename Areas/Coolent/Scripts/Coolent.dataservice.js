/*
    Data service module with ajax calls to the server
*/
define("coolent/coolent.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getCoolents', 'ajax', {
                        url: '/Api/Coolent',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveCoolent', 'ajax', {
                        url: '/Api/Coolent',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveCoolent = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveCoolent',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getCoolents = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getCoolents',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getCoolents: getCoolents,
            saveCoolent: saveCoolent
        };
    })();

    return dataService;
});
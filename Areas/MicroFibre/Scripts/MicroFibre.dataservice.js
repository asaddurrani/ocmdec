/*
    Data service module with ajax calls to the server
*/
define("microFibre/microFibre.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getMicroFibres', 'ajax', {
                        url: '/Api/MicroFibre',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveMicroFibre', 'ajax', {
                        url: '/Api/MicroFibre',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveMicroFibre = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveMicroFibre',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getMicroFibres = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getMicroFibres',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getMicroFibres: getMicroFibres,
            saveMicroFibre: saveMicroFibre
        };
    })();

    return dataService;
});
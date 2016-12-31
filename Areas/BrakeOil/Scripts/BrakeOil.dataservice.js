/*
    Data service module with ajax calls to the server
*/
define("brakeOil/brakeOil.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getBrakeOils', 'ajax', {
                        url: '/Api/BrakeOil',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveBrakeOil', 'ajax', {
                        url: '/Api/BrakeOil',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveBrakeOil = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveBrakeOil',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getBrakeOils = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getBrakeOils',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getBrakeOils: getBrakeOils,
            saveBrakeOil: saveBrakeOil
        };
    })();

    return dataService;
});
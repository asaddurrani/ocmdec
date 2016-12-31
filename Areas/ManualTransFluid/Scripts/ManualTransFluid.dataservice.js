/*
    Data service module with ajax calls to the server
*/
define("manualTransFluid/manualTransFluid.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getManualTransFluids', 'ajax', {
                        url: '/Api/ManualTransFluid',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveManualTransFluid', 'ajax', {
                        url: '/Api/ManualTransFluid',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveManualTransFluid = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveManualTransFluid',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getManualTransFluids = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getManualTransFluids',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getManualTransFluids: getManualTransFluids,
            saveManualTransFluid: saveManualTransFluid
        };
    })();

    return dataService;
});
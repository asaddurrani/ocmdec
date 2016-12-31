/*
    Data service module with ajax calls to the server
*/
define("engineSpray/engineSpray.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getEngineSprays', 'ajax', {
                        url: '/Api/EngineSpray',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveEngineSpray', 'ajax', {
                        url: '/Api/EngineSpray',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveEngineSpray = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveEngineSpray',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getEngineSprays = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getEngineSprays',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getEngineSprays: getEngineSprays,
            saveEngineSpray: saveEngineSpray
        };
    })();

    return dataService;
});
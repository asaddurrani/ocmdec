/*
    Data service module with ajax calls to the server
*/
define("internalSpray/internalSpray.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getInternalSprays', 'ajax', {
                        url: '/Api/InternalSpray',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveInternalSpray', 'ajax', {
                        url: '/Api/InternalSpray',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveInternalSpray = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveInternalSpray',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getInternalSprays = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getInternalSprays',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getInternalSprays: getInternalSprays,
            saveInternalSpray: saveInternalSpray
        };
    })();

    return dataService;
});
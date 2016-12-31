/*
    Data service module with ajax calls to the server
*/
define("seatFoamSpray/seatFoamSpray.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getSeatFoamSprays', 'ajax', {
                        url: '/Api/SeatFoamSpray',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveSeatFoamSpray', 'ajax', {
                        url: '/Api/SeatFoamSpray',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveSeatFoamSpray = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveSeatFoamSpray',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getSeatFoamSprays = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getSeatFoamSprays',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getSeatFoamSprays: getSeatFoamSprays,
            saveSeatFoamSpray: saveSeatFoamSpray
        };
    })();

    return dataService;
});
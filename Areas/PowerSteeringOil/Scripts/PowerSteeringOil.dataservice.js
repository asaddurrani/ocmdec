/*
    Data service module with ajax calls to the server
*/
define("powerSteeringOil/powerSteeringOil.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getPowerSteeringOils', 'ajax', {
                        url: '/Api/PowerSteeringOil',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('savePowerSteeringOil', 'ajax', {
                        url: '/Api/PowerSteeringOil',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            savePowerSteeringOil = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'savePowerSteeringOil',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getPowerSteeringOils = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getPowerSteeringOils',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getPowerSteeringOils: getPowerSteeringOils,
            savePowerSteeringOil: savePowerSteeringOil
        };
    })();

    return dataService;
});
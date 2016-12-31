/*
    Data service module with ajax calls to the server
*/
define("fuelFilter/fuelFilter.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getFuelFilters', 'ajax', {
                        url: '/Api/FuelFilter',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveFuelFilter', 'ajax', {
                        url: '/Api/FuelFilter',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            saveFuelFilter = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveFuelFilter',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getFuelFilters = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getFuelFilters',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getFuelFilters: getFuelFilters,
            saveFuelFilter: saveFuelFilter
        };
    })();

    return dataService;
});
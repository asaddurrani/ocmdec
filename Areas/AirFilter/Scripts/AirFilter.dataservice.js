/*
    Data service module with ajax calls to the server
*/
define("airFilter/airFilter.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get air Filters
                    amplify.request.define('getAirFilters', 'ajax', {
                        url: '/Api/AirFilter',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('saveAirFilter', 'ajax', {
                        url: '/Api/AirFilter',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save AirFilter
            saveAirFilter = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveAirFilter',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get Air Filters
            getAirFilters = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getAirFilters',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getAirFilters: getAirFilters,
            saveAirFilter: saveAirFilter
        };
    })();

    return dataService;
});
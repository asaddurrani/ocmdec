/*
    Data service module with ajax calls to the server
*/
define("oilFilter/oilFilter.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {

                    // Define request to get oil makers 
                    amplify.request.define('getOilFilterMakerCompanies', 'ajax', {
                        url: '/Api/OilFilterMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get oil Filters
                    amplify.request.define('getOilFilters', 'ajax', {
                        url: '/Api/OilFilter',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Oil Filter
                    amplify.request.define('saveOilFilter', 'ajax', {
                        url: '/Api/OilFilter',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Get Oil Filter Maker Companies
            getOilFilterMakerCompanies = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getOilFilterMakerCompanies',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Save Oil Filter
            saveOilFilter = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveOilFilter',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get Oil Filters
            getOilFilters = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getOilFilters',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };

        return {
            getOilFilterMakerCompanies: getOilFilterMakerCompanies,
            getOilFilters: getOilFilters,
            saveOilFilter: saveOilFilter
        };
    })();

    return dataService;
});
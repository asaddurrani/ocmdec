/*
    Data service module with ajax calls to the server
*/
define("oil/oil.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function() {
                if (!isInitialized) {

                    // Define request to get oil makers 
                    amplify.request.define('getOilMakerCompanies', 'ajax', {
                        url: '/Api/OilMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get oils
                    amplify.request.define('getOils', 'ajax', {
                        url: '/Api/Oil',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Oil
                    amplify.request.define('saveOil', 'ajax', {
                        url: '/Api/Oil',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Get Oil Maker Companies
            getOilMakerCompanies = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getOilMakerCompanies',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Save Oil
            saveOil = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveOil',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get Oils
            getOils = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getOils',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getOilMakerCompanies: getOilMakerCompanies,
            getOils: getOils,
            saveOil: saveOil
        };
    })();

    return dataService;
});
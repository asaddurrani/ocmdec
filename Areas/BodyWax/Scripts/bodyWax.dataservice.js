/*
    Data service module with ajax calls to the server
*/
define("bodyWax/bodyWax.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function() {
                if (!isInitialized) {

                    // Define request to get bodyWax makers 
                    amplify.request.define('getBodyWaxMakerCompanies', 'ajax', {
                        url: '/Api/BodyWaxMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get bodyWaxs
                    amplify.request.define('getBodyWaxs', 'ajax', {
                        url: '/Api/BodyWax',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save BodyWax
                    amplify.request.define('saveBodyWax', 'ajax', {
                        url: '/Api/BodyWax',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Get BodyWax Maker Companies
            getBodyWaxMakerCompanies = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getBodyWaxMakerCompanies',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Save BodyWax
            saveBodyWax = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveBodyWax',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get BodyWaxs
            getBodyWaxs = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getBodyWaxs',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getBodyWaxMakerCompanies: getBodyWaxMakerCompanies,
            getBodyWaxs: getBodyWaxs,
            saveBodyWax: saveBodyWax
        };
    })();

    return dataService;
});
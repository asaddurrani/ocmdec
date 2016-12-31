/*
    Data service module with ajax calls to the server
*/
define("bodyPolish/bodyPolish.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function() {
                if (!isInitialized) {

                    // Define request to get bodyPolish makers 
                    amplify.request.define('getBodyPolishMakerCompanies', 'ajax', {
                        url: '/Api/BodyPolishMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get bodyPolishs
                    amplify.request.define('getBodyPolishs', 'ajax', {
                        url: '/Api/BodyPolish',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save BodyPolish
                    amplify.request.define('saveBodyPolish', 'ajax', {
                        url: '/Api/BodyPolish',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Get BodyPolish Maker Companies
            getBodyPolishMakerCompanies = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getBodyPolishMakerCompanies',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Save BodyPolish
            saveBodyPolish = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveBodyPolish',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get BodyPolishs
            getBodyPolishs = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getBodyPolishs',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getBodyPolishMakerCompanies: getBodyPolishMakerCompanies,
            getBodyPolishs: getBodyPolishs,
            saveBodyPolish: saveBodyPolish
        };
    })();

    return dataService;
});
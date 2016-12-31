/*
    Data service module with ajax calls to the server
*/
define("petrolAdditive/petrolAdditive.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {
                    // Define request to get power steering oils
                    amplify.request.define('getPetrolAdditives', 'ajax', {
                        url: '/Api/PetrolAdditive',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save Air Filter
                    amplify.request.define('savePetrolAdditive', 'ajax', {
                        url: '/Api/PetrolAdditive',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Save Power steering oil
            savePetrolAdditive = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'savePetrolAdditive',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get power steering oils
            getPetrolAdditives = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getPetrolAdditives',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getPetrolAdditives: getPetrolAdditives,
            savePetrolAdditive: savePetrolAdditive
        };
    })();

    return dataService;
});
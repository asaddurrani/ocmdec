/*
    Data service module with ajax calls to the server
*/
define("autoTransFluid/autoTransFluid.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function() {
                if (!isInitialized) {

                    // Define request to get autoTransFluid makers 
                    amplify.request.define('getAutoTransFluidMakerCompanies', 'ajax', {
                        url: '/Api/AutoTransFluidMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get autoTransFluids
                    amplify.request.define('getAutoTransFluids', 'ajax', {
                        url: '/Api/AutoTransFluid',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to Save AutoTransFluid
                    amplify.request.define('saveAutoTransFluid', 'ajax', {
                        url: '/Api/AutoTransFluid',
                        dataType: 'json',
                        decoder: amplify.request.decoders.istStatusDecoder,
                        type: 'POST'
                    });
                    isInitialized = true;
                }
            },
            // Get AutoTransFluid Maker Companies
            getAutoTransFluidMakerCompanies = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getAutoTransFluidMakerCompanies',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Save AutoTransFluid
            saveAutoTransFluid = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'saveAutoTransFluid',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            },
            // Get AutoTransFluids
            getAutoTransFluids = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getAutoTransFluids',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getAutoTransFluidMakerCompanies: getAutoTransFluidMakerCompanies,
            getAutoTransFluids: getAutoTransFluids,
            saveAutoTransFluid: saveAutoTransFluid
        };
    })();

    return dataService;
});
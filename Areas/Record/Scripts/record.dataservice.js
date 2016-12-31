/*
    Data service module with ajax calls to the server
*/
define("record/record.dataservice", function () {

    // Data service for forecast 
    var dataService = (function () {
        var // True if initialized
            isInitialized = false,
            // Initialize
            initialize = function () {
                if (!isInitialized) {

                    // Define request to get oil makers 
                    amplify.request.define('getOilMakerCompanies', 'ajax', {
                        url: '/Api/OilMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get vehicle model maker 
                    amplify.request.define('getVehicleModelMaker', 'ajax', {
                        url: '/Api/VehicleModelMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get oil makers 
                    amplify.request.define('getOilMakerCompanies', 'ajax', {
                        url: '/Api/VehicleMaker',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get record base data
                    amplify.request.define('getRecordBaseData', 'ajax', {
                        url: '/Api/RecordBase',
                        dataType: 'json',
                        type: 'GET'
                    });
                    // Define request to get record by vehicle plate number
                    amplify.request.define('getRecordByVehiclePlateNumber', 'ajax', {
                        url: '/Api/RecordByVehiclePlateNumber',
                        dataType: 'json',
                        type: 'GET'
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
            // Get Record Base Data
            getRecordBaseData = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getRecordBaseData',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Get request to get record by vehicle plate number
            getRecordByVehiclePlateNumber = function (callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getRecordBaseData',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            // Get Vehicle Model Maker
            getVehicleModelMaker = function (param, callbacks) {
                initialize();
                return amplify.request({
                    resourceId: 'getVehicleModelMaker',
                    success: callbacks.success,
                    error: callbacks.error,
                    data: param
                });
            };


        return {
            getOilMakerCompanies: getOilMakerCompanies,
            getVehicleModelMaker: getVehicleModelMaker,
            getRecordBaseData: getRecordBaseData,
            getRecordByVehiclePlateNumber: getRecordByVehiclePlateNumber
        };
    })();

    return dataService;
});
/*
    Module with the view model for the Vehicle
*/
define("vehicle/vehicle.viewModel",
    ["jquery", "amplify", "ko", "vehicle/vehicle.dataservice", "vehicle/vehicle.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.vehicle = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Vehicles
                    isVehiclesLoaded = ko.observable(false),
                    //Vehicles Makers
                    vehiclesMakers = ko.observableArray([]),
                    //Vehicles Makers For Dialog
                    vehiclesMakersListForDialog = ko.observableArray([]),
                    //Vehicles
                    vehicles = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //vehicle Maker Filter
                    vehicleMakerFilter = ko.observable(),
                    //selected Vehicle
                    selectedVehicle = ko.observable(),
                    //Is Loading Vehicle
                    isLoadingVehicle = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Get Vehicle Makers
                        getVehicleMakers();
                    },
                    //Get Vehicle Makers
                    getVehicleMakers = function() {
                        dataservice.getVehicleMakers({
                            success: function (data) {
                                var vehiclesMakersList = [];
                                _.each(data.VehicleMakers, function (item) {
                                    var product = new model.VehicleMaker.Create(item);
                                    vehiclesMakersList.push(product);
                                });
                                ko.utils.arrayPushAll(vehiclesMakers(), vehiclesMakersList);
                                vehiclesMakers.valueHasMutated();
                                ko.utils.arrayPushAll(vehiclesMakersListForDialog(), vehiclesMakersList);
                                vehiclesMakersListForDialog.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load vehicle makers data");
                            }
                        });
                    },
                    //Get Vehicles
                    getVehicles = function () {
                        isLoadingVehicle(true);
                        dataservice.getVehicleModelMaker({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage()
                        }, {
                            success: function (data) {
                                vehicles.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.VehicleModelMakers, function (item) {
                                        var module = new model.VehicleModelMaker.Create(item);
                                        vehicles.push(module);
                                    });
                                }
                                isLoadingVehicle(false);
                            },
                            error: function (response) {
                                isLoadingVehicle(false);
                                toastr.error("Error: Failed to Load Vehicles Data." + response);
                            }
                        });
                    },
                    //Create Vehicle
                    createVehicle = function () {
                        //selectedVehicle(new model.VehicleModelMaker().Create({}));
                        selectedVehicle(new model.VehicleModelMaker());
                        view.showVehiclesDialog();
                    },
                    //Template Chooser
                    templateToUse = function (product) {
                        return (product === selectedProduct() ? 'editVehicleTemplate' : 'itemVehicleTemplate');
                    },
                    //Search Vehicle
                    searchVehicle = function() {
                        getVehicles();
                    },
                    //Delete vehicle
                    onDeleteVehicle = function() {
                        
                    },
                    //Edit Vehicle
                    onEditVehicle = function() {
                        if (selectedVehicle() != undefined) {
                            view.showVehiclesDialog();
                        }
                    },
                    //Select Vehicle
                    selectVehicle = function(vehicle) {
                        if (selectedVehicle() != vehicle) {
                            selectedVehicle(vehicle);
                        }
                    },
                    //On Save Vehicle
                    onSaveVehicle = function() {
                        if (selectedVehicle().isValid()) {
                            view.hideVehiclesDialog();
                        }
                    },
                    //On Close Dialog
                    onCloseVehicleDialog = function() {
                        view.hideVehiclesDialog();
                    },
                    
                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, vehicles, getVehicles));
                        getBaseData();
                        getVehicles();
                        
                    };
                //#endregion


                return {
                    searchFilter: searchFilter,
                    isLoadingVehicle: isLoadingVehicle,
                    vehicleMakerFilter: vehicleMakerFilter,
                    getVehicles: getVehicles,
                    createVehicle: createVehicle,
                    selectedVehicle: selectedVehicle,
                    searchVehicle: searchVehicle,
                    onDeleteVehicle: onDeleteVehicle,
                    isVehiclesLoaded: isVehiclesLoaded,
                    selectVehicle: selectVehicle,
                    pager: pager,
                    onEditVehicle: onEditVehicle,
                    vehiclesMakers: vehiclesMakers,
                    vehicles: vehicles,
                    templateToUse: templateToUse,
                    vehiclesMakersListForDialog: vehiclesMakersListForDialog,
                    onSaveVehicle: onSaveVehicle,
                    onCloseVehicleDialog: onCloseVehicleDialog,
                    initialize: initialize
                };
                
            })()
        };
        return ist.vehicle.viewModel;
    });

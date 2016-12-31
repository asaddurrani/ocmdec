/*
    Module with the view model for the Vehicle
*/
define("record/record.viewModel",
    ["jquery", "amplify", "ko", "record/record.dataservice", "record/record.model", "oil/oil.model", "vehicle/vehicle.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, oilModel, vehicleModel, confirmation, pagination) {

        var ist = window.ist || {};
        ist.record = {
            viewModel: (function () {
                var // the view 
                    view,
                    //#region Observables 

                    //Is Loading Records
                    isRecordLoaded = ko.observable(false),
                    //Oil Maker Companies // Shell, Helix
                    oilMakers = ko.observableArray([]),
                    //oils // remula
                    oils = ko.observableArray([]),
                    //oil Companies For Dialog // Honda, Toyota, Suzuki
                    vehiclesMakersList = ko.observableArray([]),
                    //vehicles // corolla, city, mehran
                    vehicles = ko.observableArray([]),
                    //Air Filters
                    airFilters = ko.observableArray([]),
                    //Oil Filters
                    oilFilters = ko.observableArray([]),
                    //Brake oils
                    brakeOils = ko.observableArray([]),
                    //Power Sterring Oils
                    powerSteeringoils = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //oil Maker Company Filter
                    oilMakerCompanyFilter = ko.observable(),
                    //selected Oil
                    selectedOil = ko.observable(),
                    //Is Loading Oil
                    isLoadingOil = ko.observable(false),
                    //pager
                    pager = ko.observable(),
                    //Selected Record
                    selectedRecord = ko.observable(),
                    //Record have Oil
                    recordContainsOil = ko.observable(false),
                    //record have air filter
                    recordContainsAirFilter = ko.observable(false),
                    //record have oil filter
                    recordContainsOilFilter = ko.observable(false),
                    //record have brake oil 
                    recordContainsBrakeOil = ko.observable(false),
                    //record have power sterring oil
                    recordContainsPowerSterringOil = ko.observable(false),

                    //ExtraItems
                    extraItems = ko.observableArray([
                        { id: '1', name: 'Oil Filter' },
                        { id: '2', name: 'Air Filter' },
                        { id: '3', name: 'Brake Oil' },
                        { id: '4', name: 'Sterring Oil' }
                    ]),
                    //Selected Record Air Filter Price
                    selectedRecordAirFilterPrice = ko.observable(),
                    //Selected Record Oil Filter Price
                    selectedRecordOilFilterPrice = ko.observable(),
                    //Selected Record Brake Oil Price
                    selectedRecordbrakeOilPrice = ko.observable(),
                    //Selected Record Power Sterring oil Price
                    selectedRecordPowerSterringOilPrice = ko.observable(),
                //#endregion

                    //#region Regions Show and Collapsed
                    showOilSection = function () {
                        recordContainsOil(true);
                        view.showOilSection();
                    },
                    hideOilSection = function () {
                        recordContainsOil(false);
                        view.hideOilSection();
                        resetOilFieldsOnClosingSection();
                    },
                    showAirFilterSection = function () {
                        recordContainsAirFilter(true);
                        view.showAirFilterSection();
                    },
                    hideAirFilterSection = function () {
                        recordContainsAirFilter(false);
                        view.hideAirFilterSection();
                        resetAirFilterFieldsOnClosingSection();
                    },
                    showOilFilterSection = function () {
                        recordContainsOilFilter(true);
                        view.showOilFilterSection();
                    },
                    hideOilFilterSection = function () {
                        recordContainsOilFilter(false);
                        view.hideOilFilterSection();
                        resetOilFilterFieldsOnClosingSection();
                    },
                    showBrakeOilSection = function () {
                        recordContainsBrakeOil(true);
                        view.showBrakeOilSection();
                    },
                    hideBrakeOilSection = function () {
                        recordContainsBrakeOil(false);
                        view.hideBrakeOilSection();
                        resetBrakeOilFieldsOnClosingSection();
                    },
                    showPowerSterringOilSection = function () {
                        recordContainsPowerSterringOil(true);
                        view.showPowerSteeringOilSection();
                    },
                    hidePowerSterringOilSection = function () {
                        recordContainsPowerSterringOil(false);
                        view.hidePowerSteeringOilSection();
                        resetPowerSteeringOilFieldsOnClosingSection();
                    },
                    // ReSharper disable once UnusedLocals
                    resetOilFieldsOnClosingSection = function () {
                        selectedRecord().vehicleCompanyId(undefined);
                        selectedRecord().vehicleDailyMilage(undefined);
                        selectedRecord().oilCompanyId(undefined);
                        selectedRecord().oilChangeDate(undefined);
                        selectedRecord().nextOilChangeDate(undefined);
                        selectedRecord().sentSms(true);
                        selectedRecord().currentMeterReading(true);
                        selectedRecord().nextMeterReading(true);
                    },
                    resetOilFilterFieldsOnClosingSection = function () {
                        selectedRecord().oilFilterId(undefined);
                        selectedRecordOilFilterPrice(0);
                    },
                    resetAirFilterFieldsOnClosingSection = function () {
                        selectedRecord().airFilterId(undefined);
                        selectedRecordAirFilterPrice(0);
                    },
                    resetBrakeOilFieldsOnClosingSection = function () {
                        selectedRecord().brakeOilId(undefined);
                        selectedRecordbrakeOilPrice(0);
                    },
                    resetPowerSteeringOilFieldsOnClosingSection = function () {
                        selectedRecord().powerStereringOilId(undefined);
                        selectedRecordPowerSterringOilPrice(0);
                    },
                    //#endregion

                    //#region Utility Functions 
                    vehicleModelsListForDialog = ko.observableArray([]),
                    oilsModelsListForDialog = ko.observableArray([]),
                    //Computed Vehicle Models
                    vehicleModelsForDialog = ko.computed(function () {
                        if (selectedRecord() && selectedRecord().vehicleCompanyId && selectedRecord().vehicleCompanyId()) {
                            vehicleModelsListForDialog.removeAll();
                            _.each(vehicles(), function (vehicle) {
                                if (vehicle.vehicleMakerId() == selectedRecord().vehicleCompanyId()) {
                                    vehicleModelsListForDialog.splice(0, 0, vehicle);
                                }
                            });
                        } else {
                            vehicleModelsListForDialog.removeAll();
                        }
                    }),
                    //#region Region to calculate prices of oils
                    // ReSharper disable once UnusedLocals
                    selectedRecordAirFilterPriceVal = ko.computed(function () {
                        if (selectedRecord() != undefined && selectedRecord().airFilterId() != undefined) {
                            _.each(airFilters(), function (airFilter) {
                                if (airFilter.AilFilterId == selectedRecord().airFilterId()) {
                                    selectedRecordAirFilterPrice(airFilter.AirFilterPrice * selectedRecord().airFilterQty());
                                }
                            });
                        }
                        if (selectedRecord() != undefined && selectedRecord().airFilterId() == undefined) {
                            selectedRecordAirFilterPrice(0);
                            selectedRecord().airFilterQty(1);
                        }
                    }),
                    // ReSharper disable once UnusedLocals
                    selectedRecordOilFilterPriceVal = ko.computed(function () {
                        if (selectedRecord() != undefined && selectedRecord().oilFilterId() != undefined) {
                            _.each(oilFilters(), function (oilFilter) {
                                if (oilFilter.OilFilterId == selectedRecord().oilFilterId()) {
                                    selectedRecordOilFilterPrice(oilFilter.OilFilterPrice * selectedRecord().oilFilterQty());
                                }
                            });
                        }
                        if (selectedRecord() != undefined && selectedRecord().oilFilterId() == undefined) {
                            selectedRecordOilFilterPrice(0);
                            selectedRecord().oilFilterQty(1);
                        }
                    }),
                    // ReSharper disable once UnusedLocals
                    selectedRecordbrakeOilPriceVal = ko.computed(function () {
                        if (selectedRecord() != undefined && selectedRecord().brakeOilId() != undefined) {
                            _.each(brakeOils(), function (brakeOil) {
                                if (brakeOil.BrakeOilId == selectedRecord().brakeOilId()) {
                                    selectedRecordbrakeOilPrice(brakeOil.BrakeOilPrice * selectedRecord().brakeOilQty());
                                }
                            });
                        }
                        if (selectedRecord() != undefined && selectedRecord().brakeOilId() == undefined) {
                            selectedRecordbrakeOilPrice(0);
                            selectedRecord().brakeOilQty(1);
                        }
                    }),
                    // ReSharper disable once UnusedLocals
                    selectedRecordPowerSterringOilPriceVal = ko.computed(function () {
                        if (selectedRecord() != undefined && selectedRecord().powerStereringOilId() != undefined) {
                            _.each(powerSteeringoils(), function (powerSterringOil) {
                                if (powerSterringOil.PowerStereringOilId == selectedRecord().powerStereringOilId()) {
                                    selectedRecordPowerSterringOilPrice(powerSterringOil.PowerSterringOilPrice * selectedRecord().powerSterringOilQty());
                                }
                            });
                        }
                        if (selectedRecord() != undefined && selectedRecord().powerStereringOilId() == undefined) {
                            selectedRecordPowerSterringOilPrice(0);
                            selectedRecord().powerSterringOilQty(1);
                        }
                    }),
                    //vallidate qty field
                    validateQtyFields = ko.computed(function () {
                        if (selectedRecord() !== undefined) {
                            if (selectedRecord().airFilterQty() != undefined && !(isNormalInteger(selectedRecord().airFilterQty()))) {
                                selectedRecord().airFilterQty(1);
                            }
                            if (selectedRecord().oilFilterQty() != undefined && !(isNormalInteger(selectedRecord().oilFilterQty()))) {
                                selectedRecord().oilFilterQty(1);
                            }
                            if (selectedRecord().brakeOilQty() != undefined && !(isNormalInteger(selectedRecord().brakeOilQty()))) {
                                selectedRecord().brakeOilQty(1);
                            }
                            if (selectedRecord().powerSterringOilQty() != undefined && !(isNormalInteger(selectedRecord().powerSterringOilQty()))) {
                                selectedRecord().powerSterringOilQty(1);
                            }
                        }
                    }),
                    isNormalInteger = function (str) {
                    var n = ~~Number(str);
                    return String(n) === str && n >= 0;
                },
                    //#endregion
                    //Computed Method For Oil
                    // ReSharper disable once UnusedLocals
                    oilModelsForDialog = ko.computed(function () {
                        if (selectedRecord() && selectedRecord().oilCompanyId && selectedRecord().oilCompanyId()) {
                            oilsModelsListForDialog.removeAll();
                            _.each(oils(), function (oil) {
                                if (oil.oilMakerId() == selectedRecord().oilCompanyId()) {
                                    oilsModelsListForDialog.splice(0, 0, oil);
                                }
                            });
                        } else {
                            oilsModelsListForDialog.removeAll();
                        }
                    }),
                    //Computed to compute oil Power
                    // ReSharper disable once UnusedLocals
                    oilPowerForDialog = ko.computed(function () {
                        if (selectedRecord() && selectedRecord().oilNameId && selectedRecord().oilNameId()) {
                            _.each(oilsModelsListForDialog(), function (oil) {
                                if (oil.oilId() == selectedRecord().oilNameId()) {
                                    selectedRecord().oilPower(oil.oilPower());
                                    selectedRecord().selectedOilMilage(oil.oilAverageMilage());
                                    toastr.info("Average Oil Milage : " + oil.oilAverageMilage());
                                }
                            });
                        } else {
                            if (selectedRecord()) {
                                selectedRecord().oilPower(undefined);
                                selectedRecord().selectedOilMilage(undefined);
                            }
                        }
                    }),
                    //Computed to compute next oil change date
                    // ReSharper disable once UnusedLocals
                    //nextOilChangeDateComputation = ko.computed(function () {
                    //    if (selectedRecord() && selectedRecord().oilChangeDate() != undefined) {
                    //        var oilMilage = selectedRecord().selectedOilMilage();
                    //        var dailyVehicleRunning = selectedRecord().vehicleDailyMilage();
                    //        var daysAfterWhichOilNeedsToChanged = oilMilage / dailyVehicleRunning;
                    //        debugger
                    //        //todo do further calculation
                    //    }
                    //}),
                    //get Base Data
                    getBaseData = function () {
                        getRecordBaseData();
                    },
                    getRecordBaseData = function () {
                        dataservice.getRecordBaseData({
                            success: function (data) {

                                var oilMakerCompaniesList = [];
                                var oilsList = [];
                                var vehicleMakersList = [];
                                var vehiclesList = [];

                                _.each(data.OilMakerCompanies, function (item) {
                                    var oilMaker = new oilModel.OilMakerCompany.Create(item);
                                    oilMakerCompaniesList.push(oilMaker);
                                });
                                ko.utils.arrayPushAll(oilMakers(), oilMakerCompaniesList);
                                oilMakers.valueHasMutated();

                                _.each(data.Oils, function (item) {
                                    var oil = new oilModel.Oil.Create(item);
                                    oilsList.push(oil);
                                });
                                ko.utils.arrayPushAll(oils(), oilsList);
                                oils.valueHasMutated();

                                _.each(data.VehicleMakers, function (item) {
                                    var vehicleMaker = new vehicleModel.VehicleMaker.Create(item);
                                    vehicleMakersList.push(vehicleMaker);
                                });
                                ko.utils.arrayPushAll(vehiclesMakersList(), vehicleMakersList);
                                vehiclesMakersList.valueHasMutated();

                                _.each(data.VehicleModelMaker, function (item) {
                                    var vehicleModelMaker = new vehicleModel.VehicleModelMaker.Create(item);
                                    vehiclesList.push(vehicleModelMaker);
                                });
                                ko.utils.arrayPushAll(vehicles(), vehiclesList);
                                vehicles.valueHasMutated();

                                //airFilters oilFilters brakeOils powerSteeringoils  
                                ko.utils.arrayPushAll(airFilters(), data.AirFilters);
                                airFilters.valueHasMutated();

                                ko.utils.arrayPushAll(oilFilters(), data.OilFilters);
                                oilFilters.valueHasMutated();

                                ko.utils.arrayPushAll(brakeOils(), data.BrakeOils);
                                brakeOils.valueHasMutated();

                                ko.utils.arrayPushAll(powerSteeringoils(), data.PowerSterringOils);
                                powerSteeringoils.valueHasMutated();
                            },
                            error: function () {
                                toastr.error("Failed to load oil maker companies data");
                            }
                        });
                    },
                    //Get Oils
                    getOils = function () {
                        isLoadingOil(true);
                        //dataservice.getOils({
                        //    SearchString: searchFilter(),
                        //    PageSize: pager().pageSize(),
                        //    PageNo: pager().currentPage()
                        //}, {
                        //    success: function (data) {
                        //        oils.removeAll();
                        //        if (data != null) {
                        //            pager().totalCount(data.TotalCount);
                        //            _.each(data.Oils, function (item) {
                        //                var module = new model.Oil.Create(item);
                        //                oils.push(module);
                        //            });
                        //        }
                        //        isLoadingOil(false);
                        //    },
                        //    error: function (response) {
                        //        isLoadingOil(false);
                        //        toastr.error("Error: Failed to Load Oils Data." + response);
                        //    }
                        //});
                    },
                    //Create Record
                    createRecord = function () {
                        selectedRecord(new model.Record());
                        view.showRecordDialog();
                    },
                    //Search Oil
                    searchOil = function () {
                        getOils();
                    },
                    //Delete oil
                    onDeleteOil = function () {

                    },
                    //Edit Oil
                    onEditOil = function () {
                        if (selectedOil() != undefined) {
                            view.showOilDialog();
                        }
                    },
                    //Select Oil
                    selectOil = function (oil) {
                        if (selectedOil() != oil) {
                            selectedOil(oil);
                        }
                    },
                    //On Save Oil
                    onSaveOil = function () {
                        if (selectedOil().isValid()) {
                            view.hideOilDialog();
                        }
                    },
                    //On Close Dialog
                    onCloseOilDialog = function () {
                        view.hideOilDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, oils, getOils));
                        getBaseData();
                        //getOils();

                    };
                //#endregion


                return {

                    airFilters: airFilters,
                    oilFilters: oilFilters,
                    brakeOils: brakeOils,
                    powerSteeringoils: powerSteeringoils,
                    //#region Return
                    extraItems: extraItems,
                    recordContainsOil: recordContainsOil,
                    recordContainsAirFilter: recordContainsAirFilter,
                    recordContainsOilFilter: recordContainsOilFilter,
                    recordContainsBrakeOil: recordContainsBrakeOil,
                    recordContainsPowerSterringOil: recordContainsPowerSterringOil,
                    showOilSection: showOilSection,
                    hideOilSection: hideOilSection,
                    showAirFilterSection: showAirFilterSection,
                    hideAirFilterSection: hideAirFilterSection,
                    showOilFilterSection: showOilFilterSection,
                    hideOilFilterSection: hideOilFilterSection,
                    showBrakeOilSection: showBrakeOilSection,
                    hideBrakeOilSection: hideBrakeOilSection,
                    showPowerSterringOilSection: showPowerSterringOilSection,
                    hidePowerSterringOilSection: hidePowerSterringOilSection,

                    isRecordLoaded: isRecordLoaded,
                    oilMakers: oilMakers,
                    oils: oils,
                    searchFilter: searchFilter,
                    oilMakerCompanyFilter: oilMakerCompanyFilter,
                    selectedOil: selectedOil,
                    isLoadingOil: isLoadingOil,
                    selectedRecord: selectedRecord,
                    pager: pager,
                    getBaseData: getBaseData,
                    getOils: getOils,
                    createRecord: createRecord,
                    searchOil: searchOil,
                    onDeleteOil: onDeleteOil,
                    onEditOil: onEditOil,
                    selectOil: selectOil,
                    onSaveOil: onSaveOil,
                    onCloseOilDialog: onCloseOilDialog,
                    vehiclesMakersList: vehiclesMakersList,
                    vehicleModelsForDialog: vehicleModelsForDialog,
                    vehicleModelsListForDialog: vehicleModelsListForDialog,
                    oilsModelsListForDialog: oilsModelsListForDialog,
                    vehicles: vehicles,
                    selectedRecordAirFilterPrice: selectedRecordAirFilterPrice,
                    selectedRecordOilFilterPrice: selectedRecordOilFilterPrice,
                    selectedRecordbrakeOilPrice: selectedRecordbrakeOilPrice,
                    selectedRecordPowerSterringOilPrice: selectedRecordPowerSterringOilPrice,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.record.viewModel;
    });

/*
    Module with the view model for the Vehicle
*/
define("powerSteeringOil/powerSteeringOil.viewModel",
    ["jquery", "amplify", "ko", "powerSteeringOil/powerSteeringOil.dataservice", "powerSteeringOil/powerSteeringOil.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.powerSteeringOil = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isPowerSteeringOilLoaded = ko.observable(false),
                    //Power Steering Oils
                    powerSteeringOils = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedPowerSteeringOil = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingPowerSteeringOil = ko.observable(false),
                    //pager
                    pager = ko.observable(),

                    //#endregion

                    //#region Utility Functions 

                    //get Base Data
                    getBaseData = function () {
                        //Nothing to implement
                        //no base data needed
                    },

                    //Get Power Steering Oil
                    getPowerSteeringOils = function () {
                        isLoadingPowerSteeringOil(true);
                        dataservice.getPowerSteeringOils({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                powerSteeringOils.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.PowerSteeringOil.Create(item);
                                        powerSteeringOils.push(module);
                                    });
                                }
                                isLoadingPowerSteeringOil(false);
                            },
                            error: function (response) {
                                isLoadingPowerSteeringOil(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createPowerSteeringOil = function () {
                        selectedPowerSteeringOil(new model.PowerSteeringOil.Create({}));
                        view.showPowerSteeringOilDialog();
                    },
                    //Search Power Steering Oil
                    searchPowerSteeringOil = function () {
                        getPowerSteeringOils();
                    },
                    //Delete Power Steering Oil
                    onDeletePowerSteeringOil = function () {

                    },
                    //Edit Power Steering Oil
                    onEditPowerSteeringOil = function () {
                        if (selectedPowerSteeringOil() != undefined) {
                            view.showPowerSteeringOilDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectPowerSteeringOil = function (powerSteeringOil) {
                        if (selectedPowerSteeringOil() != powerSteeringOil) {
                            selectedPowerSteeringOil(powerSteeringOil);
                        }
                    },
                    //On Save Power Steering Oil
                    onSavePowerSteeringOil = function () {
                        if (doBeforeSelect()) {
                            dataservice.savePowerSteeringOil(
                                selectedPowerSteeringOil().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedPowerSteeringOil = model.PowerSteeringOil.Create(data);
                                            if (selectedPowerSteeringOil().powerStereringOilId() <= 0 || selectedPowerSteeringOil().powerStereringOilId() == undefined) {
                                                powerSteeringOils.splice(0, 0, savedPowerSteeringOil);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hidePowerSteeringOilDialog();
                                        }
                                    },
                                    error: function (response) {
                                        toastr.error("Error: Failed To Save Power Steering Oil " + response);
                                    }
                                });
                        }
                    },
                    // Do Before Logic
                    doBeforeSelect = function () {
                        var flag = true;
                        if (!selectedPowerSteeringOil().isValid()) {
                            selectedPowerSteeringOil().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onClosePowerSteeringOilDialog = function () {
                        view.hidePowerSteeringOilDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, powerSteeringOils, getPowerSteeringOils));
                        getBaseData();
                        getPowerSteeringOils();
                    };
                //#endregion


                return {
                    //#region Return
                    isPowerSteeringOilLoaded: isPowerSteeringOilLoaded,
                    powerSteeringOils: powerSteeringOils,
                    searchFilter: searchFilter,
                    selectedPowerSteeringOil: selectedPowerSteeringOil,
                    isLoadingPowerSteeringOil: isLoadingPowerSteeringOil,
                    pager: pager,
                    getBaseData: getBaseData,
                    getPowerSteeringOils: getPowerSteeringOils,
                    createPowerSteeringOil: createPowerSteeringOil,
                    searchPowerSteeringOil: searchPowerSteeringOil,
                    onDeletePowerSteeringOil: onDeletePowerSteeringOil,
                    onEditPowerSteeringOil: onEditPowerSteeringOil,
                    selectPowerSteeringOil: selectPowerSteeringOil,
                    onSavePowerSteeringOil: onSavePowerSteeringOil,
                    onClosePowerSteeringOilDialog: onClosePowerSteeringOilDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.powerSteeringOil.viewModel;
    });

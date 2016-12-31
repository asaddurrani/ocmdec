/*
    Module with the view model for the Vehicle
*/
define("engineSpray/engineSpray.viewModel",
    ["jquery", "amplify", "ko", "engineSpray/engineSpray.dataservice", "engineSpray/engineSpray.model", "common/confirmation.viewModel", "common/pagination"],
    function ($, amplify, ko, dataservice, model, confirmation, pagination) {

        var ist = window.ist || {};
        ist.engineSpray = {
            viewModel: (function () {
                var // the view 
                    view,

                    //#region Observables 

                    //Is Loading Power Steering Oil
                    isEngineSprayLoaded = ko.observable(false),
                    //Power Steering Oils
                    engineSprays = ko.observableArray([]),
                    //search Filter
                    searchFilter = ko.observable(),
                    //selected Power Steering Oil
                    selectedEngineSpray = ko.observable(),
                    //Is Loading Power Steering Oil
                    isLoadingEngineSpray = ko.observable(false),
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
                    getEngineSprays = function () {
                        isLoadingEngineSpray(true);
                        dataservice.getEngineSprays({
                            SearchString: searchFilter(),
                            PageSize: pager().pageSize(),
                            PageNo: pager().currentPage(),
                        }, {
                            success: function (data) {
                                engineSprays.removeAll();
                                if (data != null) {
                                    pager().totalCount(data.TotalCount);
                                    _.each(data.PowerSterringOils, function (item) {
                                        var module = new model.EngineSpray.Create(item);
                                        engineSprays.push(module);
                                    });
                                }
                                isLoadingEngineSpray(false);
                            },
                            error: function (response) {
                                isLoadingEngineSpray(false);
                                toastr.error("Error: Failed to Load Power Steering Oil Data." + response);
                            }
                        });
                    },
                    //Create Power Steering Oil
                    createEngineSpray = function () {
                        selectedEngineSpray(new model.EngineSpray.Create({}));
                        view.showEngineSprayDialog();
                    },
                    //Search Power Steering Oil
                    searchEngineSpray = function () {
                        getEngineSprays();
                    },
                    //Delete Power Steering Oil
                    onDeleteEngineSpray = function () {

                    },
                    //Edit Power Steering Oil
                    onEditEngineSpray = function () {
                        if (selectedEngineSpray() != undefined) {
                            view.showEngineSprayDialog();
                        }
                    },
                    //Select Power Steering Oil
                    selectEngineSpray = function (engineSpray) {
                        if (selectedEngineSpray() != engineSpray) {
                            selectedEngineSpray(engineSpray);
                        }
                    },
                    //On Save Power Steering Oil
                    onSaveEngineSpray = function () {
                        if (doBeforeSelect()) {
                            dataservice.saveEngineSpray(
                                selectedEngineSpray().convertToServerData(),
                                {
                                    success: function (data) {
                                        if (data) {
                                            var savedEngineSpray = model.EngineSpray.Create(data);
                                            if (selectedEngineSpray().powerStereringOilId() <= 0 || selectedEngineSpray().powerStereringOilId() == undefined) {
                                                engineSprays.splice(0, 0, savedEngineSpray);
                                            }
                                            toastr.success("Saved Successfully");
                                            view.hideEngineSprayDialog();
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
                        if (!selectedEngineSpray().isValid()) {
                            selectedEngineSpray().errors.showAllMessages();
                            flag = false;
                        }
                        return flag;
                    },

                    //On Close Dialog
                    onCloseEngineSprayDialog = function () {
                        view.hideEngineSprayDialog();
                    },

                    //#endregion

                    //#region Initialize the view model
                    initialize = function (specifiedView) {
                        view = specifiedView;
                        ko.applyBindings(view.viewModel, view.bindingRoot);
                        pager(pagination.Pagination({}, engineSprays, getEngineSprays));
                        getBaseData();
                        getEngineSprays();
                    };
                //#endregion


                return {
                    //#region Return
                    isEngineSprayLoaded: isEngineSprayLoaded,
                    engineSprays: engineSprays,
                    searchFilter: searchFilter,
                    selectedEngineSpray: selectedEngineSpray,
                    isLoadingEngineSpray: isLoadingEngineSpray,
                    pager: pager,
                    getBaseData: getBaseData,
                    getEngineSprays: getEngineSprays,
                    createEngineSpray: createEngineSpray,
                    searchEngineSpray: searchEngineSpray,
                    onDeleteEngineSpray: onDeleteEngineSpray,
                    onEditEngineSpray: onEditEngineSpray,
                    selectEngineSpray: selectEngineSpray,
                    onSaveEngineSpray: onSaveEngineSpray,
                    onCloseEngineSprayDialog: onCloseEngineSprayDialog,
                    initialize: initialize
                    //#endregion
                };

            })()
        };
        return ist.engineSpray.viewModel;
    });
